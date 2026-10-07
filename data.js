/* Türkiye Hububat Masası · bülten verisi.
   Bu dosyayı her sabah Claude rutini günceller (.claude/skills/sabah-guncellemesi/SKILL.md).
   Biçim: window.HUBUBAT ataması ve ardından saf JSON. Alanlar: README → Veri sözleşmesi.
   Değiştirdikten sonra: node scripts/veri.mjs bicimle && node scripts/kontrol.mjs */
window.HUBUBAT = {
  "schema": 1,
  "meta": {
    "bulletinDate": "2026-10-07",
    "generatedAt": "2026-10-07T08:00:00+03:00",
    "generatedBy": "Elle derlendi (prototip)",
    "projectsCheckedAt": "2026-10-07"
  },
  "kpis": [
    {
      "id": "cbot_wheat",
      "label": "CBOT buğday · Ara-26",
      "contract": "Dec 26",
      "value": 704.25,
      "decimals": 2,
      "unit": "¢/bu",
      "base": { "value": 698.5, "label": "30 Eyl seans içi fiyatına göre" },
      "perTonne": 36.7437,
      "asOf": "2026-10-06",
      "asOfNote": "uzlaşma",
      "cadence": "gunluk",
      "checked": "2026-10-07T16:59:00+03:00",
      "src": [26]
    },
    {
      "id": "cbot_corn",
      "label": "CBOT mısır · Ara-26",
      "contract": "Dec 26",
      "value": 508,
      "decimals": 2,
      "unit": "¢/bu",
      "base": { "value": 524.75, "label": "30 Eyl seans içi fiyatına göre" },
      "perTonne": 39.368,
      "asOf": "2026-10-06",
      "asOfNote": "uzlaşma",
      "cadence": "gunluk",
      "checked": "2026-10-07T16:59:00+03:00",
      "src": [26]
    },
    {
      "id": "cbot_soy",
      "label": "CBOT soya · Kas-26",
      "contract": "Nov 26",
      "value": 1303,
      "decimals": 2,
      "unit": "¢/bu",
      "base": { "value": 1305.25, "label": "30 Eyl seans içi fiyatına göre" },
      "perTonne": 36.7437,
      "asOf": "2026-10-06",
      "asOfNote": "uzlaşma",
      "cadence": "gunluk",
      "checked": "2026-10-07T16:59:00+03:00",
      "src": [26]
    },
    {
      "id": "ru_fob",
      "label": "Rus buğdayı FOB · %12,5",
      "value": 212,
      "decimals": 0,
      "unit": "$/t",
      "sub": "Novorossiysk · işlem az, fiyat nominal",
      "asOf": "2026-09-30",
      "asOfNote": "Eylül sonu",
      "cadence": "haftalik",
      "checked": "2026-10-07T08:00:00+03:00",
      "src": [4]
    },
    {
      "id": "eu_wheat",
      "label": "AB buğdayı",
      "value": 289,
      "decimals": 0,
      "approx": true,
      "unit": "$/t",
      "spread": { "kpi": "ru_fob", "label": "Rus FOB ile fark" },
      "asOf": "2026-09-30",
      "asOfNote": "Eylül sonu",
      "cadence": "gunluk",
      "checked": "2026-10-07T08:00:00+03:00",
      "src": [4]
    },
    {
      "id": "ru_duty",
      "label": "Rus ihracat vergisi · buğday",
      "value": 0,
      "decimals": 0,
      "unit": "RUB/t",
      "sub": "31 Ara'ya kadar · önceki 787,5",
      "asOf": "2026-09-19",
      "asOfNote": "kararname",
      "cadence": "olay",
      "checked": "2026-10-07T08:00:00+03:00",
      "src": [5, 7]
    },
    {
      "id": "usdtry",
      "label": "USD/TRY",
      "value": 49.1978,
      "decimals": 2,
      "unit": "",
      "secondary": { "label": "EUR/TRY", "value": 55.0239, "decimals": 2 },
      "asOf": "2026-10-07T16:59:00+03:00",
      "cadence": "gunluk",
      "checked": "2026-10-07T16:59:00+03:00",
      "src": [23, 24],
      "sub": "TCMB gösterge 7 Eki 15:30: 49,15",
      "asOfNote": "piyasa"
    },
    {
      "id": "tmo_sell",
      "label": "TMO satış · ekmeklik buğday",
      "value": 18500,
      "decimals": 0,
      "unit": "TL/t",
      "fx": "usdtry",
      "asOf": "2026-10-01",
      "asOfNote": "yürürlük",
      "cadence": "olay",
      "checked": "2026-10-07T08:00:00+03:00",
      "src": [11]
    }
  ],
  "brief": [
    {
      "headline": "Karadeniz'deki lojistik kriz Rus ihracatını sert biçimde kesiyor",
      "body": "Novorossiysk'teki üç ana tahıl terminali (yıllık yaklaşık 24,6 Mt kapasite) Ağustos saldırılarından sonra durdu. Rus Tahıl Birliği Eylül buğday ihracatını 1 Mt civarında bekliyor; geçen yıl aynı ay 5,7 Mt idi. SovEcon 30 Eylül'de 2026/27 Rus tahıl ihracat tahminini 49,4 Mt'tan 44,7 Mt'a indirdi.",
      "src": [8, 4, 2],
      "impact": "Rusya, Türkiye'nin ana buğday tedarikçisi; Ocak–Mayıs'ta Türkiye'ye tahıl ihracatı değer olarak ikiye katlanmıştı. Açık sözleşmelerde teslim tarihi, navlun ve savaş riski sigortası maddeleri gözden geçirilmeli. Türkiye, taraflarla güvenli seyir önerileri üzerinde çalışıyor.",
      "impactSrc": [19, 9]
    },
    {
      "headline": "Rus ve AB buğdayı arasındaki fark 77 $/t'a açıldı",
      "body": "Rus buğdayı FOB Novorossiysk 212 $/t, AB buğdayı 289 $/t civarında. İhraç edilemeyen Rus buğdayının iç piyasa fiyatı 8.900 RUB/t'a geriledi. Rusya, tahıl ihracat vergilerini 1 Eylül'den geçerli olmak üzere 31 Aralık'a kadar sıfırladı.",
      "src": [4, 5],
      "impact": "Teslim edilebilir Rus kargosu bulan ithalatçı için belirgin maliyet avantajı var, ama teslim riski yüksek. Aynı fark Mısır gibi alıcıları Fransız buğdayına yöneltiyor.",
      "impactSrc": [10]
    },
    {
      "headline": "CBOT buğdayı Eylül başından geri çekildi; gözler Cuma'daki WASDE'de",
      "body": "Aralık kontratı 1 Eylül'deki 782,5 ¢ uzlaşmasından 30 Eylül'de 698,5 ¢'e indi; bir gün önce altı haftanın dibini görmüştü. Ekim WASDE raporu 9 Ekim Cuma 19:00 TSİ'de yayımlanacak.",
      "src": [1, 2, 15],
      "impact": "İç piyasa rahat: rekor 23 Mt üstü hasat, TMO satışları 1 Ekim'de 18.500 TL/t'dan başladı ve ekmeklik buğday ihracatı 29 Temmuz'dan beri açık.",
      "impactSrc": [13, 11, 12]
    }
  ],
  "risks": [
    {
      "category": "Lojistik",
      "title": "Karadeniz ve Novorossiysk",
      "body": "Ana tahıl terminalleri kapalı; Azak Denizi'nde 10 Temmuz'dan beri seyir kısıtlaması var.",
      "level": "high",
      "src": [8]
    },
    {
      "category": "Hava",
      "title": "Güney Rusya kışlık ekimi",
      "body": "Güz ekimi ikinci yıl üst üste düşük toprak nemiyle başlıyor; 2027 hasadı için erken uyarı.",
      "level": "high",
      "src": [17]
    },
    {
      "category": "Fiyat",
      "title": "WASDE öncesi oynaklık",
      "body": "CBOT buğday altı haftalık dibin ardından tepki veriyor; Cuma raporu yön belirleyebilir.",
      "level": "mid",
      "src": [2]
    },
    {
      "category": "Politika",
      "title": "Rus ihracat vergisi muafiyeti",
      "body": "Tahıl vergisi yıl sonuna kadar sıfır; ihracat yolu açılırsa Rus fiyatlarını destekler.",
      "level": "pos",
      "src": [5]
    },
    {
      "category": "Hava",
      "title": "Türkiye yeni sezon",
      "body": "2026 su yılı yağışı son 66 yılın en yükseği oldu; yaygın kuraklık riski bildirilmiyor.",
      "level": "low",
      "src": [18]
    }
  ],
  "supplyDemand": {
    "source": "USDA WASDE",
    "asOf": "2026-09-11",
    "rows": [
      { "label": "Dünya buğday bitiş stoku 2026/27", "value": "276,3 Mt", "change": "▲ Ağu 273,3", "src": [14] },
      { "label": "Dünya buğday bitiş stoku 2025/26", "value": "280,6 Mt", "change": "Ağu 280,2", "src": [14] },
      { "label": "ABD mısır üretimi 2026/27", "value": "15,80 mlr bu", "change": "▼ Ağu 16,01", "src": [14] },
      { "label": "ABD buğday bitiş stoku 2026/27", "value": "717 mn bu", "change": "Ağu 717", "src": [14] },
      { "label": "Rusya tahıl ihracatı 2026/27 (SovEcon)", "value": "44,7 Mt", "change": "▼ önceki 49,4", "src": [2] },
      { "label": "Türkiye buğday üretimi 2026", "value": "23 Mt üstü", "change": "rekor", "src": [13] }
    ]
  },
  "exports": {
    "note": "Milyon ton · aylık",
    "unit": "Mt",
    "max": 6,
    "footnote": "Çizgili çubuk tahmindir. Bıyık, Rusagrotrans'ın daha yüksek tahminini gösterir.",
    "src": [4, 21],
    "rows": [
      { "label": "Eylül 2025", "value": 5.7, "display": "5,7", "note": "Geçen yılın aynı ayı" },
      { "label": "Ağustos 2026", "value": 1.3, "display": "1,3", "note": "Rus Tahıl Birliği" },
      {
        "label": "Eylül 2026",
        "tag": "tahmin",
        "value": 1,
        "hi": 1.75,
        "estimate": true,
        "display": "≈1,0",
        "note": "Rus Tahıl Birliği ≈1,0 · Rusagrotrans 1,75"
      }
    ]
  },
  "ladder": [
    { "label": "Rus buğdayı FOB Novorossiysk", "kpi": "ru_fob", "note": "%12,5 protein" },
    { "label": "CBOT buğday, Ara-26", "kpi": "cbot_wheat" },
    { "label": "AB buğdayı", "kpi": "eu_wheat" },
    { "label": "TMO satış, ekmeklik buğday", "kpi": "tmo_sell", "note": "yurt içi teslim" }
  ],
  "positioning": {
    "title": "Fon pozisyonları",
    "source": "CFTC COT · managed money",
    "cadence": "haftalik",
    "maxAge": 10,
    "asOf": "2026-09-29",
    "checked": "2026-10-07T16:59:00+03:00",
    "src": [25],
    "rows": [
      {
        "label": "CBOT buğday (SRW)",
        "code": "001602",
        "long": 82747,
        "short": 104856,
        "changeLong": -6054,
        "changeShort": 4039,
        "oi": 483142
      },
      {
        "label": "KC buğday (HRW)",
        "code": "001612",
        "long": 71011,
        "short": 40334,
        "changeLong": -5728,
        "changeShort": 4230,
        "oi": 306523
      },
      {
        "label": "CBOT mısır",
        "code": "002602",
        "long": 439843,
        "short": 58623,
        "changeLong": -31623,
        "changeShort": -8746,
        "oi": 1857317
      },
      {
        "label": "CBOT soya",
        "code": "005602",
        "long": 280875,
        "short": 34317,
        "changeLong": -19867,
        "changeShort": -1266,
        "oi": 1090227
      }
    ]
  },
  "policy": [
    {
      "date": "2026-09-30",
      "country": "RU",
      "title": "SovEcon ihracat tahminini düşürdü",
      "body": "2026/27 Rus tahıl ihracatı 49,4 Mt'tan 44,7 Mt'a; gerekçe güney limanlarındaki aksama.",
      "level": "mid",
      "src": [2]
    },
    {
      "date": "2026-10-01",
      "country": "TR",
      "title": "TMO hububat satışları başladı",
      "body": "Ekmeklik ve makarnalık buğday 18.500 TL/t, arpa 14.000 TL/t (2. grup).",
      "level": "mid",
      "src": [11]
    },
    {
      "date": "2026-09-22",
      "dateLabel": "19–22 Eyl",
      "country": "RU",
      "title": "Tahıl ihracat vergisi yıl sonuna kadar sıfır",
      "body": "Buğday, arpa ve mısır; 1 Eylül'den geriye dönük. Ayçiçek yağı vergisi 7.748 RUB/t'da sabitlendi.",
      "level": "high",
      "src": [5, 6]
    },
    {
      "date": "2026-08-12",
      "country": "RU",
      "title": "Novorossiysk'te üç ana terminal durdu",
      "body": "KSK, NZT ve NKHP, Rusya'nın Karadeniz tahıl terminal kapasitesinin yaklaşık %75'i.",
      "level": "high",
      "src": [8, 10]
    },
    {
      "date": "2026-07-29",
      "country": "TR",
      "title": "Ekmeklik buğday ihracatı yeniden açıldı",
      "body": "Mart 2025'ten beri kapalıydı. Başvurular OAİB üzerinden, TMO onayıyla.",
      "level": "mid",
      "src": [12]
    },
    {
      "date": "2026-06-01",
      "dateLabel": "Haz",
      "country": "TR",
      "title": "TMO 2026 alım fiyatları",
      "body": "Buğday 16.500 TL/t, arpa 12.750 TL/t; desteklerle buğdayda 19.514 TL/t.",
      "level": "low",
      "src": [11]
    }
  ],
  "calendar": [
    {
      "date": "2026-10-09",
      "time": "19:00",
      "title": "USDA WASDE (Ekim)",
      "short": "WASDE",
      "body": "Dünya ve ABD arz-talep tahminleri",
      "key": true,
      "src": [15]
    },
    {
      "date": "2026-11-10",
      "time": "20:00",
      "title": "USDA WASDE (Kasım)",
      "short": "WASDE",
      "body": "ABD'de yaz saati bittiği için saat 20:00",
      "key": true,
      "src": [15]
    },
    {
      "date": "2026-12-31",
      "title": "Rus tahıl vergisi muafiyeti bitiyor",
      "body": "Uzatma kararı takip edilecek",
      "src": [5]
    },
    {
      "recurring": "Her Pzt",
      "time": "23:00",
      "title": "USDA Crop Progress",
      "body": "ABD ekim ve hasat ilerlemesi, 30 Kasım'a kadar",
      "until": "2026-11-30",
      "src": [22]
    },
    {
      "recurring": "Her Per",
      "time": "15:30",
      "title": "USDA haftalık ihracat satışları",
      "body": "ABD buğday, mısır ve soya satışları",
      "src": [22]
    }
  ],
  "chart": {
    "title": "CBOT buğday, Aralık 2026 kontratı",
    "kpi": "cbot_wheat",
    "contract": "Ara-26",
    "unit": "¢/bushel",
    "perTonne": 36.7437,
    "src": [1, 3, 2],
    "points": [
      ["2026-01-26", 579.25, "AMS uzlaşma"],
      ["2026-01-27", 577, "AMS uzlaşma"],
      ["2026-01-29", 592, "AMS uzlaşma"],
      ["2026-05-06", 654, "AMS uzlaşma"],
      ["2026-05-12", 710.25, "AMS uzlaşma"],
      ["2026-05-14", 691, "AMS uzlaşma"],
      ["2026-05-18", 696.25, "AMS uzlaşma"],
      ["2026-05-19", 698.75, "AMS uzlaşma"],
      ["2026-05-20", 692.25, "AMS uzlaşma"],
      ["2026-06-03", 620.5, "AMS uzlaşma"],
      ["2026-06-10", 617.25, "AMS uzlaşma"],
      ["2026-06-12", 612, "AMS uzlaşma"],
      ["2026-07-27", 677.5, "AMS uzlaşma"],
      ["2026-08-03", 669.25, "AMS uzlaşma"],
      ["2026-08-21", 699.25, "Kapanış (top agrar)"],
      ["2026-08-26", 748.25, "AMS uzlaşma"],
      ["2026-09-01", 782.5, "AMS uzlaşma"],
      ["2026-09-04", 734, "AMS uzlaşma"],
      ["2026-09-08", 747, "AMS uzlaşma"],
      ["2026-09-30", 698.5, "Seans içi (Reuters)"],
      ["2026-10-06", 704.25, "AMS uzlaşma"]
    ]
  },
  "feeds": [
    {
      "name": "USDA AMS günlük raporları",
      "data": "CBOT, KC, MGEX uzlaşma fiyatları",
      "freq": "Günlük",
      "cadence": "gunluk",
      "method": "PDF ayrıştırma",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 26,
      "latest": "2026-10-06",
      "lastChecked": "2026-10-07T16:59:00+03:00"
    },
    {
      "name": "Reuters (haber akışı)",
      "data": "Seans öncesi beklenti, tahmin revizyonları",
      "freq": "Günlük",
      "cadence": "gunluk",
      "method": "RSS / haber",
      "cost": "Özet ücretsiz",
      "status": "used",
      "ref": 2,
      "latest": "2026-09-30",
      "lastChecked": "2026-10-07T08:00:00+03:00"
    },
    {
      "name": "Rusya Tarım Bakanlığı, Interfax",
      "data": "İhracat vergisi ve kararnameler",
      "freq": "Haftalık / olay",
      "cadence": "olay",
      "method": "Web (Rusça)",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 5,
      "latest": "2026-09-22",
      "lastChecked": "2026-10-07T08:00:00+03:00"
    },
    {
      "name": "IKAR, SovEcon, Rus Tahıl Birliği",
      "data": "FOB fiyatları, ihracat tahminleri",
      "freq": "Haftalık",
      "cadence": "haftalik",
      "method": "Haber kaynakları üzerinden",
      "cost": "Ham veri ücretli",
      "status": "used",
      "ref": 4,
      "latest": "2026-09-30",
      "lastChecked": "2026-10-07T08:00:00+03:00"
    },
    {
      "name": "TMO duyuruları",
      "data": "Alım ve satış fiyatları, ihracat izinleri",
      "freq": "Olay bazlı",
      "cadence": "olay",
      "method": "Web",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 11,
      "latest": "2026-10-01",
      "lastChecked": "2026-10-07T08:00:00+03:00"
    },
    {
      "name": "USDA WASDE ve FAS",
      "data": "Arz-talep, ihracat satışları",
      "freq": "Aylık / haftalık",
      "cadence": "aylik",
      "method": "Metin, XML",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 14,
      "latest": "2026-09-11",
      "lastChecked": "2026-10-07T08:00:00+03:00"
    },
    {
      "name": "TCMB gösterge kurları",
      "data": "USD/TRY, EUR/TRY (15:30 gösterge)",
      "freq": "İş günü",
      "cadence": "gunluk",
      "method": "XML (today.xml), anahtarsız",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 24,
      "latest": "2026-10-07",
      "lastChecked": "2026-10-07T16:59:00+03:00"
    },
    {
      "name": "Coinbase kur API",
      "data": "USD/TRY, EUR/TRY piyasa kuru",
      "freq": "Anlık",
      "cadence": "gunluk",
      "method": "REST API, anahtarsız",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 23,
      "latest": "2026-10-07T16:59:00+03:00",
      "lastChecked": "2026-10-07T16:59:00+03:00"
    },
    {
      "name": "CFTC Commitments of Traders",
      "data": "Fonların long/short pozisyonları",
      "freq": "Haftalık (Cuma)",
      "cadence": "haftalik",
      "method": "Socrata API, anahtarsız",
      "cost": "Ücretsiz, kamu verisi",
      "status": "used",
      "ref": 25,
      "latest": "2026-09-29",
      "lastChecked": "2026-10-07T16:59:00+03:00"
    },
    {
      "name": "Sektör haberleri",
      "data": "Liman olayları, lojistik",
      "freq": "Sürekli",
      "cadence": "olay",
      "method": "Haber",
      "cost": "Bazıları abonelikli",
      "status": "used",
      "ref": 10,
      "latest": null,
      "lastChecked": "2026-10-07T08:00:00+03:00"
    },
    {
      "name": "Resmî Gazete",
      "data": "Gümrük vergisi, Dahilde İşleme Rejimi",
      "freq": "Günlük",
      "method": "Web + anahtar kelime",
      "cost": "Ücretsiz",
      "status": "plan",
      "ref": null
    },
    {
      "name": "Open-Meteo",
      "data": "Yağış ve sıcaklık sapmaları",
      "freq": "Günlük",
      "method": "REST API",
      "cost": "Ticari olmayan kullanımda ücretsiz",
      "status": "plan",
      "ref": null
    },
    {
      "name": "Databento (CME Globex)",
      "data": "CBOT vadeli fiyatları",
      "freq": "Günlük / anlık",
      "method": "REST API",
      "cost": "Kullandıkça öde; 125 $ deneme kredisi",
      "status": "plan",
      "ref": 20
    },
    {
      "name": "Euronext",
      "data": "Paris değirmenlik buğday",
      "freq": "Günlük",
      "method": "Lisanslı veri",
      "cost": "Lisans gerekli",
      "status": "lic",
      "ref": null
    }
  ],
  "projects": [
    {
      "name": "OpenBB ODP (openbb-cftc + openbb-commodity)",
      "url": "https://github.com/OpenBB-finance/OpenBB",
      "category": "Pozisyon (COT) + temel veri (USDA PSD)",
      "what": "Python veri platformu. cftc eklentisi COT raporlarını (legacy/disaggregated), 0-100 COT endeksini ve pozisyon skorlarını; commodity eklentisi USDA FAS PSD tablolarını ve USDA hava bültenlerini getirir.",
      "use": "Managed money net pozisyonu ve 52 haftalık endeks uçlarda kalabalık işlemi gösterir: aşırı net short = short-covering (yukarı) riski, aşırı net long = likidasyon riski. PSD stok/kullanım revizyonları temel yönü teyit eder.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-02",
      "maintained": true,
      "caveat": "CFTC/USDA verisi ABD kamu malı; platformdaki bazı sağlayıcılar (ör. yfinance) kısıtlı. V5 yeni çıktı, sürüm sabitleyin. Managed money için report_type='disaggregated' kullanın.",
      "effort": "orta",
      "recommendation": "hemen",
      "checked": "2026-10-07"
    },
    {
      "name": "CFTC Public Reporting API + sodapy",
      "url": "https://github.com/afeld/sodapy",
      "category": "Pozisyon (COT)",
      "what": "Socrata açık veri API'si için hafif Python istemcisi; CFTC'nin anahtarsız COT veri setlerini (72hh-3qpy Disaggregated, 6dca-aqww Legacy) filtreli sorgular.",
      "use": "Her cuma SRW, HRW, mısır ve soya için fonların net pozisyonunu ve haftalık değişimini çeker. Bu bültendeki 'Fon pozisyonları' paneli aynı API'yi kütüphanesiz kullanıyor.",
      "license": "MIT",
      "commercial": "serbest",
      "lastActivity": "2026-07-06",
      "maintained": true,
      "caveat": "COT verisi ABD federal kamu malı. PyPI sürümü eski (2.2.0); düz HTTPS isteği de çalışıyor.",
      "effort": "dusuk",
      "recommendation": "hemen",
      "checked": "2026-10-07"
    },
    {
      "name": "TradingView Lightweight Charts",
      "url": "https://github.com/tradingview/lightweight-charts",
      "category": "Grafik (statik HTML)",
      "what": "Canvas tabanlı finansal grafik kütüphanesi; çizgi, mum, histogram ve çoklu fiyat ekseni. Tek dosyalık sürümü statik sayfada çalışır.",
      "use": "Fiyat ile fon net pozisyonunu, kalendar spread'i ve FOB farklarını aynı zaman ekseninde göstermek; uyumsuzlukları (fiyat düşerken short'ların azalması gibi) görsel yakalamak.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-09-30",
      "maintained": true,
      "caveat": "Lisans, sayfada TradingView atıf notu ve tradingview.com bağlantısı ister (attributionLogo seçeneği yeterli).",
      "effort": "dusuk",
      "recommendation": "hemen",
      "checked": "2026-10-07"
    },
    {
      "name": "evds (TCMB EVDS istemcisi)",
      "url": "https://github.com/fatihmete/evds",
      "category": "Kur ve makro veri",
      "what": "TCMB EVDS serilerini (gösterge kurlar, faiz, enflasyon) pandas tablosu olarak çeker; 0.4 sürümü yeni EVDS3 ile uyumlu.",
      "use": "TMO TL fiyatlarını ve ithalat paritesini resmi TCMB kuruyla dolara çevirmek; kur şokunda iç fiyat ile ithal buğday farkının açılması ithalat zamanlamasını değiştirir.",
      "license": "MIT",
      "commercial": "serbest",
      "lastActivity": "2026-02-18",
      "maintained": true,
      "caveat": "Ücretsiz EVDS API anahtarı gerekir. Resmi olmayan topluluk paketi.",
      "effort": "dusuk",
      "recommendation": "hemen",
      "checked": "2026-10-07"
    },
    {
      "name": "Meteostat (Python)",
      "url": "https://github.com/meteostat/meteostat",
      "category": "Hava gözlemi (istasyon)",
      "what": "Dünya genelindeki istasyonların saatlik ve günlük gözlemlerini ve iklim normallerini nokta ya da istasyon bazında getirir.",
      "use": "Konya, Rostov-na-Donu, Krasnodar gibi istasyonlarda gerçekleşen yağış ve sıcaklığı normalle kıyaslamak; risk radarına hızlı hava göstergesi.",
      "license": "MIT",
      "commercial": "serbest",
      "lastActivity": "2026-09-25",
      "maintained": true,
      "caveat": "Veri CC BY 4.0: ticari kullanım serbest, atıf şart. Rusya'da istasyon kapsamı değişken; bölge ortalaması için ERA5 daha sağlam.",
      "effort": "dusuk",
      "recommendation": "hemen",
      "checked": "2026-10-07"
    },
    {
      "name": "Herbie",
      "url": "https://github.com/blaylockbk/Herbie",
      "category": "Hava tahmini",
      "what": "NOAA (GFS, GEFS, CFS) ve ECMWF açık veri (IFS, AIFS) sayısal tahmin dosyalarını indirir; yalnız gereken değişkenleri (yağış, sıcaklık) çekebilir.",
      "use": "Güney Rusya ve Orta Anadolu için 10-15 günlük yağış ve sıcaklık sapması: kuraklık ya da don riski artıyorsa buğdayda long, belirgin iyileşme short lehine. Tahmin değişimi çoğu zaman fiyattan önce gelir.",
      "license": "MIT",
      "commercial": "serbest",
      "lastActivity": "2026-09-27",
      "maintained": true,
      "caveat": "NOAA verisi kamu malı; ECMWF açık verisi CC BY 4.0 (atıf şart). GRIB2 için eccodes/cfgrib gerekir.",
      "effort": "orta",
      "recommendation": "degerlendir",
      "checked": "2026-10-07"
    },
    {
      "name": "earthkit-data + cdsapi (ERA5)",
      "url": "https://github.com/ecmwf/earthkit-data",
      "category": "Hava ve iklim geçmişi",
      "what": "ECMWF'nin veri arayüzü; Copernicus CDS (ERA5), ECMWF açık verisi ve GRIB/NetCDF dosyalarını tek API ile getirir.",
      "use": "Bölgesel 30 yıllık normali ve güncel sezon sapmasını üretip tahminleri bağlama oturtmak; ekim yağışı normalin çok altındaysa Rus kışlık buğday riski long tezini destekler.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-09-30",
      "maintained": true,
      "caveat": "ERA5 CC BY 4.0 (atıf şart); CDS hesabı gerekir, veri birkaç gün gecikmeli.",
      "effort": "orta",
      "recommendation": "degerlendir",
      "checked": "2026-10-07"
    },
    {
      "name": "xclim",
      "url": "https://github.com/Ouranosinc/xclim",
      "category": "Ürün-iklim göstergeleri",
      "what": "İklim göstergeleri hesaplar: büyüme derece-günü, ardışık kurak gün, sıcak ve don günü sayısı, SPI/SPEI kuraklık endeksleri.",
      "use": "Ham hava verisini buğday ve mısır stres skoruna çevirir; skorun sezon normaline göre kötüleşmesi long, iyileşmesi short lehine okunur.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-02",
      "maintained": true,
      "caveat": null,
      "effort": "orta",
      "recommendation": "degerlendir",
      "checked": "2026-10-07"
    },
    {
      "name": "StatsForecast (Nixtla)",
      "url": "https://github.com/Nixtla/statsforecast",
      "category": "Tahmin ve mevsimsellik",
      "what": "AutoARIMA, AutoETS, MSTL, Theta gibi istatistiksel modelleri çok sayıda seride hızlı çalıştırır; tahmin aralığı ve çapraz doğrulama içerir.",
      "use": "Fiyat, spread, FOB farkı ve USD/TRY için mevsimsel normal bant üretmek; bant dışına taşma ortalamaya dönüş ya da trend kırılımı adayı.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-01",
      "maintained": true,
      "caveat": null,
      "effort": "dusuk",
      "recommendation": "degerlendir",
      "checked": "2026-10-07"
    },
    {
      "name": "bt",
      "url": "https://github.com/pmorissette/bt",
      "category": "Backtest",
      "what": "Ağırlık tabanlı backtest kütüphanesi; +1/−1 hedef ağırlıkla long/short, periyodik yeniden dengeleme ve strateji karşılaştırması.",
      "use": "COT uçları, mevsimsellik ve hava skoru kurallarının long/short getirisini geçmişte sınamak; masanın sezgisel sinyallerini sayıya dökmek.",
      "license": "MIT",
      "commercial": "serbest",
      "lastActivity": "2026-10-02",
      "maintained": true,
      "caveat": "Vadeli marj ve roll modeli yok. Varsayılan veri Yahoo (kişisel kullanım şartı); üretimde lisanslı veri verin.",
      "effort": "orta",
      "recommendation": "degerlendir",
      "checked": "2026-10-07"
    },
    {
      "name": "Chronos-2 (chronos-forecasting)",
      "url": "https://github.com/amazon-science/chronos-forecasting",
      "category": "Tahmin (foundation model)",
      "what": "Amazon'un önceden eğitilmiş zaman serisi modelleri; eğitim gerektirmeden olasılıksal (kantil) tahmin yapar, ek değişken kabul eder.",
      "use": "Buğday ve mısır için 1-4 haftalık P10-P90 bantları; ek değişken olarak USD/TRY, fon net pozisyonu ve hava skoru. Bant asimetrisi pozisyon boyutu ve stop seviyesine girdi olur.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-09-17",
      "maintained": true,
      "caveat": "Kod ve chronos-2 ağırlıkları Apache-2.0. Fiyat yönünde isabet sınırlı olabilir; geriye dönük test edilmeden karar girdisi yapmayın.",
      "effort": "orta",
      "recommendation": "degerlendir",
      "checked": "2026-10-07"
    },
    {
      "name": "pysystemtrade",
      "url": "https://github.com/pst-group/pysystemtrade",
      "category": "Vadeli veri (roll, carry) + sistematik çerçeve",
      "what": "Rob Carver'ın sistematik vadeli işlem çerçevesi: roll takvimleri, carry kontratlı fiyatlar, geri ayarlı sürekli seri, carry ve trend kuralları.",
      "use": "Vade yapısını (backwardation/contango) ve carry'yi tahıllarda sinyale çevirmek; trend ve carry birleşik long/short skoru.",
      "license": "GPL-3.0",
      "commercial": "copyleft",
      "lastActivity": "2026-09-30",
      "maintained": true,
      "caveat": "GPL-3.0: şirket içi kullanım serbest; değiştirilmiş kodu üçüncü kişilere dağıtırsanız kaynak açma yükümlülüğü doğar.",
      "effort": "yuksek",
      "recommendation": "degerlendir",
      "checked": "2026-10-07"
    },
    {
      "name": "openEO Python client (Copernicus)",
      "url": "https://github.com/Open-EO/openeo-python-client",
      "category": "Uydu ve NDVI ile ürün izleme",
      "what": "Copernicus Data Space Ecosystem üzerinde Sentinel-2 verisiyle bulutta işlem yapar; NDVI zaman serisi ve bölge ortalaması üretir.",
      "use": "Güney Rusya ve Orta Anadolu buğday alanlarında NDVI'yı geçmiş yıllarla kıyaslayıp verim beklentisini resmi tahminlerden önce güncellemek.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-02",
      "maintained": true,
      "caveat": "Sentinel verisi açık; ayda 10.000 ücretsiz kredi, yoğun ticari kullanımda ücretli kota gerekebilir. Ekin maskesi ayrıca gerekir.",
      "effort": "yuksek",
      "recommendation": "izle",
      "checked": "2026-10-07"
    },
    {
      "name": "deberta-v3-large-zeroshot-v2.0-c",
      "url": "https://huggingface.co/MoritzLaurer/deberta-v3-large-zeroshot-v2.0-c",
      "category": "Haber sınıflandırma (NLP)",
      "what": "Eğitim gerektirmeyen metin sınıflandırma modeli; -c sürümü yalnızca ticari kullanıma uygun verilerle eğitildi.",
      "use": "Haber başlıklarını ihracat kısıtı, liman saldırısı, vergi ve kota değişikliği, hasat hasarı gibi etiketlerle sınıflayıp risk radarına arz yönlü olay akışı vermek.",
      "license": "MIT",
      "commercial": "serbest",
      "lastActivity": "2024-04-04",
      "maintained": false,
      "caveat": "Statik ağırlık, güncellenmiyor; İngilizce odaklı. Rutin zaten Claude kullandığı için ek fayda sınırlı.",
      "effort": "orta",
      "recommendation": "izle",
      "checked": "2026-10-07"
    },
    {
      "name": "TimesFM (Google Research)",
      "url": "https://github.com/google-research/timesfm",
      "category": "Tahmin (foundation model)",
      "what": "Google'ın zaman serisi temel modeli; eğitimsiz nokta ve kantil tahmini yapar.",
      "use": "Chronos-2'ye ikinci görüş: iki model bandı aynı yöne kaydırıyorsa sinyal güveni artar.",
      "license": "Apache-2.0 (kod, ≤2.5 ağırlıkları); 3.0 ağırlıkları ticari olmayan",
      "commercial": "kisitli",
      "lastActivity": "2026-09-29",
      "maintained": true,
      "caveat": "Varsayılan TimesFM 3.0 ağırlıkları yalnız ticari olmayan kullanım içindir. Şirkette yalnız timesfm-2.5-200m (Apache-2.0) kullanılabilir.",
      "effort": "orta",
      "recommendation": "izle",
      "checked": "2026-10-07"
    },
    {
      "name": "QuantConnect LEAN",
      "url": "https://github.com/QuantConnect/Lean",
      "category": "Backtest (olay tabanlı)",
      "what": "C#/Python olay tabanlı işlem motoru; sürekli vadeli kontratlarda roll eşleme ve geri ayarlama modları var.",
      "use": "Roll, marj ve komisyonla gerçekçi vadeli long/short simülasyonu; bt'de bulunan sinyal kalıcıysa üretime yakın doğrulama.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-01",
      "maintained": true,
      "caveat": "Motor serbest; QuantConnect bulut verisi ayrı ve ücretli. Docker/.NET kurulumu ağır.",
      "effort": "yuksek",
      "recommendation": "izle",
      "checked": "2026-10-07"
    }
  ],
  "refs": [
    {
      "id": 1,
      "title": "USDA AMS Grain Market News, günlük tahıl raporları (Ocak–Eylül 2026; örnek: 8 Eylül)",
      "url": "https://www.oklahomafarmreport.com/wp-content/uploads/sites/2/2026/09/ams_3100-2026-09-08T172426.452.pdf",
      "published": "2026-09-08"
    },
    {
      "id": 2,
      "title": "Reuters, CBOT Trends (Capital.com üzerinden)",
      "url": "https://capital.com/en-au/news/cbot-trends-wheat-up-3-6-cents-corn-up-1-3-cents-soy",
      "published": "2026-09-30"
    },
    {
      "id": 3,
      "title": "top agrar, Börsennews Agrar",
      "url": "https://www.topagrar.com/markt/news/gewinnmitnahmen-belasten-borsenkurse-fur-raps-und-weizen-20028455.html",
      "published": "2026-08-24"
    },
    {
      "id": 4,
      "title": "UkrAgroConsult: Rusya Eylül buğday ihracatı (Rus Tahıl Birliği)",
      "url": "https://ukragroconsult.com/en/news/russia-may-export-only-around-1-mln-tons-of-wheat-in-september/",
      "published": null
    },
    {
      "id": 5,
      "title": "Interfax: tahıl ihracat vergileri yıl sonuna kadar sıfır",
      "url": "https://interfax.com/newsroom/top-stories/119226/",
      "published": "2026-09-22"
    },
    {
      "id": 6,
      "title": "Xinhua / The Star: ayçiçek yağı ve küspe vergisi sınırı",
      "url": "https://www.thestar.com.my/news/world/2026/09/22/russia-zeroes-out-grain-export-tariffs-through-late-2026",
      "published": "2026-09-22"
    },
    {
      "id": 7,
      "title": "Biofuels Digest: buğday vergisi 787,5 RUB/t",
      "url": "https://biofuelsdigest.com/?p=1006793",
      "published": "2026-09-05"
    },
    {
      "id": 8,
      "title": "Baird Maritime: Novorossiysk terminalleri durdu",
      "url": "https://www.bairdmaritime.com/shipping/dry-cargo/bulkers/port-shutdowns-push-russia-into-deeper-grain-export-slowdown",
      "published": null
    },
    {
      "id": 9,
      "title": "ROIC: Karadeniz limanları ve ateşkes senaryosu",
      "url": "https://www.roic.ai/news/russia-can-quickly-restart-80-of-black-sea-grain-ports-if-ceasefire-holds-but-damaged-terminals-pose-months-long-bottleneck-09-25-2026",
      "published": "2026-09-25"
    },
    {
      "id": 10,
      "title": "Fastmarkets: Novorossiysk'te üçüncü terminal durdu",
      "url": "https://www.fastmarkets.com/insights/third-major-terminal-suspended-at-novorossiysk/",
      "published": null
    },
    {
      "id": 11,
      "title": "Milliyet Uzmanpara: TMO 2026 hububat alım ve satış fiyatları",
      "url": "https://uzmanpara.milliyet.com.tr/uzmanpara/galeri/tmo-bugday-ve-arpa-fiyat-listesi-2026-bugday-ve-arpa-alim-fiyatlari-ne-kadar-toprak-mahsulleri-ofisi-hububat-alim-ve-satim-7598191",
      "published": null
    },
    {
      "id": 12,
      "title": "NTV / AA: ekmeklik buğday ihracatı serbest",
      "url": "https://www.ntv.com.tr/gundem/ekmeklik-bugday-ihracati-serbest-birakildi-1734997",
      "published": "2026-07-29"
    },
    {
      "id": 13,
      "title": "Milliyet: rekor buğday rekoltesi",
      "url": "https://www.milliyet.com.tr/haber/7637313/",
      "published": "2026-08-08"
    },
    {
      "id": 14,
      "title": "DTN: Eylül WASDE özeti",
      "url": "https://www.dtnpf.com/agriculture/web/ag/news/article/2026/09/11/usda-releases-september-crop-wasde",
      "published": "2026-09-11"
    },
    { "id": 15, "title": "USDA WASDE 2026 yayın takvimi", "url": "https://usda.gov/wasde", "published": null },
    {
      "id": 17,
      "title": "The Scottish Farmer: Rusya güz ekimi kuraklık altında",
      "url": "https://www.thescottishfarmer.co.uk/news/25456977.russias-autumn-sowing-campaign-hit-drought-rising-input-costs",
      "published": null
    },
    {
      "id": 18,
      "title": "Karar: 2026 su yılı yağışları son 66 yılın en yükseği",
      "url": "https://www.karar.com/guncel-haberler/yagislar-rekor-kirdi-tarimda-verim-beklentisi-artti-2062613",
      "published": null
    },
    {
      "id": 19,
      "title": "CropGPT: Rusya'dan Türkiye'ye tahıl ihracatı Ocak–Mayıs 2026",
      "url": "https://cropgpt.ai/russian-wheat-export-prices-dip-to-231-233-on-faster-harvest",
      "published": null
    },
    {
      "id": 20,
      "title": "Databento fiyatlandırma (CBOT vadeli verisi)",
      "url": "https://databento.com/pricing",
      "published": null
    },
    {
      "id": 21,
      "title": "UkrAgroConsult: Rusagrotrans Eylül tahmini 1,75 Mt",
      "url": "https://ukragroconsult.com/en/news/port-attacks-could-push-russian-wheat-exports-below-2-mln-tons-per-month/",
      "published": null
    },
    {
      "id": 22,
      "title": "CME Group: 2026 USDA rapor takvimi",
      "url": "https://www.cmegroup.com/news/2026/understanding-major-usda-reports-in-2026.html",
      "published": null
    },
    {
      "id": 23,
      "title": "Coinbase döviz kurları API (piyasa kuru)",
      "url": "https://api.coinbase.com/v2/exchange-rates?currency=USD",
      "published": "2026-10-07"
    },
    {
      "id": 24,
      "title": "TCMB gösterge niteliğindeki döviz kurları",
      "url": "https://www.tcmb.gov.tr/kurlar/today.xml",
      "published": "2026-10-07"
    },
    {
      "id": 25,
      "title": "CFTC: Commitments of Traders, disaggregated futures-only",
      "url": "https://publicreporting.cftc.gov/Commitments-of-Traders/Disaggregated-Futures-Only/72hh-3qpy",
      "published": "2026-10-02"
    },
    {
      "id": 26,
      "title": "USDA AMS: Oklahoma Daily Grain Bids, vadeli uzlaşma fiyatları (Final)",
      "url": "https://www.ams.usda.gov/mnreports/ams_3100.pdf",
      "published": "2026-10-06"
    }
  ]
};
