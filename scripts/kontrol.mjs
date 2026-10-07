// data.js doğrulaması: yapı, kaynak bağlantıları, makul değer aralıkları ve tazelik.
//   node scripts/kontrol.mjs            → rapor; yapı hatasında çıkış kodu 1
//   node scripts/kontrol.mjs --sabah    → rutin modu: her gösterge bugün doğrulanmış olmalı,
//                                          tazelik kuralını geçemeyen gösterge staleReason taşımalı
//   node scripts/kontrol.mjs --linkler  → kaynak bağlantılarını da dener (ağ gerekir)
import { execSync } from "node:child_process";
import { ROOT, readData, parseData, loadTazelik } from "./veri.mjs";

const args = new Set(process.argv.slice(2));
const SABAH = args.has("--sabah");
const LINKS = args.has("--linkler");
const T = loadTazelik();
const now = new Date();
const today = T.tsiDay(now);
const errors = [];
const warns = [];

let D;
try {
  D = readData();
} catch (e) {
  console.error("HATA: " + e.message);
  process.exit(1);
}

const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !!T.toDate(s);
const isDateTime = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(s) && !!T.toDate(s);
const isDateOrDT = (s) => isDate(s) || isDateTime(s);
const isStr = (s) => typeof s === "string" && s.trim().length > 0;
const isNum = (n) => typeof n === "number" && Number.isFinite(n);
const req = (cond, msg) => { if (!cond) errors.push(msg); return cond; };
const future = (s) => T.toDate(s) > new Date(now.getTime() + 3600e3);
const LEVEL = ["high", "mid", "low", "pos"];

for (const key of ["meta", "kpis", "brief", "risks", "supplyDemand", "exports", "ladder", "positioning", "policy", "calendar", "chart", "feeds", "projects", "refs"]) {
  if (!(key in D)) { console.error(`HATA: eksik bölüm: ${key}`); process.exit(1); }
}
req(D.schema === 1, "schema 1 olmalı");

/* ---------- Kaynaklar ---------- */
const refIds = new Set();
D.refs.forEach((r, i) => {
  const at = `refs[${i}]`;
  req(Number.isInteger(r.id) && r.id > 0, `${at}: id pozitif tamsayı olmalı`);
  req(!refIds.has(r.id), `${at}: id tekrar ediyor (${r.id})`);
  refIds.add(r.id);
  req(isStr(r.title), `${at}: title boş`);
  req(typeof r.url === "string" && /^https?:\/\/\S+$/.test(r.url), `${at}: url geçersiz`);
  req(r.published == null || isDateOrDT(r.published), `${at}: published tarih olmalı ya da null`);
  if (r.published && future(r.published)) errors.push(`${at}: published gelecekte`);
});
const used = new Map(); // ref id → kullanıldığı yerler
function src(ids, at) {
  if (!Array.isArray(ids) || ids.length === 0) { errors.push(`${at}: kaynak numarası yok`); return; }
  ids.forEach((id) => {
    if (!refIds.has(id)) errors.push(`${at}: [${id}] refs içinde yok`);
    used.set(id, (used.get(id) || []).concat(at));
  });
}

/* ---------- Meta ---------- */
req(isDate(D.meta.bulletinDate), "meta.bulletinDate YYYY-AA-GG olmalı");
req(isDateTime(D.meta.generatedAt), "meta.generatedAt saat dilimli ISO zaman olmalı (ör. 2026-10-08T07:05:00+03:00)");
req(isStr(D.meta.generatedBy), "meta.generatedBy boş");
req(D.meta.projectsCheckedAt == null || isDate(D.meta.projectsCheckedAt), "meta.projectsCheckedAt tarih olmalı ya da null");

/* ---------- Göstergeler ---------- */
// Birim hatasını yakalamak için geniş aralıklar. Gerçek bir piyasa hareketi aralığı aşarsa gerekçesiyle genişletin.
const RANGE = { cbot_wheat: [300, 2000], kc_wheat: [300, 2000], konya_wheat: [5000, 100000], cbot_corn: [250, 1200], cbot_soy: [700, 2500], ru_fob: [120, 600], eu_wheat: [100, 600], ru_duty: [0, 10000], usdtry: [20, 150], tmo_sell: [5000, 100000] };
const kpiIds = new Set();
D.kpis.forEach((k, i) => {
  const at = `kpis[${i}] ${k.id || "?"}`;
  req(isStr(k.id) && !kpiIds.has(k.id), `${at}: id boş ya da tekrar ediyor`);
  kpiIds.add(k.id);
  req(isStr(k.label), `${at}: label boş`);
  req(isNum(k.value), `${at}: value sayı olmalı`);
  req(k.decimals == null || Number.isInteger(k.decimals), `${at}: decimals tamsayı olmalı`);
  req(typeof k.unit === "string", `${at}: unit metin olmalı`);
  req(isDateOrDT(k.asOf), `${at}: asOf geçerli tarih olmalı`);
  req(k.cadence in T.CADENCE, `${at}: cadence şunlardan biri olmalı: ${Object.keys(T.CADENCE).join(", ")}`);
  req(isDateTime(k.checked), `${at}: checked saat dilimli ISO zaman olmalı`);
  if (isDateOrDT(k.asOf) && future(k.asOf)) errors.push(`${at}: asOf gelecekte`);
  if (isDateTime(k.checked) && future(k.checked)) errors.push(`${at}: checked gelecekte`);
  if (k.base) req(isNum(k.base.value) && k.base.value !== 0 && isStr(k.base.label), `${at}: base {value, label} eksik`);
  if (k.secondary) req(isStr(k.secondary.label) && isNum(k.secondary.value), `${at}: secondary {label, value} eksik`);
  if (k.perTonne != null) req(isNum(k.perTonne), `${at}: perTonne sayı olmalı`);
  if (k.eur) req(k.unit === "€/t", `${at}: eur: true ise unit "€/t" olmalı`);
  const r = RANGE[k.id];
  if (r && isNum(k.value) && (k.value < r[0] || k.value > r[1])) errors.push(`${at}: ${k.value} makul aralık dışında [${r.join("–")}]; birim hatası olabilir`);
  src(k.src, at);
});
D.kpis.forEach((k) => {
  if (k.fx) req(kpiIds.has(k.fx), `kpis ${k.id}: fx göstergesi yok (${k.fx})`);
  if (k.spread) req(kpiIds.has(k.spread.kpi), `kpis ${k.id}: spread göstergesi yok (${k.spread.kpi})`);
});

// Bir önceki yayınla karşılaştırma: büyük sıçrama varsa iki kaynakla doğrulanmalı.
try {
  const prev = parseData(execSync("git show HEAD:data.js", { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString());
  const P = Object.fromEntries((prev.kpis || []).map((k) => [k.id, k]));
  D.kpis.forEach((k) => {
    const p = P[k.id];
    if (!p || !isNum(p.value) || p.value === 0 || p.value === k.value) return;
    const chg = (k.value - p.value) / p.value * 100;
    const lim = k.id === "usdtry" ? 4 : 7;
    if (Math.abs(chg) > lim) warns.push(`${k.id}: önceki yayına göre %${chg.toFixed(1)} değişim (${p.value} → ${k.value}); iki kaynakla doğrulandığından emin ol`);
  });
} catch { /* ilk yayın ya da git yok */ }

/* ---------- Metin bölümleri ---------- */
req(Array.isArray(D.brief) && D.brief.length === 3, "brief tam 3 madde olmalı");
D.brief.forEach((b, i) => {
  const at = `brief[${i}]`;
  req(isStr(b.headline) && isStr(b.body) && isStr(b.impact), `${at}: headline, body ve impact dolu olmalı`);
  src(b.src, at);
  src(b.impactSrc, at + ".impact");
});
req(D.risks.length >= 3 && D.risks.length <= 7, "risks 3–7 madde olmalı");
D.risks.forEach((r, i) => {
  const at = `risks[${i}]`;
  req(isStr(r.category) && isStr(r.title) && isStr(r.body), `${at}: category, title ve body dolu olmalı`);
  req(LEVEL.includes(r.level), `${at}: level şunlardan biri olmalı: ${LEVEL.join(", ")}`);
  src(r.src, at);
});

const SD = D.supplyDemand;
req(isStr(SD.source) && isDate(SD.asOf), "supplyDemand: source ve asOf (tarih) gerekli");
SD.rows.forEach((r, i) => { req(isStr(r.label) && isStr(r.value), `supplyDemand.rows[${i}]: label ve value gerekli`); src(r.src, `supplyDemand.rows[${i}]`); });

const E = D.exports;
req(isStr(E.note) && isStr(E.unit) && isNum(E.max) && E.max > 0, "exports: note, unit, max gerekli");
src(E.src, "exports");
E.rows.forEach((r, i) => {
  const at = `exports.rows[${i}]`;
  req(isStr(r.label) && isNum(r.value) && isStr(r.display), `${at}: label, value, display gerekli`);
  if (r.hi != null) req(isNum(r.hi) && r.hi >= r.value, `${at}: hi value'dan küçük olamaz`);
  if (isNum(r.value) && Math.max(r.value, r.hi || 0) > E.max) errors.push(`${at}: değer exports.max'ı aşıyor`);
});

D.ladder.forEach((r, i) => req(isStr(r.label) && kpiIds.has(r.kpi), `ladder[${i}]: label ve var olan bir kpi gerekli`));

const POS = D.positioning;
req(isStr(POS.title) && isStr(POS.source) && POS.cadence in T.CADENCE, "positioning: title, source, cadence gerekli");
req(isDate(POS.asOf) && isDateTime(POS.checked), "positioning: asOf (tarih) ve checked (zaman) gerekli");
src(POS.src, "positioning");
POS.rows.forEach((r, i) => {
  const ok = [r.long, r.short, r.changeLong, r.changeShort, r.oi].every(Number.isInteger) && r.long >= 0 && r.short >= 0 && r.oi > 0;
  req(isStr(r.label) && ok, `positioning.rows[${i}]: label ve tamsayı long, short, changeLong, changeShort, oi gerekli`);
});

D.policy.forEach((p, i) => {
  const at = `policy[${i}]`;
  req(isDate(p.date), `${at}: date YYYY-AA-GG olmalı`);
  req(/^[A-Z]{2}$/.test(p.country || ""), `${at}: country iki harfli ülke kodu olmalı`);
  req(isStr(p.title) && isStr(p.body), `${at}: title ve body dolu olmalı`);
  req(LEVEL.includes(p.level), `${at}: level geçersiz`);
  src(p.src, at);
  if (isDate(p.date) && today - T.tsiDay(p.date) > 90) warns.push(`${at}: 90 günden eski (${p.date}); panel "son 90 gün" diyor, kaldırmayı düşün`);
});

D.calendar.forEach((c, i) => {
  const at = `calendar[${i}]`;
  req(isDate(c.date) !== !!c.recurring, `${at}: ya date ya recurring olmalı`);
  req(c.time == null || /^\d{2}:\d{2}$/.test(c.time), `${at}: time SS:DD olmalı`);
  req(isStr(c.title) && isStr(c.body), `${at}: title ve body dolu olmalı`);
  src(c.src, at);
  if (isDate(c.date) && T.tsiDay(c.date) < today) (SABAH ? errors : warns).push(`${at}: geçmiş olay (${c.date}); kaldır`);
  if (c.until && isDate(c.until) && T.tsiDay(c.until) < today) warns.push(`${at}: tekrarlayan olayın süresi bitti (${c.until}); kaldır`);
});

const C = D.chart;
req(isStr(C.title) && isStr(C.unit) && isNum(C.perTonne), "chart: title, unit, perTonne gerekli");
src(C.src, "chart");
let prevDay = -Infinity;
C.points.forEach((p, i) => {
  const at = `chart.points[${i}]`;
  if (!req(Array.isArray(p) && p.length === 3 && isDate(p[0]) && isNum(p[1]) && isStr(p[2]), `${at}: ["YYYY-AA-GG", sayı, "tür"] olmalı`)) return;
  const d = T.tsiDay(p[0]);
  req(d > prevDay, `${at}: tarihler artan sırada ve tekil olmalı (${p[0]})`);
  req(d <= today, `${at}: gelecek tarih (${p[0]})`);
  prevDay = d;
});
const wheat = D.kpis.find((k) => k.id === "cbot_wheat");
const lastPt = C.points[C.points.length - 1];
if (wheat && lastPt && isDateOrDT(wheat.asOf) && T.tsiDay(lastPt[0]) < T.tsiDay(wheat.asOf)) {
  warns.push(`chart: son nokta ${lastPt[0]}, CBOT buğday göstergesi ${wheat.asOf}; son uzlaşmayı grafiğe ekle`);
}

/* ---------- Kaynak tablosu ve projeler ---------- */
D.feeds.forEach((f, i) => {
  const at = `feeds[${i}] ${f.name || "?"}`;
  req(isStr(f.name) && isStr(f.data) && isStr(f.freq) && isStr(f.method) && isStr(f.cost), `${at}: name, data, freq, method, cost gerekli`);
  req(["used", "plan", "lic"].includes(f.status), `${at}: status used, plan ya da lic olmalı`);
  if (f.ref != null) req(refIds.has(f.ref), `${at}: ref [${f.ref}] refs içinde yok`);
  if (f.ref != null) used.set(f.ref, (used.get(f.ref) || []).concat(at));
  if (f.status === "used") {
    req(f.cadence in T.CADENCE, `${at}: kullanılan kaynakta cadence gerekli`);
    req(isDateTime(f.lastChecked), `${at}: lastChecked saat dilimli ISO zaman olmalı`);
    req(f.latest == null || isDateOrDT(f.latest), `${at}: latest tarih olmalı ya da null`);
    if (SABAH && isDateTime(f.lastChecked) && T.tsiDay(f.lastChecked) !== today) warns.push(`${at}: bugün kontrol edilmedi`);
  }
});
const COMMERCIAL = ["serbest", "copyleft", "kisitli"], EFFORT = ["dusuk", "orta", "yuksek"], REC = ["hemen", "degerlendir", "izle", "kacin"];
D.projects.forEach((p, i) => {
  const at = `projects[${i}] ${p.name || "?"}`;
  req(isStr(p.name) && /^https:\/\//.test(p.url || "") && isStr(p.category) && isStr(p.what) && isStr(p.use) && isStr(p.license), `${at}: name, url, category, what, use, license gerekli`);
  req(COMMERCIAL.includes(p.commercial), `${at}: commercial şunlardan biri olmalı: ${COMMERCIAL.join(", ")}`);
  req(EFFORT.includes(p.effort), `${at}: effort şunlardan biri olmalı: ${EFFORT.join(", ")}`);
  req(REC.includes(p.recommendation), `${at}: recommendation şunlardan biri olmalı: ${REC.join(", ")}`);
  req(p.lastActivity == null || isDate(p.lastActivity), `${at}: lastActivity tarih olmalı`);
  req(typeof p.maintained === "boolean", `${at}: maintained true/false olmalı`);
});
if (D.projects.length && D.meta.projectsCheckedAt && today - T.tsiDay(D.meta.projectsCheckedAt) > 8) {
  warns.push(`projects: son tarama ${D.meta.projectsCheckedAt}; haftalık yenileme gecikti`);
}

/* ---------- Kullanılmayan ve eski kaynaklar ---------- */
D.refs.forEach((r) => { if (!used.has(r.id)) warns.push(`refs [${r.id}] hiçbir yerde kullanılmıyor; kaldır`); });
D.brief.forEach((b, i) => {
  (b.src || []).concat(b.impactSrc || []).forEach((id) => {
    const r = D.refs.find((x) => x.id === id);
    if (r && r.published && today - T.tsiDay(r.published) > 14) warns.push(`brief[${i}]: [${id}] ${r.published} tarihli; özet için daha yeni kaynak ara`);
    if (r && !r.published && SABAH) warns.push(`brief[${i}]: [${id}] yayın tarihi yok`);
  });
});

/* ---------- Tazelik ---------- */
const tracked = D.kpis.concat([{ id: "cot", value: POS.rows.length + " piyasa", unit: "", ...POS }]);
const rows = tracked.map((k) => {
  const st = T.status(k, now);
  if (st.level !== "guncel") {
    const msg = `${k.id}: ${st.label.toLocaleUpperCase("tr")}: ${st.reasons.join("; ")}`;
    if (SABAH && !k.staleReason) errors.push(msg + " → daha yeni veri bul ya da staleReason ile gerekçe yaz");
    else warns.push(msg);
  } else if (k.staleReason) {
    warns.push(`${k.id}: güncel ama staleReason duruyor; sil`);
  }
  if (SABAH && isDateTime(k.checked) && T.tsiDay(k.checked) !== today) errors.push(`${k.id}: bugün doğrulanmadı (checked ${k.checked})`);
  return [k.id, `${k.value} ${k.unit}`.trim(), k.asOf, k.checked, st.label];
});
if (SABAH) {
  req(isDate(D.meta.bulletinDate) && T.tsiDay(D.meta.bulletinDate) === today, `meta.bulletinDate bugün (${T.tsiDate(now)}) olmalı`);
  req(isDateTime(D.meta.generatedAt) && T.tsiDay(D.meta.generatedAt) === today, "meta.generatedAt bugünün saati olmalı");
}

/* ---------- Bağlantılar ---------- */
if (LINKS) {
  const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
  async function probe(url) {
    for (const method of ["HEAD", "GET"]) {
      try {
        const res = await fetch(url, { method, redirect: "follow", headers: { "user-agent": UA }, signal: AbortSignal.timeout(12000) });
        if (res.ok) return res.status;
        if (method === "GET") return res.status;
      } catch (e) {
        if (method === "GET") return e.name === "TimeoutError" ? "zaman aşımı" : e.message;
      }
    }
  }
  const queue = D.refs.slice();
  await Promise.all(Array.from({ length: 6 }, async () => {
    for (let r; (r = queue.shift());) {
      const s = await probe(r.url);
      if (s !== 200 && !(typeof s === "number" && s < 400)) warns.push(`refs [${r.id}] açılmadı (${s}): ${r.url}`);
    }
  }));
}

/* ---------- Rapor ---------- */
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(`Bülten ${D.meta.bulletinDate} · üretildi ${D.meta.generatedAt} · kontrol ${T.tsiDate(now)}${SABAH ? " · sabah modu" : ""}\n`);
console.log(pad("Gösterge", 12) + pad("Değer", 18) + pad("Veri tarihi", 27) + pad("Son kontrol", 27) + "Durum");
rows.forEach((r) => console.log(pad(r[0], 12) + pad(r[1], 18) + pad(r[2], 27) + pad(r[3], 27) + r[4]));
if (warns.length) console.log("\nUYARILAR (" + warns.length + "):\n- " + warns.join("\n- "));
if (errors.length) {
  console.error("\nHATALAR (" + errors.length + "):\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log("\nYapı geçerli." + (SABAH ? " Sabah kontrolleri geçti." : ""));
