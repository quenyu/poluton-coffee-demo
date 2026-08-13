import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";

const port = 3210;
const origin = `http://127.0.0.1:${port}`;
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const reportPath = resolve(process.env.PERFORMANCE_REPORT_PATH ?? `${tmpdir()}/poluton-performance.json`);
const budgets = {
  "mobile-390": {
    firstContentfulPaintMs: 1_500,
    largestContentfulPaintMs: 2_500,
    cumulativeLayoutShift: 0.1,
    transferredKb: 900,
    jsTransferredKb: 300,
    realtime3d: "fallback",
  },
  "desktop-1440": {
    firstContentfulPaintMs: 1_500,
    largestContentfulPaintMs: 2_500,
    cumulativeLayoutShift: 0.1,
    transferredKb: 1_200,
    jsTransferredKb: 600,
    realtime3d: "active",
  },
};
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
  { stdio: ["ignore", "ignore", "pipe"] },
);
let serverError = "";
let browser;

server.stderr.on("data", (chunk) => {
  serverError += chunk.toString();
});

function stopServer() {
  if (!server.killed) server.kill("SIGTERM");
}

process.once("exit", stopServer);

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(origin, { signal: AbortSignal.timeout(1_000) })).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Production server did not become ready");
}

function evaluateBudgets(results) {
  const issues = [];
  for (const result of results) {
    const budget = budgets[result.viewport];
    if (!budget) {
      issues.push(`${result.viewport}: no performance budget configured`);
      continue;
    }
    for (const metric of ["firstContentfulPaintMs", "largestContentfulPaintMs", "cumulativeLayoutShift", "transferredKb", "jsTransferredKb"]) {
      if (result[metric] > budget[metric]) {
        issues.push(`${result.viewport}: ${metric} ${result[metric]} exceeds ${budget[metric]}`);
      }
    }
    if (result.realtime3d !== budget.realtime3d) {
      issues.push(`${result.viewport}: 3D mode ${result.realtime3d ?? "missing"} expected ${budget.realtime3d}`);
    }
  }
  return issues;
}

try {
  await Promise.race([
    waitForServer(),
    new Promise((_, reject) => {
      server.once("exit", (code, signal) => {
        reject(new Error(`Production server exited before audit (code ${code}, signal ${signal})\n${serverError}`));
      });
    }),
  ]);
  browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
  const results = [];
  for (const viewport of [{ name: "mobile-390", width: 390, height: 844 }, { name: "desktop-1440", width: 1440, height: 960 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__polutonVitals = { cls: 0, lcp: 0 };
      new PerformanceObserver((list) => { for (const entry of list.getEntries()) window.__polutonVitals.cls += entry.value; }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => { const entries = list.getEntries(); window.__polutonVitals.lcp = entries.at(-1)?.startTime ?? 0; }).observe({ type: "largest-contentful-paint", buffered: true });
    });
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const resources = performance.getEntriesByType("resource");
      return {
        firstContentfulPaintMs: Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0),
        largestContentfulPaintMs: Math.round(window.__polutonVitals.lcp),
        cumulativeLayoutShift: Number(window.__polutonVitals.cls.toFixed(4)),
        domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
        loadMs: Math.round(navigation.loadEventEnd),
        transferredKb: Math.round(resources.reduce((sum, item) => sum + item.transferSize, 0) / 1024),
        jsTransferredKb: Math.round(resources.filter((item) => item.name.includes("/_next/static/") && item.name.endsWith(".js")).reduce((sum, item) => sum + item.transferSize, 0) / 1024),
        resourceCount: resources.length,
        realtime3d: document.querySelector("[data-3d]")?.getAttribute("data-3d"),
      };
    });
    results.push({ viewport: viewport.name, ...metrics });
    await context.close();
  }
  const issues = evaluateBudgets(results);
  const report = { environment: "local production server, unthrottled lab run", budgets, results, issues };
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ reportPath, ...report }, null, 2));
  if (issues.length > 0) throw new Error(`Performance budget failed:\n${issues.join("\n")}`);
} finally {
  await browser?.close();
  stopServer();
}
