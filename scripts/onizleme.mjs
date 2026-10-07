// Sayfayı başsız Chromium'da açar, çizim hatalarını yakalar ve ekran görüntüsü alır.
//   node scripts/onizleme.mjs [çıktı-klasörü]
// Dış istekler (canlı kur) engellenir; sayfa yalnızca repodaki dosyalarla çizilmelidir.
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { ROOT, readData } from "./veri.mjs";

const require = createRequire(import.meta.url);
function loadPlaywright() {
  try { return require("playwright"); } catch {}
  const globalRoot = execSync("npm root -g").toString().trim();
  return require(join(globalRoot, "playwright"));
}

const out = process.argv[2] || join(tmpdir(), "hububat-onizleme");
mkdirSync(out, { recursive: true });
const data = readData();
const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const problems = [];

for (const [name, width] of [["masaustu", 1280], ["mobil", 390]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  page.on("pageerror", (e) => problems.push(`[${name}] sayfa hatası: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error" && !/Failed to load resource|ERR_FAILED|net::/.test(m.text())) problems.push(`[${name}] konsol: ${m.text()}`);
  });
  await page.route("**/*", (r) => (r.request().url().startsWith("file:") ? r.continue() : r.abort()));
  await page.goto(pathToFileURL(join(ROOT, "index.html")).href);
  await page.waitForTimeout(400);
  await page.evaluate(() => document.fonts.ready);

  const got = await page.evaluate(() => ({
    fonts: [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "")))],
    kpis: document.querySelectorAll("#ticker .kpi").length,
    brief: document.querySelectorAll("#brief li").length,
    risks: document.querySelectorAll("#risks li").length,
    chart: document.querySelectorAll("#lineChart svg circle").length,
    refs: document.querySelectorAll("#refs li").length,
    projects: document.querySelectorAll("#oss tbody tr").length,
    loadError: !document.getElementById("loadError").hidden,
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    pill: document.getElementById("freshPill").textContent
  }));
  const expect = { kpis: data.kpis.length, brief: data.brief.length, risks: data.risks.length, refs: data.refs.length };
  for (const [k, v] of Object.entries(expect)) if (got[k] !== v) problems.push(`[${name}] ${k}: beklenen ${v}, çizilen ${got[k]}`);
  if (got.chart < 1) problems.push(`[${name}] grafik çizilmedi`);
  if (got.loadError) problems.push(`[${name}] data.js yüklenemedi`);
  if (got.overflow) problems.push(`[${name}] sayfa yatayda taşıyor`);
  for (const f of ["Archivo", "IBM Plex Sans", "IBM Plex Mono"]) if (!got.fonts.includes(f)) problems.push(`[${name}] yazı tipi yüklenmedi: ${f} (fonts/)`);
  console.log(`${name}: ${got.kpis} gösterge, ${got.brief} özet, ${got.refs} kaynak, ${got.projects} proje satırı · ${got.pill}`);

  const file = join(out, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`  ekran görüntüsü: ${file}`);
  await page.close();
}
await browser.close();

if (problems.length) {
  console.error("\nSORUNLAR:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("\nÖnizleme temiz.");
