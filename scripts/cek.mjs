// Makine okunur, ücretsiz ve birincil kaynaklardan veri çeker.
//   node scripts/cek.mjs           → çekilen değerleri yazdırır, dosyaya dokunmaz
//   node scripts/cek.mjs --yaz     → değerleri data.js'e işler (gösterge, kaynak kaydı, kaynak tablosu)
//   node scripts/cek.mjs kur cot   → yalnızca adı verilen çekicileri çalıştırır
// Bir kaynak yanıt vermezse o kalem atlanır ve rutin araştırmayla yedek kaynağa geçer.
import { readData, writeData, loadTazelik } from "./veri.mjs";

const T = loadTazelik();
const args = process.argv.slice(2);
const WRITE = args.includes("--yaz");
const only = args.filter((a) => !a.startsWith("--"));
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

async function get(url, as = "text") {
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "*/*" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return as === "json" ? res.json() : res.text();
}
function isoTSI(d) {
  const p = T.tsiParts(d);
  const z = (n) => String(n).padStart(2, "0");
  return `${p.y}-${z(p.m + 1)}-${z(p.d)}T${z(p.hh)}:${z(p.mm)}:00+03:00`;
}
const round = (n, d) => Math.round(n * 10 ** d) / 10 ** d;
const fmtTR = (n, d) => n.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ---------- Çekiciler ----------
   Her çekici { kpi | section, values, refs[{title,url,published}], feeds[{name,latest,ref}] } listesi döndürür. */
const FETCHERS = {
  // USD/TRY ve EUR/TRY: değer piyasa kuru (rutin saatinde), alt satırda TCMB gösterge kuru.
  async kur() {
    const xml = await get("https://www.tcmb.gov.tr/kurlar/today.xml");
    const date = /Tarih="(\d{2})\.(\d{2})\.(\d{4})"/.exec(xml);
    const rate = (code) => {
      const m = new RegExp(`CurrencyCode="${code}">[\\s\\S]*?<ForexBuying>([\\d.]+)</ForexBuying>\\s*<ForexSelling>([\\d.]+)</ForexSelling>`).exec(xml);
      return m ? (parseFloat(m[1]) + parseFloat(m[2])) / 2 : null;
    };
    const tcmb = { usd: rate("USD"), eur: rate("EUR"), day: date ? `${date[3]}-${date[2]}-${date[1]}` : null };
    if (!(tcmb.usd > 0 && tcmb.eur > 0 && tcmb.day)) throw new Error("TCMB today.xml ayrıştırılamadı");
    const tcmbRef = { title: "TCMB gösterge niteliğindeki döviz kurları", url: "https://www.tcmb.gov.tr/kurlar/today.xml", published: tcmb.day };
    const tcmbNote = `TCMB gösterge ${when(tcmb.day)} 15:30: ${fmtTR(tcmb.usd, 2)}`;

    let market = null;
    try {
      const d = await get("https://api.coinbase.com/v2/exchange-rates?currency=USD", "json");
      const usd = parseFloat(d.data.rates.TRY), eur = usd / parseFloat(d.data.rates.EUR);
      if (usd > 0 && eur > 0) market = { usd, eur, ref: { title: "Coinbase döviz kurları API (piyasa kuru)", url: "https://api.coinbase.com/v2/exchange-rates?currency=USD", published: T.tsiDate(new Date()) } };
    } catch { /* TCMB'ye düşülür */ }

    const now = new Date();
    if (market) {
      return [{
        kpi: "usdtry",
        values: { value: round(market.usd, 4), decimals: 2, secondary: { label: "EUR/TRY", value: round(market.eur, 4), decimals: 2 }, sub: tcmbNote, asOf: isoTSI(now), asOfNote: "piyasa" },
        refs: [market.ref, tcmbRef],
        feeds: [{ name: "TCMB gösterge kurları", latest: tcmb.day, ref: tcmbRef.url }, { name: "Coinbase kur API", latest: isoTSI(now), ref: market.ref.url }]
      }];
    }
    return [{
      kpi: "usdtry",
      values: { value: round(tcmb.usd, 4), decimals: 2, secondary: { label: "EUR/TRY", value: round(tcmb.eur, 4), decimals: 2 }, sub: null, asOf: `${tcmb.day}T15:30:00+03:00`, asOfNote: "TCMB gösterge" },
      refs: [tcmbRef],
      feeds: [{ name: "TCMB gösterge kurları", latest: tcmb.day, ref: tcmbRef.url }]
    }];
  },

  // CFTC Commitments of Traders, disaggregated futures-only: fonların (managed money) pozisyonları.
  async cot() {
    const MARKETS = [["001602", "CBOT buğday (SRW)"], ["001612", "KC buğday (HRW)"], ["002602", "CBOT mısır"], ["005602", "CBOT soya"]];
    const q = new URLSearchParams({
      $where: `cftc_contract_market_code in(${MARKETS.map((m) => `'${m[0]}'`).join(",")})`,
      $order: "report_date_as_yyyy_mm_dd DESC",
      $limit: "8",
      $select: "report_date_as_yyyy_mm_dd,cftc_contract_market_code,open_interest_all,m_money_positions_long_all,m_money_positions_short_all,change_in_m_money_long_all,change_in_m_money_short_all"
    });
    const rows = await get("https://publicreporting.cftc.gov/resource/72hh-3qpy.json?" + q, "json");
    if (!rows.length) throw new Error("CFTC yanıtı boş");
    const latest = rows[0].report_date_as_yyyy_mm_dd.slice(0, 10);
    const n = (x) => parseInt(x, 10);
    const out = MARKETS.map(([code, label]) => {
      const r = rows.find((x) => x.cftc_contract_market_code === code && x.report_date_as_yyyy_mm_dd.startsWith(latest));
      if (!r) throw new Error(`CFTC: ${code} için ${latest} kaydı yok`);
      return { label, code, long: n(r.m_money_positions_long_all), short: n(r.m_money_positions_short_all), changeLong: n(r.change_in_m_money_long_all), changeShort: n(r.change_in_m_money_short_all), oi: n(r.open_interest_all) };
    });
    // Rapor Salı pozisyonlarını içerir, Cuma 15:30 ET'de yayımlanır.
    const released = new Date(Date.parse(latest + "T12:00:00Z") + 3 * 864e5);
    const ref = { title: "CFTC: Commitments of Traders, disaggregated futures-only", url: "https://publicreporting.cftc.gov/Commitments-of-Traders/Disaggregated-Futures-Only/72hh-3qpy", published: T.tsiDate(released) };
    return [{
      section: "positioning",
      values: { asOf: latest, rows: out },
      refs: [ref],
      feeds: [{ name: "CFTC Commitments of Traders", latest, ref: ref.url }]
    }];
  }
};

function when(day) {
  const p = T.tsiParts(day);
  return `${p.d} ${["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"][p.m]}`;
}

/* ---------- data.js'e işleme ---------- */
function upsertRef(D, ref) {
  let r = D.refs.find((x) => x.url === ref.url);
  if (!r) {
    r = { id: Math.max(0, ...D.refs.map((x) => x.id)) + 1 };
    D.refs.push(r);
  }
  Object.assign(r, { title: ref.title, url: ref.url, published: ref.published });
  return r.id;
}
function apply(D, res, nowISO) {
  const src = res.refs.map((ref) => upsertRef(D, ref));
  let target;
  if (res.kpi) {
    target = D.kpis.find((k) => k.id === res.kpi);
    if (!target) throw new Error(`data.js içinde ${res.kpi} göstergesi yok`);
  } else {
    target = D[res.section];
    if (!target) throw new Error(`data.js içinde ${res.section} bölümü yok`);
  }
  for (const [k, v] of Object.entries(res.values)) {
    if (v === null) delete target[k];
    else target[k] = v;
  }
  target.checked = nowISO;
  target.src = src;
  delete target.staleReason;
  for (const feed of res.feeds || []) {
    const f = D.feeds.find((x) => x.name === feed.name);
    const ref = D.refs.find((x) => x.url === feed.ref);
    if (f) Object.assign(f, { latest: feed.latest, lastChecked: nowISO, status: "used", ref: ref ? ref.id : f.ref });
  }
}

const names = only.length ? only : Object.keys(FETCHERS);
const results = [];
let failed = 0;
for (const name of names) {
  if (!FETCHERS[name]) { console.error(`bilinmeyen çekici: ${name} (var olanlar: ${Object.keys(FETCHERS).join(", ")})`); process.exit(1); }
  try {
    const res = await FETCHERS[name]();
    results.push(...res);
    for (const r of res) console.log(`✓ ${name} → ${r.kpi || r.section}: ${JSON.stringify(r.values)}`);
  } catch (e) {
    failed++;
    console.log(`✗ ${name}: ${e.message}`);
  }
}

if (WRITE && results.length) {
  const D = readData();
  const nowISO = isoTSI(new Date());
  results.forEach((r) => apply(D, r, nowISO));
  writeData(D);
  console.log(`\ndata.js güncellendi (${results.length} kalem). Sonra: node scripts/kontrol.mjs`);
}
process.exit(failed && !results.length ? 1 : 0);
