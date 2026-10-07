/* Tazelik kuralları. Sayfa (app.js) ve doğrulama betiği (scripts/kontrol.mjs) bu dosyayı ortak kullanır,
   böylece tarayıcıda görülen renk ile rutinin kontrolü aynı sonucu verir.
   Türkiye kalıcı olarak UTC+3 kullandığı için saat dilimi sabittir. */
(function (root) {
  "use strict";

  var TSI_MS = 3 * 3600e3;
  var DAY_MS = 864e5;

  // fresh: bu gecikmeye kadar "güncel"; late: bu gecikmeye kadar "gecikmiş"; sonrası "eski".
  // gunluk seriler iş günüyle, diğerleri takvim günüyle ölçülür. olay bazlı veride yalnızca son kontrol önemlidir.
  var CADENCE = {
    gunluk: { label: "Günlük", unit: "isgunu", fresh: 1, late: 2 },
    haftalik: { label: "Haftalık", unit: "gun", fresh: 8, late: 15 },
    aylik: { label: "Aylık", unit: "gun", fresh: 35, late: 45 },
    olay: { label: "Olay bazlı", unit: null }
  };
  // Son kontrol bu kadar saatten eskiyse rutin o veriye bakmamış demektir.
  var CHECK = { fresh: 30, late: 54 };
  var LEVELS = ["guncel", "gecikmis", "eski"];
  var LABEL = { guncel: "Güncel", gecikmis: "Gecikmiş", eski: "Eski" };

  function toDate(v) {
    // instanceof yerine: Node'da bu dosya ayrı bir vm bağlamında çalışır, Date oradan farklıdır.
    if (Object.prototype.toString.call(v) === "[object Date]") return isNaN(v.getTime()) ? null : v;
    if (typeof v !== "string") return null;
    // Saatsiz tarih, TSİ'de o günün öğlesi kabul edilir.
    var d = /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(v + "T12:00:00+03:00") : new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }
  // TSİ takvim günü (UTC gece yarısından beri gün sayısı olarak)
  function tsiDay(v) {
    var d = toDate(v);
    return d ? Math.floor((d.getTime() + TSI_MS) / DAY_MS) : null;
  }
  function tsiParts(v) {
    var d = toDate(v);
    if (!d) return null;
    var s = new Date(d.getTime() + TSI_MS);
    return { y: s.getUTCFullYear(), m: s.getUTCMonth(), d: s.getUTCDate(), wd: s.getUTCDay(), hh: s.getUTCHours(), mm: s.getUTCMinutes() };
  }
  function tsiDate(v) {
    var p = tsiParts(v);
    return p ? p.y + "-" + String(p.m + 1).padStart(2, "0") + "-" + String(p.d).padStart(2, "0") : null;
  }
  function hasTime(v) { return typeof v === "string" && v.indexOf("T") > 0; }
  // a'dan sonra, b dahil, hafta içi gün sayısı (gün numaraları tsiDay ile)
  function weekdaysBetween(a, b) {
    var n = 0;
    for (var x = a + 1; x <= b; x++) {
      var wd = (x + 4) % 7; // 1970-01-01 Perşembe
      if (wd !== 0 && wd !== 6) n++;
    }
    return n;
  }
  function worse(a, b) { return LEVELS.indexOf(a) >= LEVELS.indexOf(b) ? a : b; }

  /* item: { asOf, checked, cadence, maxAge?, staleReason? } → { level, label, lag, unit, checkedHours, reasons[] }
     maxAge: yayın gecikmesi bilinen seriler için sıklığın "güncel" sınırını değiştirir (ör. CFTC COT: 10 gün). */
  function status(item, now) {
    now = toDate(now) || new Date();
    var reasons = [];
    var level = "guncel";
    var cad = CADENCE[item.cadence];
    var lag = null;

    if (!cad) {
      reasons.push("bilinmeyen sıklık: " + item.cadence);
      level = "eski";
    } else if (cad.unit) {
      var a = tsiDay(item.asOf), today = tsiDay(now);
      if (a === null) {
        reasons.push("veri tarihi yok");
        level = "eski";
      } else {
        var fresh = item.maxAge != null ? item.maxAge : cad.fresh;
        var late = fresh + (cad.late - cad.fresh);
        lag = cad.unit === "isgunu" ? weekdaysBetween(a, today) : today - a;
        var u = cad.unit === "isgunu" ? " iş günü" : " gün";
        if (lag > late) { level = "eski"; reasons.push("veri " + lag + u + " eski (sınır " + fresh + ")"); }
        else if (lag > fresh) { level = "gecikmis"; reasons.push("veri " + lag + u + " eski (sınır " + fresh + ")"); }
      }
    }

    var c = toDate(item.checked), hours = null;
    if (!c) {
      reasons.push("hiç kontrol edilmemiş");
      level = "eski";
    } else {
      hours = (now - c) / 3600e3;
      if (hours > CHECK.late) { level = worse(level, "eski"); reasons.push("son kontrol " + Math.floor(hours / 24) + " gün önce"); }
      else if (hours > CHECK.fresh) { level = worse(level, "gecikmis"); reasons.push("son kontrol " + Math.round(hours) + " saat önce"); }
    }
    if (item.staleReason && level !== "guncel") reasons.push("not: " + item.staleReason);

    return { level: level, label: LABEL[level], lag: lag, unit: cad && cad.unit, checkedHours: hours, reasons: reasons };
  }

  root.HububatTazelik = {
    CADENCE: CADENCE, CHECK: CHECK, LEVELS: LEVELS, LABEL: LABEL,
    status: status, worse: worse, toDate: toDate, tsiDay: tsiDay, tsiDate: tsiDate, tsiParts: tsiParts,
    hasTime: hasTime, weekdaysBetween: weekdaysBetween
  };
})(typeof window !== "undefined" ? window : globalThis);
