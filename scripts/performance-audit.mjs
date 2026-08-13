import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const port = 3210;
const origin = `http://127.0.0.1:${port}`;
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], { stdio: "pipe" });

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(origin)).ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Production server did not become ready");
}

try {
  await waitForServer();
  const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
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
  await browser.close();
  await mkdir("artifacts/qa", { recursive: true });
  await writeFile("artifacts/qa/performance.json", `${JSON.stringify({ environment: "local production server, unthrottled lab run", results }, null, 2)}\n`);
  console.log(JSON.stringify(results, null, 2));
} finally {
  server.kill("SIGTERM");
}
