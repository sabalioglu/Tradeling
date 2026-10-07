/* Türkiye Hububat Masası: sayfayı data.js'teki veriden çizer.
   Veri: window.HUBUBAT (data.js) · Tazelik kuralları: window.HububatTazelik (tazelik.js) */
(function () {
  "use strict";

  var D = window.HUBUBAT, T = window.HububatTazelik;
  function $(id) { return document.getElementById(id); }
  if (!D || !T) { $("loadError").hidden = false; return; }
  var NOW = new Date();

  /* ---------- Helpers ---------- */
  var MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  var MONTHS_LONG = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function srcLinks(ids) { return (ids || []).map(function (i) { return '<a class="src" href="#s' + i + '">[' + i + ']</a>'; }).join(" "); }
  // Açılır ayrıntı: isteğe bağlı detail[] paragrafları ve ilgili haberlerin başlık, tarih, bağlantısı.
  var REFS = {};
  (D.refs || []).forEach(function (r) { REFS[r.id] = r; });
  function more(item, ids, label) {
    var seen = {}, refs = [];
    ids.concat(item.detailSrc || []).forEach(function (i) { if (!seen[i] && REFS[i]) { seen[i] = 1; refs.push(REFS[i]); } });
    var d = item.detail || [];
    var paras = d.map(function (t, k) { return '<p>' + esc(t) + (k === d.length - 1 && item.detailSrc ? ' ' + srcLinks(item.detailSrc) : '') + '</p>'; }).join("");
    if (!paras && !refs.length) return "";
    var news = refs.map(function (r) {
      return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.title) + '</a>' +
        (r.published ? ' <span class="muted">· ' + esc(when(r.published, true)) + '</span>' : '') + '</li>';
    }).join("");
    return '<details class="more"><summary>' + esc(label || (paras ? "Ayrıntılar ve haberler" : "Haberler")) + '</summary>' + paras +
      (news ? '<ul class="news">' + news + '</ul>' : '') + '</details>';
  }
  function fmt(n, d) { return n.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function day(s) { return new Date(s + "T12:00:00Z"); }
  function hm(p) { return String(p.hh).padStart(2, "0") + ":" + String(p.mm).padStart(2, "0"); }
  // "30 Eyl" ya da saatli değerlerde "7 Eki · 09:26"
  function when(v, long) {
    var p = T.tsiParts(v);
    if (!p) return "";
    var s = p.d + " " + (long ? MONTHS_LONG : MONTHS)[p.m] + (long ? " " + p.y : "");
    return T.hasTime(v) ? s + " · " + hm(p) : s;
  }
  function trDate(d) { return d.getUTCDate() + " " + MONTHS[d.getUTCMonth()]; }
  function signPct(x) { return (x >= 0 ? "+" : "−") + fmt(Math.abs(x), 1) + "%"; }

  /* ---------- Freshness ---------- */
  function freshBadge(item, text) {
    var st = T.status(item, NOW);
    var cad = T.CADENCE[item.cadence];
    var tip = st.label + " · veri: " + when(item.asOf) + (item.asOfNote ? " (" + item.asOfNote + ")" : "") +
      " · son kontrol: " + (item.checked ? when(item.checked) : "yok") + (cad ? " · " + cad.label + " seri" : "") +
      (st.reasons.length ? " · " + st.reasons.join("; ") : "");
    return '<span class="fresh f-' + st.level + '" title="' + esc(tip) + '"><i aria-hidden="true"></i>' +
      '<span class="sr">' + st.label + ': </span><span class="asof">' + esc(text) + '</span>' +
      (st.level !== "guncel" ? ' <b>' + st.label + '</b>' : '') + '</span>';
  }

  /* ---------- Masthead ---------- */
  var KPI = {};
  D.kpis.forEach(function (k) { KPI[k.id] = k; });
  var bp = T.tsiParts(D.meta.bulletinDate), gp = T.tsiParts(D.meta.generatedAt);
  var asOfDays = D.kpis.map(function (k) { return T.tsiDay(k.asOf); }).filter(function (x) { return x !== null; });
  var dmin = Math.min.apply(null, asOfDays), dmax = Math.max.apply(null, asOfDays);
  var sameDay = T.tsiDay(D.meta.generatedAt) === T.tsiDay(D.meta.bulletinDate);
  $("mastMeta").textContent = bp.d + " " + MONTHS_LONG[bp.m] + " " + bp.y + ", " + DAYS[bp.wd] +
    " · güncelleme " + (sameDay ? hm(gp) : when(D.meta.generatedAt)) + " TSİ, " + D.meta.generatedBy +
    " · veri kesiti " + when(new Date(dmin * 864e5)) + " – " + when(new Date(dmax * 864e5));

  // Tazelik özeti: şeritteki göstergeler ve fon pozisyonları paneli
  var tracked = D.kpis.concat(D.positioning ? [{ label: "Fon pozisyonları (COT)", asOf: D.positioning.asOf, checked: D.positioning.checked, cadence: D.positioning.cadence, maxAge: D.positioning.maxAge, staleReason: D.positioning.staleReason }] : []);
  var statuses = tracked.map(function (k) { return { k: k, s: T.status(k, NOW) }; });
  var nFresh = statuses.filter(function (x) { return x.s.level === "guncel"; }).length;
  var worst = statuses.reduce(function (a, x) { return T.worse(a, x.s.level); }, "guncel");
  var pill = $("freshPill");
  pill.innerHTML = '<span class="dot d-' + worst + '"></span>Tazelik: ' + nFresh + '/' + tracked.length + ' veri güncel';
  pill.title = statuses.filter(function (x) { return x.s.level !== "guncel"; })
    .map(function (x) { return x.k.label + ": " + x.s.label + " (" + x.s.reasons.join("; ") + ")"; }).join("\n") || "Tüm göstergeler tazelik kuralını geçiyor.";

  var ageH = (NOW - T.toDate(D.meta.generatedAt)) / 3600e3;
  if (ageH > T.CHECK.fresh) {
    $("staleBanner").hidden = false;
    $("staleBanner").textContent = "Bülten " + (ageH < 48 ? Math.round(ageH) + " saattir" : Math.floor(ageH / 24) + " gündür") +
      " güncellenmedi; sabah rutini çalışmamış olabilir. Noktalar hangi verilerin eskidiğini gösterir.";
  }

  /* ---------- Ticker ---------- */
  function kpiNum(k) { return (k.approx ? "≈" : "") + fmt(k.value, k.decimals || 0); }
  // $/t karşılığı: ¢/bu ise bushel/ton ile, TL ise kur göstergesiyle, € ise EUR/USD çaprazıyla hesaplanır.
  function eurUsd() { var k = KPI.usdtry; return k && k.secondary ? k.secondary.value / k.value : null; }
  function usdPerTonne(k) {
    if (k.perTonne) return k.value / 100 * k.perTonne;
    if (k.fx && KPI[k.fx]) return k.value / KPI[k.fx].value;
    if (k.eur && eurUsd()) return k.value * eurUsd();
    return k.value;
  }
  $("ticker").innerHTML = D.kpis.map(function (k) {
    var subs = [];
    if (k.perTonne) subs.push("≈ " + fmt(usdPerTonne(k), 0) + " $/t");
    if ((k.fx && KPI[k.fx]) || (k.eur && eurUsd())) subs.push("≈ " + fmt(usdPerTonne(k), 0) + " $/t (hesaplanan)");
    if (k.spread && KPI[k.spread.kpi]) subs.push(k.spread.label + " " + ((k.eur || KPI[k.spread.kpi].eur) ? "≈" : "") + fmt(usdPerTonne(k) - usdPerTonne(KPI[k.spread.kpi]), 0) + " $/t");
    if (k.secondary) subs.push(k.secondary.label + " " + fmt(k.secondary.value, k.secondary.decimals || 0));
    if (k.sub) subs.push(k.sub);
    var asOfText = when(k.asOf) + (k.asOfNote ? " · " + k.asOfNote : "");
    return '<div class="kpi" data-id="' + esc(k.id) + '">' +
      '<div class="kpi-label">' + esc(k.label) + '</div>' +
      '<div class="kpi-value"><b>' + esc(kpiNum(k)) + '</b>' + (k.unit ? '<span>' + esc(k.unit) + '</span>' : '') + '</div>' +
      (k.base ? '<div class="kpi-delta">' + signPct((k.value - k.base.value) / k.base.value * 100) + ' <i>' + esc(k.base.label) + ' (' + fmt(k.base.value, k.decimals || 0) + ')</i></div>' : '') +
      (subs.length ? '<div class="kpi-sub">' + esc(subs.join(" · ")) + '</div>' : '') +
      '<div class="kpi-foot">' + freshBadge(k, asOfText) + '<span>' + srcLinks(k.src) + '</span></div>' +
      '</div>';
  }).join("");

  /* ---------- Brief ---------- */
  $("brief").innerHTML = D.brief.map(function (b, i) {
    return '<li><span class="n">' + (i + 1) + '</span><div>' +
      '<h3>' + esc(b.headline) + '</h3>' +
      '<p>' + esc(b.body) + ' ' + srcLinks(b.src) + '</p>' +
      '<div class="impact"><b>Türkiye etkisi:</b> ' + esc(b.impact) + ' ' + srcLinks(b.impactSrc) + '</div>' +
      more(b, (b.src || []).concat(b.impactSrc || [])) +
      '</div></li>';
  }).join("");

  /* ---------- Risks ---------- */
  var SEV = {
    high: { l: "Yüksek", icon: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1 11 10H1z" fill="currentColor"/></svg>' },
    mid: { l: "Orta", icon: '<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="1.5" y="1.5" width="9" height="9" rx="1" transform="rotate(45 6 6)" fill="currentColor"/></svg>' },
    low: { l: "Düşük", icon: '<svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.5" fill="currentColor"/></svg>' },
    pos: { l: "Lehte", icon: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1.5v9M1.5 6h9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>' }
  };
  function sevBadge(s) { return '<span class="sev sev-' + s + '">' + SEV[s].icon + SEV[s].l + '</span>'; }
  $("risks").innerHTML = D.risks.map(function (r) {
    return '<li class="risk"><span class="stripe sev-' + r.level + '"></span><div>' +
      '<div class="risk-top"><span class="risk-cat">' + esc(r.category) + '</span>' + sevBadge(r.level) + '</div>' +
      '<div class="risk-title">' + esc(r.title) + '</div>' +
      '<div class="risk-body">' + esc(r.body) + ' ' + srcLinks(r.src) + '</div>' +
      more(r, r.src || []) +
      '</div></li>';
  }).join("");

  /* ---------- Supply / demand ---------- */
  $("sdNote").textContent = D.supplyDemand.source + ", " + when(D.supplyDemand.asOf);
  $("sd").innerHTML = '<caption class="sr">Arz ve talep tahminleri</caption>' + D.supplyDemand.rows.map(function (r) {
    return '<tr><th scope="row">' + esc(r.label) + ' ' + srcLinks(r.src) + '</th><td>' + esc(r.value) + '<small>' + esc(r.change || "") + '</small></td></tr>';
  }).join("");

  /* ---------- Policy ---------- */
  var policy = D.policy.slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  $("policy").innerHTML = '<thead><tr><th>Tarih</th><th>Ülke</th><th>Gelişme</th><th>Etki</th></tr></thead><tbody>' +
    policy.map(function (p) {
      return '<tr><td class="date">' + esc(p.dateLabel || when(p.date)) + '</td><td><span class="flag">' + esc(p.country) + '</span></td>' +
        '<td class="what"><b>' + esc(p.title) + '</b><div>' + esc(p.body) + ' ' + srcLinks(p.src) + '</div>' + more(p, p.src || []) + '</td>' +
        '<td>' + sevBadge(p.level) + '</td></tr>';
    }).join("") + '</tbody>';

  /* ---------- Calendar ---------- */
  // Tek seferlik olaylar tarih sırasıyla; geçmiş olanlar gizlenir. Tekrarlayanlar sonda.
  var today = T.tsiDay(NOW);
  var upcoming = D.calendar.filter(function (c) { return c.date && T.tsiDay(c.date) >= today; })
    .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var recurring = D.calendar.filter(function (c) { return c.recurring && (!c.until || T.tsiDay(c.until) >= today); });
  function countdown(n) { return n === 0 ? "bugün" : n === 1 ? "yarın" : n + " gün"; }
  $("cal").innerHTML = upcoming.concat(recurring).map(function (c) {
    var w, s, soon = false, count = "";
    if (c.date) {
      var p = T.tsiParts(c.date), n = T.tsiDay(c.date) - today;
      w = p.d + " " + MONTHS[p.m];
      s = DAYS[p.wd] + (c.time ? " · " + c.time : "");
      soon = n <= 7;
      if (soon) count = countdown(n);
    } else {
      w = c.recurring;
      s = c.time || "";
    }
    return '<li' + (soon ? ' class="soon"' : '') + '><div class="when">' + esc(w) + '<small>' + esc(s) + '</small></div>' +
      '<div class="ev"><b>' + esc(c.title) + '</b>' + (count ? '<span class="count">' + esc(count) + '</span>' : '') +
      '<div>' + esc(c.body) + ' ' + srcLinks(c.src) + '</div></div></li>';
  }).join("") || '<li><div class="when">—</div><div class="ev">Yaklaşan olay yok.</div></li>';
  var nextKey = upcoming.filter(function (c) { return c.key; })[0];
  if (nextKey) {
    var np = T.tsiParts(nextKey.date);
    $("nextPill").textContent = "Sonraki kritik veri: " + (nextKey.short || nextKey.title) + " · " + np.d + " " + MONTHS[np.m] + (nextKey.time ? " " + nextKey.time : "");
  } else {
    $("nextPill").hidden = true;
  }

  /* ---------- Data feeds ---------- */
  var ST = { used: '<span class="st used"><i></i>Kullanılıyor</span>', plan: '<span class="st plan"><i></i>Sırada</span>', lic: '<span class="st lic"><i></i>Lisans gerekli</span>' };
  function feedFresh(f) {
    if (f.status !== "used") return '<span class="muted">—</span>';
    var item = { asOf: f.latest, checked: f.lastChecked, cadence: f.cadence };
    return freshBadge(item, f.latest ? "son veri " + when(f.latest) : "tarih yok") +
      '<div class="muted">kontrol ' + (f.lastChecked ? when(f.lastChecked) : "yok") + '</div>';
  }
  function renderFeeds(filter) {
    var rows = D.feeds.filter(function (r) { return filter === "all" || (filter === "used" ? r.status === "used" : r.status !== "used"); });
    $("sources").innerHTML = '<thead><tr><th>Kaynak</th><th>Veri</th><th>Sıklık</th><th>Erişim</th><th>Maliyet</th><th>Tazelik</th><th>Durum</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr><td class="what"><b>' + esc(r.name) + '</b>' + (r.ref ? ' ' + srcLinks([r.ref]) : '') + '</td>' +
          '<td>' + esc(r.data) + '</td><td class="date">' + esc(r.freq) + '</td><td>' + esc(r.method) + '</td>' +
          '<td class="cost">' + esc(r.cost) + '</td><td class="date">' + feedFresh(r) + '</td><td>' + ST[r.status] + '</td></tr>';
      }).join("") + '</tbody>';
  }
  var nUsed = D.feeds.filter(function (r) { return r.status === "used"; }).length;
  var nFree = D.feeds.filter(function (r) { return /^Ücretsiz/.test(r.cost); }).length;
  var nLic = D.feeds.filter(function (r) { return r.status === "lic"; }).length;
  $("srcSummary").innerHTML = '<span><b>' + D.feeds.length + '</b> kaynak</span><span><b>' + nUsed + '</b> tanesi bu bültende kullanıldı</span><span><b>' + nFree + '</b> tanesi tamamen ücretsiz</span><span><b>' + nLic + '</b> lisans gerektiriyor</span>';
  renderFeeds("all");

  /* ---------- Open-source projects ---------- */
  var REC = { hemen: "Hemen kullan", degerlendir: "Değerlendir", izle: "İzle", kacin: "Kaçın" };
  var LIC = { serbest: "Serbest", copyleft: "Copyleft koşullu", kisitli: "Kısıtlı" };
  var EFFORT = { dusuk: "Düşük", orta: "Orta", yuksek: "Yüksek" };
  function renderProjects(filter) {
    var rows = D.projects.filter(function (p) { return filter === "all" || p.recommendation === filter; });
    $("oss").innerHTML = '<thead><tr><th>Proje</th><th>Ne işe yarar · long/short katkısı</th><th>Lisans</th><th>Son etkinlik</th><th>Entegrasyon</th><th>Öneri</th></tr></thead><tbody>' +
      (rows.map(function (p) {
        return '<tr><td class="what"><b><a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.name) + '</a></b><div>' + esc(p.category) + '</div></td>' +
          '<td class="what"><div class="ink">' + esc(p.what) + '</div><div><b>Long/short:</b> ' + esc(p.use) + '</div>' +
          (p.caveat ? '<div class="caveat">Dikkat: ' + esc(p.caveat) + '</div>' : '') + '</td>' +
          '<td><span class="lic lic-' + esc(p.commercial) + '">' + esc(LIC[p.commercial] || p.commercial) + '</span><div class="muted mono">' + esc(p.license) + '</div></td>' +
          '<td class="date">' + (p.lastActivity ? when(p.lastActivity, true) : "—") + (p.maintained === false ? '<div class="caveat">bakımsız</div>' : '') + '</td>' +
          '<td>' + esc(EFFORT[p.effort] || p.effort || "—") + '</td>' +
          '<td><span class="rec rec-' + esc(p.recommendation) + '">' + esc(REC[p.recommendation] || p.recommendation) + '</span></td></tr>';
      }).join("") || '<tr><td colspan="6" class="muted">Bu filtrede proje yok.</td></tr>') + '</tbody>';
  }
  var byRec = function (r) { return D.projects.filter(function (p) { return p.recommendation === r; }).length; };
  $("ossSummary").innerHTML = D.projects.length
    ? '<span><b>' + D.projects.length + '</b> proje</span><span><b>' + D.projects.filter(function (p) { return p.commercial === "serbest"; }).length + '</b> tanesi ticari kullanıma serbest</span><span><b>' + byRec("hemen") + '</b> hemen kullanılabilir</span>' +
      (D.meta.projectsCheckedAt ? '<span>Son tarama <b>' + esc(when(D.meta.projectsCheckedAt, true)) + '</b></span>' : '')
    : '<span>Henüz tarama yapılmadı.</span>';
  renderProjects("all");

  /* ---------- Filter buttons ---------- */
  function segment(groupId, render) {
    var btns = document.querySelectorAll("#" + groupId + " button");
    Array.prototype.forEach.call(btns, function (btn) {
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(btns, function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        render(btn.getAttribute("data-f"));
      });
    });
  }
  segment("srcFilter", renderFeeds);
  segment("ossFilter", renderProjects);

  /* ---------- Flow + schema ---------- */
  var FLOW = [
    { t: "Topla", time: "06:30", p: "Claude rutini her sabah yeni bir oturumda başlar. Önce resmi ve ücretsiz kaynaklar (USDA, CFTC, TCMB, Rusya Tarım Bakanlığı, TMO), sonra haber ajansları taranır.", chips: ["Claude rutini", "Resmi kaynaklar", "API", "Haber"] },
    { t: "Doğrula", time: "", p: "Her değerin tarihi kaynağın son yayınıyla karşılaştırılır, fiyatlar iki kaynakla çapraz kontrol edilir. Tazelik kuralını geçemeyen gösterge gerekçesiyle işaretlenir.", chips: ["Tazelik kuralları", "Çapraz kontrol", "kontrol.mjs"] },
    { t: "Yorumla", time: "", p: "Özet ve Türkiye etkisi yalnızca toplanan kayıtlardan yazılır. Kaynak numarası olmayan cümle yayına girmez.", chips: ["Claude", "Kaynak kontrolü"] },
    { t: "Yayınla", time: "≈07:30", p: "data.js main dalına gönderilir, GitHub Pages sayfayı yeniler. Tazelik tarayıcıda yeniden hesaplanır; rutin aksarsa noktalar sararır.", chips: ["Git", "GitHub Pages"] }
  ];
  $("flow").innerHTML = FLOW.map(function (s, i) {
    return '<div class="step"><div class="step-h"><span class="step-n">' + (i + 1) + '</span><b>' + esc(s.t) + '</b><span class="step-time">' + esc(s.time) + '</span></div>' +
      '<p>' + esc(s.p) + '</p><div class="chips">' + s.chips.map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join("") + '</div></div>';
  }).join("");
  $("schema").textContent = "window.HUBUBAT = " + JSON.stringify({
    schema: D.schema, meta: D.meta, kpis: D.kpis.slice(0, 1), brief: D.brief.slice(0, 1), refs: D.refs.slice(0, 1),
    "…": "risks, supplyDemand, exports, ladder, positioning, policy, calendar, chart, feeds, projects"
  }, null, 2);

  /* ---------- References ---------- */
  // Numaralar kaynak id'sidir; silinen kaynaklar yüzünden boşluk olabilir, bu yüzden value açıkça verilir.
  $("refs").innerHTML = D.refs.slice().sort(function (a, b) { return a.id - b.id; }).map(function (s) {
    return '<li value="' + s.id + '" id="s' + s.id + '"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '</a>' +
      (s.published ? ' <span class="muted">· ' + esc(when(s.published, true)) + '</span>' : '') + '</li>';
  }).join("");

  /* ---------- Tooltip helper ---------- */
  function makeTip(container) {
    var t = document.createElement("div"); t.className = "tip"; t.hidden = true; container.appendChild(t);
    return {
      show: function (html, x, y) {
        t.innerHTML = html; t.hidden = false;
        var cw = container.clientWidth, tw = t.offsetWidth, th = t.offsetHeight;
        var left = Math.min(Math.max(x + 12, 0), cw - tw);
        if (x + 12 + tw > cw) left = Math.max(x - tw - 12, 0);
        t.style.left = left + "px"; t.style.top = Math.max(y - th - 10, 0) + "px";
      },
      hide: function () { t.hidden = true; }
    };
  }

  /* ---------- Line chart ---------- */
  var C = D.chart;
  var pts0 = C.points.map(function (s) { return { d: day(s[0]), v: s[1], k: s[2] }; });
  var first = pts0[0], last = pts0[pts0.length - 1];
  var peak = pts0.reduce(function (a, b) { return b.v > a.v ? b : a; });
  $("h-cbot").textContent = C.title;
  $("cbotNote").textContent = C.unit + " · " + pts0.length + " gözlem";
  $("lineChart").setAttribute("aria-label", C.title + " fiyat seyri. İlk gözlem " + trDate(first.d) + " " + fmt(first.v, 1) +
    " sent, en yüksek " + trDate(peak.d) + " " + fmt(peak.v, 1) + " sent, son " + trDate(last.d) + " " + fmt(last.v, 1) + " sent.");
  $("cbotFoot").innerHTML = 'Son gözlem ' + esc(trDate(last.d)) + ', ' + esc(last.k) + '. Kaynaklar: ' + srcLinks(C.src);

  var NS = "http://www.w3.org/2000/svg";
  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function drawLine() {
    var host = $("lineChart");
    host.innerHTML = "";
    var W = Math.max(host.clientWidth, 280), narrow = W < 520;
    var H = narrow ? 230 : 270;
    var m = { l: 40, r: narrow ? 52 : 64, t: 22, b: 26 };
    // Eksen: ilk gözlemin ayından bugünden bir hafta sonrasına; fiyat aralığı 50'lik adımlara yuvarlanır.
    var x0 = Date.UTC(first.d.getUTCFullYear(), first.d.getUTCMonth(), 1, 12);
    var x1 = Math.max(last.d.getTime(), NOW.getTime()) + 7 * 864e5;
    var vals = pts0.map(function (p) { return p.v; });
    var step = Math.max.apply(null, vals) - Math.min.apply(null, vals) > 400 ? 100 : 50;
    var yMin = Math.floor((Math.min.apply(null, vals) - 10) / step) * step;
    var yMax = Math.ceil((Math.max.apply(null, vals) + 10) / step) * step;
    function X(t) { return m.l + (t - x0) / (x1 - x0) * (W - m.l - m.r); }
    function Y(v) { return m.t + (yMax - v) / (yMax - yMin) * (H - m.t - m.b); }
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, "aria-hidden": "true" }, host);

    for (var v = yMin; v <= yMax; v += step) {
      el("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: "var(--line)", "stroke-width": 1 }, svg);
      var tx = el("text", { x: m.l - 8, y: Y(v) + 3.5, "text-anchor": "end", "class": "axis-t" }, svg); tx.textContent = v;
    }
    var months = [];
    for (var t = x0; t <= x1; t = Date.UTC(new Date(t).getUTCFullYear(), new Date(t).getUTCMonth() + 1, 1, 12)) months.push(t);
    var every = Math.ceil(months.length / (narrow ? 6 : 12));
    months.forEach(function (t, i) {
      if (i % every) return;
      var xx = X(t), dt = new Date(t);
      el("line", { x1: xx, x2: xx, y1: H - m.b, y2: H - m.b + 4, stroke: "var(--line-strong)", "stroke-width": 1 }, svg);
      var lt = el("text", { x: xx, y: H - m.b + 16, "text-anchor": "middle", "class": "axis-t" }, svg);
      lt.textContent = MONTHS[dt.getUTCMonth()] + (dt.getUTCMonth() === 0 && i ? " " + String(dt.getUTCFullYear()).slice(2) : "");
    });

    var pts = pts0.map(function (p) { return { d: p.d, x: X(p.d.getTime()), y: Y(p.v), v: p.v, k: p.k }; });
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i];
      var gap = (b.d - a.d) / 864e5 > 14;
      el("line", {
        x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        stroke: gap ? "var(--muted)" : "var(--accent)", "stroke-width": gap ? 1.5 : 2,
        "stroke-dasharray": gap ? "1.5 4" : "none", "stroke-linecap": "round"
      }, svg);
    }
    // Seyrek seride her nokta, yoğun seride yalnızca son nokta işaretlenir.
    pts.forEach(function (p, i) {
      var isLast = i === pts.length - 1;
      if (pts.length > 60 && !isLast) return;
      el("circle", { cx: p.x, cy: p.y, r: isLast ? 5 : 4, fill: "var(--accent)", stroke: "var(--surface)", "stroke-width": 2 }, svg);
    });
    var maxP = pts.reduce(function (a, b) { return b.v > a.v ? b : a; });
    var mt = el("text", { x: maxP.x, y: maxP.y - 11, "text-anchor": "middle", "class": "lbl-t" }, svg); mt.textContent = fmt(maxP.v, 1);
    var lastP = pts[pts.length - 1];
    var l1 = el("text", { x: lastP.x + 9, y: lastP.y - 2, "class": "lbl-t" }, svg); l1.textContent = fmt(lastP.v, 1);
    var l2 = el("text", { x: lastP.x + 9, y: lastP.y + 11, "class": "lbl-s" }, svg); l2.textContent = trDate(lastP.d);

    var cross = el("line", { x1: 0, x2: 0, y1: m.t, y2: H - m.b, stroke: "var(--ink-2)", "stroke-width": 1, opacity: 0 }, svg);
    var ring = el("circle", { cx: 0, cy: 0, r: 7, fill: "none", stroke: "var(--accent)", "stroke-width": 2, opacity: 0 }, svg);
    var hit = el("rect", { x: m.l, y: m.t, width: W - m.l - m.r + 30, height: H - m.t - m.b, fill: "transparent" }, svg);
    var tip = makeTip(host);
    function onMove(ev) {
      var r = svg.getBoundingClientRect();
      var mx = (ev.clientX - r.left) * (W / r.width);
      var best = pts[0];
      pts.forEach(function (p) { if (Math.abs(p.x - mx) < Math.abs(best.x - mx)) best = p; });
      cross.setAttribute("x1", best.x); cross.setAttribute("x2", best.x); cross.setAttribute("opacity", 0.35);
      ring.setAttribute("cx", best.x); ring.setAttribute("cy", best.y); ring.setAttribute("opacity", 1);
      var idx = pts.indexOf(best), prev = pts[idx - 1];
      var chg = prev ? (best.v - prev.v) / prev.v * 100 : null;
      tip.show('<div class="t-s">' + best.d.getUTCDate() + " " + MONTHS[best.d.getUTCMonth()] + " " + best.d.getUTCFullYear() + ' · ' + esc(best.k) + '</div><b>' + fmt(best.v, 2) + ' ¢/bu</b>' +
        '<div class="t-s">≈ ' + fmt(best.v / 100 * C.perTonne, 0) + ' $/t' + (chg !== null ? ' · önceki gözleme göre ' + signPct(chg) : '') + '</div>',
        best.x * (r.width / W), best.y * (r.height / H));
    }
    function onLeave() { cross.setAttribute("opacity", 0); ring.setAttribute("opacity", 0); tip.hide(); }
    hit.addEventListener("pointermove", onMove);
    hit.addEventListener("pointerdown", onMove);
    hit.addEventListener("pointerleave", onLeave);
  }

  /* ---------- HTML bars ---------- */
  function drawBars(id, rows, max, unit) {
    var host = $(id);
    host.innerHTML = "";
    host.style.position = "relative";
    var tip = makeTip(host);
    rows.forEach(function (r) {
      var row = document.createElement("div"); row.className = "bar-row";
      row.innerHTML = '<div class="bar-lab"><span>' + esc(r.label) + '</span>' + (r.tag ? '<em>' + esc(r.tag) + '</em>' : '') + '</div>';
      var track = document.createElement("div"); track.className = "bar-track base";
      var bar = document.createElement("div"); bar.className = "bar" + (r.est ? " est" : "");
      bar.style.width = (r.v / max * 78) + "%";
      track.appendChild(bar);
      if (r.hi) {
        var wsk = document.createElement("div"); wsk.className = "whisker";
        wsk.style.left = (r.v / max * 78) + "%"; wsk.style.width = ((r.hi - r.v) / max * 78) + "%";
        track.appendChild(wsk);
      }
      var val = document.createElement("span"); val.className = "bar-val"; val.textContent = r.disp;
      if (r.hi) val.style.marginLeft = "calc(" + ((r.hi - r.v) / max * 78) + "% + 8px)";
      track.appendChild(val);
      var hitEl = document.createElement("div"); hitEl.className = "bar-hit"; track.appendChild(hitEl);
      function show(ev) {
        var hr = host.getBoundingClientRect();
        tip.show('<div class="t-s">' + esc(r.label) + '</div><b>' + esc(r.disp) + ' ' + esc(unit) + '</b>' + (r.note ? '<div class="t-s">' + esc(r.note) + '</div>' : ''),
          ev.clientX - hr.left, ev.clientY - hr.top);
      }
      hitEl.addEventListener("pointermove", show);
      hitEl.addEventListener("pointerdown", show);
      hitEl.addEventListener("pointerleave", function () { tip.hide(); });
      row.appendChild(track);
      host.appendChild(row);
    });
  }

  /* ---------- Positioning (CFTC COT) ---------- */
  var P = D.positioning;
  function drawPositioning() {
    var host = $("posBars");
    if (!P || !P.rows.length) { host.innerHTML = '<div class="muted">Veri bekleniyor.</div>'; return; }
    $("posNote").innerHTML = freshBadge(P, when(P.asOf) + " pozisyonu");
    var maxAbs = Math.max.apply(null, P.rows.map(function (r) { return Math.abs(r.long - r.short); })) || 1;
    host.innerHTML = P.rows.map(function (r) {
      var net = r.long - r.short, chg = r.changeLong - r.changeShort, side = net >= 0 ? "long" : "short";
      var w = Math.abs(net) / maxAbs * 48;
      var tip = r.label + ": net " + side + " " + fmt(Math.abs(net), 0) + " kontrat, açık pozisyonun %" + fmt(Math.abs(net) / r.oi * 100, 1) + "'i";
      return '<div class="pos-row" title="' + esc(tip) + '"><div class="bar-lab"><span>' + esc(r.label) + '</span><b class="' + side + '">net ' + side + ' ' + fmt(Math.abs(net), 0) + '</b></div>' +
        '<div class="pos-track"><div class="pos-bar ' + side + '" style="width:' + w.toFixed(2) + '%"></div></div>' +
        '<div class="pos-sub">long ' + fmt(r.long, 0) + ' · short ' + fmt(r.short, 0) + ' · haftalık ' + (chg >= 0 ? "+" : "−") + fmt(Math.abs(chg), 0) + '</div></div>';
    }).join("");
    $("posFoot").innerHTML = esc(P.source) + ', kontrat. Salı pozisyonları, Cuma yayımlanır; "haftalık" net pozisyondaki değişimdir. ' + srcLinks(P.src);
  }
  drawPositioning();

  var E = D.exports;
  $("expNote").textContent = E.note;
  $("expFoot").innerHTML = esc(E.footnote) + ' ' + srcLinks(E.src);
  var expRows = E.rows.map(function (r) { return { label: r.label, tag: r.tag, v: r.value, hi: r.hi, est: r.estimate, disp: r.display, note: r.note }; });

  // Fiyat merdiveni göstergelerden hesaplanır, böylece şeritteki rakamlarla hep aynı kalır.
  var fxK = KPI.usdtry;
  var ladRows = D.ladder.map(function (r) {
    var k = KPI[r.kpi], v = usdPerTonne(k), calc = !!(k.perTonne || k.fx || k.eur);
    var how = k.perTonne ? fmt(k.value, k.decimals || 0) + " ¢/bu × " + fmt(k.perTonne, 2) + " bu/t"
      : k.fx ? fmt(k.value, 0) + " TL/t ÷ " + fmt(KPI[k.fx].value, 2)
      : k.eur ? fmt(k.value, k.decimals || 0) + " €/t × " + fmt(eurUsd(), 4) + " EUR/USD" : null;
    var note = [r.note, how, when(k.asOf) + (k.asOfNote ? " " + k.asOfNote : "")].filter(Boolean).join(" · ");
    return { label: r.label, tag: calc ? "hesaplanan" : null, v: v, disp: (calc || k.approx ? "≈" : "") + fmt(v, 0), note: note, day: T.tsiDay(k.asOf) };
  });
  var ladDays = ladRows.map(function (r) { return r.day; });
  var lmin = Math.min.apply(null, ladDays), lmax = Math.max.apply(null, ladDays);
  $("ladNote").textContent = "$/ton · " + when(new Date(lmin * 864e5)) + (lmax !== lmin ? " – " + when(new Date(lmax * 864e5)) : "");
  $("ladFoot").textContent = "Teslim şekilleri ve kaliteler farklı. Bu bir yön göstergesidir, doğrudan maliyet karşılaştırması değildir. " +
    "≈ işaretli değerler hesaplanmıştır (1 ton = 36,74 bu" + (fxK ? "; 1 $ = " + fmt(fxK.value, 2) + " TL" : "") + ").";
  var ladMax = Math.ceil(Math.max.apply(null, ladRows.map(function (r) { return r.v; })) * 1.06 / 50) * 50;

  function drawAll() {
    drawLine();
    drawBars("expBars", expRows, E.max, E.unit);
    drawBars("ladder", ladRows, ladMax, "$/t");
  }
  drawAll();
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(drawLine, 120); });

  /* ---------- Live FX (GitHub Pages / tarayıcı) ----------
     Sayfa açılınca USD/TRY ve EUR/TRY canlı çekilir. Kaynaklar yanıt vermezse bültendeki değer kalır. */
  var fx = document.querySelector('#ticker .kpi[data-id="usdtry"]');
  if (!fx || !window.fetch) return;
  function timed(url) {
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 6000);
    return fetch(url, ctl ? { signal: ctl.signal } : {}).then(function (r) {
      clearTimeout(timer);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }
  function coinbase() {
    return timed("https://api.coinbase.com/v2/exchange-rates?currency=USD").then(function (d) {
      var tr = parseFloat(d.data.rates.TRY), eur = parseFloat(d.data.rates.EUR);
      if (!(tr > 0 && eur > 0)) throw new Error("veri yok");
      return { usd: tr, eur: tr / eur, src: "Coinbase", live: true };
    });
  }
  function erApi() {
    return timed("https://open.er-api.com/v6/latest/USD").then(function (d) {
      var tr = d.rates.TRY, eur = d.rates.EUR;
      if (!(tr > 0 && eur > 0)) throw new Error("veri yok");
      return { usd: tr, eur: tr / eur, src: "ExchangeRate-API", live: false, at: d.time_last_update_unix * 1000 };
    });
  }
  coinbase().catch(erApi).then(function (q) {
    fx.querySelector(".kpi-value b").textContent = fmt(q.usd, 2);
    var sub = fx.querySelector(".kpi-sub");
    if (sub) sub.textContent = ["EUR/TRY " + fmt(q.eur, 2), KPI.usdtry.sub].filter(Boolean).join(" · ");
    var f = fx.querySelector(".fresh");
    f.className = "fresh f-guncel";
    f.title = q.live ? "Canlı kur, sayfa açılırken " + q.src + " servisinden çekildi." : "Günlük kur, " + q.src + " (son güncelleme " + when(new Date(q.at)) + ").";
    f.innerHTML = '<i aria-hidden="true"></i><span class="asof">' + (q.live ? "Canlı · " + hm(T.tsiParts(new Date())) : "Günlük · " + when(new Date(q.at))) + " · " + esc(q.src) + "</span>";
  }).catch(function () { /* bültendeki değer kalır */ });
})();
