import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseURL = "http://127.0.0.1:3000";
const output = new URL("../artifacts/", import.meta.url).pathname;
const screenshotDir = `${output}screenshots`;
const qaDir = `${output}qa`;

await mkdir(screenshotDir, { recursive: true });
await mkdir(qaDir, { recursive: true });

const server = spawn("./node_modules/.bin/next", ["dev", "--hostname", "127.0.0.1"], { stdio: ["ignore", "pipe", "pipe"] });
let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Dev server did not become ready.\n${serverLog}`);
}

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const consoleIssues = [];

async function prepare(page, route) {
  page.on("console", (message) => {
    if (["warning", "error"].includes(message.type())) consoleIssues.push({ route, type: message.type(), text: message.text() });
  });
  page.on("pageerror", (error) => consoleIssues.push({ route, type: "pageerror", text: error.message }));
  await page.goto(`${baseURL}${route}`, { waitUntil: "load" });
  await page.waitForTimeout(1400);
}

async function revealPage(page) {
  await page.addStyleTag({ content: "header.sticky{position:relative!important;top:auto!important}.skip-link{display:none!important}" });
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.75, 520);
    for (let position = 0; position < document.documentElement.scrollHeight; position += step) {
      window.scrollTo(0, position);
      await new Promise((resolve) => window.setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  });
  await page.waitForTimeout(300);
}

try {
  await waitForServer();

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
  await prepare(desktop, "/");
  await desktop.screenshot({ path: `${screenshotDir}/hero-desktop.png` });
  await desktop.locator("main > section").first().screenshot({ path: `${screenshotDir}/closeup-hero-3d.png` });
  await revealPage(desktop);
  await desktop.screenshot({ path: `${screenshotDir}/home-desktop-long.png`, fullPage: true });

  await prepare(desktop, "/menu");
  await desktop.getByRole("tab", { name: "Авторские" }).click();
  await desktop.waitForTimeout(350);
  await revealPage(desktop);
  await desktop.screenshot({ path: `${screenshotDir}/menu-desktop-long.png`, fullPage: true });
  await desktop.locator("main section").nth(1).screenshot({ path: `${screenshotDir}/closeup-menu.png` });

  await prepare(desktop, "/visit");
  await revealPage(desktop);
  await desktop.screenshot({ path: `${screenshotDir}/visit-desktop-long.png`, fullPage: true });
  await desktop.locator("main section").first().screenshot({ path: `${screenshotDir}/closeup-location.png` });

  await prepare(desktop, "/preorder");
  await desktop.screenshot({ path: `${screenshotDir}/closeup-preorder.png` });
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, colorScheme: "light" });
  await prepare(mobile, "/");
  await mobile.screenshot({ path: `${screenshotDir}/hero-mobile.png` });
  await revealPage(mobile);
  await mobile.screenshot({ path: `${screenshotDir}/home-mobile-long.png`, fullPage: true });
  await prepare(mobile, "/menu");
  await mobile.getByRole("tab", { name: "Авторские" }).click();
  await mobile.waitForTimeout(350);
  await revealPage(mobile);
  await mobile.screenshot({ path: `${screenshotDir}/menu-mobile-long.png`, fullPage: true });
  await mobile.close();

  await writeFile(`${qaDir}/browser-console.json`, `${JSON.stringify(consoleIssues, null, 2)}\n`);
} finally {
  await browser.close();
  server.kill("SIGTERM");
}
