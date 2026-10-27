/* Türkiye Hububat Masası · bülten verisi.
   Bu dosyayı her sabah Claude rutini günceller (.claude/skills/sabah-guncellemesi/SKILL.md).
   Biçim: window.HUBUBAT ataması ve ardından saf JSON. Alanlar: README → Veri sözleşmesi.
   Değiştirdikten sonra: node scripts/veri.mjs bicimle && node scripts/kontrol.mjs */
window.HUBUBAT = {
  "schema": 1,
  "meta": {
    "bulletinDate": "2026-10-16",
    "generatedAt": "2026-10-16T08:16:00+03:00",
    "generatedBy": "Claude rutini",
    "projectsCheckedAt": "2026-10-12"
  },
  "kpis": [
    {
      "id": "cbot_wheat",
      "label": "CBOT buğday · Ara-26",
      "contract": "Dec 26",
      "value": 616,
      "decimals": 2,
      "unit": "¢/bu",
      "base": { "value": 625, "label": "23 Eki uzlaşmasına göre" },
      "perTonne": 36.7437,
      "asOf": "2026-10-26",
      "asOfNote": "uzlaşma",
      "cadence": "gunluk",
      "checked": "2026-10-27T21:16:00+03:00",
      "src": [28]
    },
    {
      "id": "kc_wheat",
      "label": "KC buğday (HRW) · Ara-26",
      "contract": "Dec 26",
      "value": 659,
      "decimals": 2,
      "unit": "¢/bu",
      "perTonne": 36.7437,
      "asOf": "2026-10-26",
      "asOfNote": "uzlaşma",
      "cadence": "gunluk",
      "checked": "2026-10-27T21:16:00+03:00",
      "src": [28],
      "base": { "value": 664.5, "label": "23 Eki uzlaşmasına göre" }
    },
    {
      "id": "cbot_corn",
      "label": "CBOT mısır · Ara-26",
      "contract": "Dec 26",
      "value": 455,
      "decimals": 2,
      "unit": "¢/bu",
      "base": { "value": 456, "label": "23 Eki uzlaşmasına göre" },
      "perTonne": 39.368,
      "asOf": "2026-10-26",
      "asOfNote": "uzlaşma",
      "cadence": "gunluk",
      "checked": "2026-10-27T21:16:00+03:00",
      "src": [28]
    },
    {
      "id": "cbot_soy",
      "label": "CBOT soya · Kas-26",
      "contract": "Nov 26",
      "value": 1241.25,
      "decimals": 2,
      "unit": "¢/bu",
      "base": { "value": 1256.5, "label": "23 Eki uzlaşmasına göre" },
      "perTonne": 36.7437,
      "asOf": "2026-10-26",
      "asOfNote": "uzlaşma",
      "cadence": "gunluk",
      "checked": "2026-10-27T21:16:00+03:00",
      "src": [28]
    },
    {
      "id": "usdtry",
      "label": "USD/TRY",
      "value": 49.7873,
      "decimals": 2,
      "unit": "",
      "secondary": { "label": "EUR/TRY", "value": 55.4409, "decimals": 2 },
      "asOf": "2026-10-27T21:16:00+03:00",
      "cadence": "gunluk",
      "checked": "2026-10-27T21:16:00+03:00",
      "src": [23, 24],
      "sub": "TCMB gösterge 27 Eki 15:30: 49,74",
      "asOfNote": "piyasa"
    },
    {
      "id": "ru_fob",
      "label": "Rus buğdayı FOB · %12,5 · Baltık",
      "value": 268,
      "decimals": 0,
      "unit": "$/t",
      "base": { "value": 266, "label": "önceki haftaya göre" },
      "sub": "Vysotsk, Ust-Luga · Kasım sonu–Aralık başı teslim · Karadeniz limanlarından sevkiyat neredeyse durmuş",
      "asOf": "2026-10-09",
      "asOfNote": "IKAR, haftalık",
      "cadence": "haftalik",
      "checked": "2026-10-16T08:16:00+03:00",
      "src": [49]
    },
    {
      "id": "eu_wheat",
      "label": "AB buğdayı · Rouen fiziki",
      "value": 249.79,
      "decimals": 2,
      "unit": "€/t",
      "eur": true,
      "spread": { "kpi": "ru_fob", "label": "Rus Baltık FOB ile fark" },
      "asOf": "2026-10-18",
      "asOfNote": "12.10–18.10 haftası",
      "cadence": "haftalik",
      "maxAge": 14,
      "checked": "2026-10-27T21:16:00+03:00",
      "src": [30],
      "base": { "value": 249.79, "label": "11 Eki 05.10–11.10 haftası fiyatına göre" }
    },
    {
      "id": "konya_wheat",
      "label": "Konya TB · 1. grup kırmızı sert",
      "value": 19200,
      "decimals": 0,
      "unit": "TL/t",
      "fx": "usdtry",
      "asOf": "2026-10-26",
      "asOfNote": "borsa ortalaması",
      "cadence": "gunluk",
      "checked": "2026-10-27T21:16:00+03:00",
      "src": [29],
      "sub": "1. grup beyaz sert 21.505 · 2. grup kırmızı sert 21.301",
      "base": { "value": 20502, "label": "23 Eki borsa ortalaması fiyatına göre" }
    },
    {
      "id": "tmo_sell",
      "label": "TMO satış · ekmeklik buğday",
      "value": 18500,
      "decimals": 0,
      "unit": "TL/t",
      "fx": "usdtry",
      "asOf": "2026-10-05",
      "asOfNote": "satış başlangıcı",
      "cadence": "olay",
      "checked": "2026-10-16T08:16:00+03:00",
      "src": [34],
      "sub": "5,5 Mt · 5–31 Eki teslim · düşük vasıflı 16.750 · KDV ve manipülasyon hariç"
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
      "checked": "2026-10-16T08:16:00+03:00",
      "src": [5, 37]
    }
  ],
  "brief": [
    {
      "headline": "USDA Rus buğday ihracat tahminini 40 Mt'a indirdi; bol ABD arzıyla CBOT geriledi",
      "body": "Ekim WASDE'de (9 Ekim) USDA 2026/27 Rusya buğday ihracatı tahminini 43 Mt'tan 40 Mt'a düşürdü; üretim 88 Mt'ta kaldı, Rus bitiş stoku 16,1 Mt'tan 19,1 Mt'a çıktı. ABD buğday stoku 717'den 740 milyon buşele, mısır stoku verim artışıyla 1.567'den 1.849 milyon buşele yükseldi. CBOT Aralık buğdayı 671 ¢'e (8 Ekim 683,25), mısır 479,75 ¢'e (500,25) indi.",
      "src": [44, 28, 45],
      "impact": "Türkiye'nin ana tedarikçisi Rusya için USDA tahmini artık 40 Mt; IKAR sezon potansiyelini 42 Mt görüyor. Dünya buğday stoku 276,0 Mt ile Eylül tahminine yakın kaldı. CBOT Aralık buğdayı 15 Ekim'de 670 ¢'ten uzlaştı (14 Ekim 673,25). Konya Ticaret Borsası'nda 1. grup kırmızı sert buğday 15 Ekim'de 20.124 TL/t (14 Ekim 20.489); TMO satışı 18.500 TL/t'dan 31 Ekim'e kadar sürüyor.",
      "impactSrc": [44, 29, 34, 48, 49],
      "detail": [
        "WASDE'ye göre ABD buğday üretimi 1.531'den 1.534 milyon buşele, verim 47,8'den 48,1 buşel/akreye çıktı; ihracat tahmini 775'ten 750 milyon buşele indi. Ortalama çiftlik fiyatı 6,40'tan 6,30 $/buşele düşürüldü. AB buğday üretimi 133,8'den 133,0 Mt'a indirildi.",
        "Mısırda verim 178,5'ten 181,2 buşel/akreye, üretim 15,80'den 16,03 milyar buşele çıktı. DTN'e göre verim piyasa beklentisinin (177,7) üstünde geldi; Aralık mısırı kısa süre limit düşüşe indi ve 20,5 ¢ kayıpla kapandı. KC Aralık buğdayı 17 ¢ düşüşle 719,25 ¢; Kasım soyası rekor verim tahminine rağmen günü artıda bitirdi.",
        "Konya'da 15 Ekim'de 2. grup kırmızı sert 18.995 TL/t. AB Komisyonu verisine göre Rouen değirmenlik buğdayı 5–11 Ekim haftasında 249,79 €/t (önceki hafta 236,86)."
      ],
      "detailSrc": [44, 45, 28, 29, 30]
    },
    {
      "headline": "IKAR Ekim ihracat tahminini 3 Mt'a yükseltti, sezon potansiyelini 42 Mt'a indirdi",
      "body": "IKAR, Baltık'taki yükleme kapasitesinin artmasıyla Ekim buğday ihracatı tahminini 2,5 Mt'tan 3,0 Mt'a çıkardı; hava ve lojistik elverişli kalırsa. Sezon ihracat potansiyelini ise hasat tahminlerindeki düşüşle 1,5 Mt indirerek 42 Mt'a çekti (tahıl 52,8 Mt). SovEcon Ekim için 2,5 Mt bekliyor (geçen yıl 5,1 Mt). IKAR'a göre Baltık FOB 2 $ artışla 268 $/t.",
      "src": [49],
      "impact": "Türkiye'nin ana tedarikçisi Rusya için sezon ihracat tahmini USDA'da 40 Mt, IKAR'da 42 Mt. SovEcon'a göre Karadeniz limanlarından yükleme yapılmıyor; Rus kargosu Baltık üzerinden geliyor ve teslim süresi uzuyor.",
      "impactSrc": [44, 49],
      "detail": [
        "IKAR'ın stres senaryosunda sezon buğday ihracatı yaklaşık 35 Mt. Rus iç piyasasında SovEcon'a göre 3. sınıf buğday 75 ruble artışla 8.200 RUB/t, 4. sınıf 7.925 RUB/t (Avrupa kesimi, çiftlikten teslim).",
        "IKAR Başkanı Rylko'ya göre Eylül'de Baltık'tan yaklaşık 1,4 Mt buğday yüklendi (rekor); bunun 1 Mt'tan fazlası Rus terminallerinden, yaklaşık 400 bin tonu diğer Baltık ülkelerinin limanlarından. Rusagrotrans'a göre Temmuz–Eylül'de ihracat yaklaşık 7 Mt (geçen yıl 11,3 Mt).",
        "USDA Ekim WASDE'de Rus bitiş stoku tahminini 16,1 Mt'tan 19,1 Mt'a çıkardı; üretim 88 Mt'ta kaldı."
      ],
      "detailSrc": [49, 39, 40, 44]
    },
    {
      "headline": "Trump enerji ateşkesi ilan etti; Karadeniz'de ticari gemiler için güvence yok",
      "body": "Trump 11 Ekim'de Rusya ile Ukrayna'nın acil bir \"enerji ateşkesi\" üzerinde anlaştığını açıkladı. Zelenskiy, açıklamaya rağmen Rusya'nın enerji tesislerini vurduğunu söyledi; Kremlin 13 Ekim'de temasların sürdüğünü bildirdi. Rusya Savunma Bakanlığı 13 Ekim'de Mikolayiv'e askeri ve çift kullanımlı yük taşıyan iki kuru yük gemisini Bug haliçinde vurduğunu açıkladı; Reuters bunu bağımsız doğrulayamadı.",
      "src": [50, 51, 53],
      "impact": "Bloomberg'e göre enerji ateşkesi tahıl altyapısının ve ticari gemilerin güvenliğini garanti etmiyor. Hindistan 15 Ekim'de ticari gemilere saldırıların durmasını ve serbest seyrin yeniden sağlanmasını istedi. 5–6 Ekim'de Romanya ve Bulgaristan açıklarında üç ticari gemi vuruldu; Romanya, Bulgaristan ve Türkiye güvenlik koordinasyonu yapıyor. Açık sözleşmelerde teslim ve sigorta maddeleri gözden geçirilmeli.",
      "impactSrc": [52, 54, 31, 32, 46],
      "detail": [
        "Zelenskiy, Ukrayna'nın enerji tesislerine yönelik saldırılar durursa Rus rafinerilerine saldırıları durdurmaya hazır olduğunu söyledi. Kremlin, Zelenskiy'nin seçimler için önerdiği 60 günlük ateşkesi reddetti.",
        "Royad Mammadov, Saint Kitts ve Nevis bayraklı bir kuru yük gemisi; Zelenskiy'e göre Türk sahipli. Ukrayna'nın İzmail limanından mısırla İtalya'nın Ravenna limanına gidiyordu; 5 Ekim'de Romanya karasuları dışında, bir OMV Petrom platformu yakınında vuruldu ve battı. İki kişi öldü, 11 mürettebat kurtarıldı. Rusya Savunma Bakanlığı iki kargo gemisini vurduğunu açıkladı.",
        "6 Ekim'de Togo bayraklı Alfa Watan ile Palau bayraklı Able, Bulgaristan'ın Byala kıyısının yaklaşık 70 mil açığında hava ve deniz dronlarıyla vuruldu. Alfa Watan battı; Bulgaristan mürettebat aramasını 7 Ekim'de sonuçsuz durdurdu. Buğday taşıyan Able yandı; 18 mürettebatın tamamı tahliye edildi, ikisi ağır yaralı.",
        "Bulgaristan Başbakanı Radev saldırıyı uluslararası hukukun ağır ihlali olarak nitelendirdi. Zelenskiy, Bulgar donanmasıyla yapılan ortak incelemenin Rusya'yı işaret ettiğini söyledi; Rusya yorum yapmadı. Bulgaristan beş ek karadan havaya füze sistemi alacağını açıkladı."
      ],
      "detailSrc": [50, 31, 32, 33, 38]
    }
  ],
  "risks": [
    {
      "category": "Lojistik",
      "title": "Batı Karadeniz'de gemi saldırıları",
      "body": "5–6 Ekim'de Romanya ve Bulgaristan açıklarında üç ticari gemi vuruldu, ikisi battı; Zelenskiy'e göre biri Türk sahipli. Denizcilik kaynaklarına göre Bulgaristan sularındaki ilk saldırı.",
      "level": "high",
      "src": [31, 32]
    },
    {
      "category": "Lojistik",
      "title": "Novorossiysk ve Rus ihracat kapasitesi",
      "body": "Rus ihracatçıları Karadeniz ve Azak sevkiyatlarının 2027'den önce normale dönmesini beklemiyor. USDA Rus buğday ihracat tahminini 40 Mt'a indirdi; IKAR'a göre Baltık yüklemeleri Eylül'de rekor 1,4 Mt oldu.",
      "level": "high",
      "src": [36, 44, 39]
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
      "title": "Bol ABD arzı",
      "body": "Ekim WASDE ABD buğday ve mısır stoklarını artırdı; CBOT Aralık buğdayı 671 ¢'e, mısır 479,75 ¢'e geriledi.",
      "level": "mid",
      "src": [44, 45]
    },
    {
      "category": "Politika",
      "title": "Rus ihracat vergisinin 2027'de dönmesi",
      "body": "Vergi 31 Aralık'a kadar sıfır; bütçe taslağı 2027 için 60,3 milyar ruble tahıl vergisi geliri öngörüyor (önceki plan 152,4 milyar).",
      "level": "mid",
      "src": [37]
    },
    {
      "category": "Arz",
      "title": "Türkiye iç piyasası",
      "body": "TMO Ekim'de 5,5 Mt buğdayı sabit fiyatla satıyor; 2026 su yılı yağışı son 66 yılın en yükseği oldu.",
      "level": "pos",
      "src": [34, 18]
    }
  ],
  "supplyDemand": {
    "source": "USDA WASDE",
    "asOf": "2026-10-09",
    "rows": [
      { "label": "Dünya buğday bitiş stoku 2026/27", "value": "276,0 Mt", "change": "▼ Eyl 276,3", "src": [44] },
      { "label": "Dünya buğday bitiş stoku 2025/26", "value": "281,6 Mt", "change": "▲ Eyl 280,6", "src": [44] },
      { "label": "Rusya buğday ihracatı 2026/27 (USDA)", "value": "40,0 Mt", "change": "▼ Eyl 43,0", "src": [44] },
      { "label": "ABD buğday bitiş stoku 2026/27", "value": "740 mn bu", "change": "▲ Eyl 717", "src": [44] },
      { "label": "ABD mısır üretimi 2026/27", "value": "16,03 mlr bu", "change": "▲ Eyl 15,80", "src": [44] },
      { "label": "Rusya buğday ihracatı 2026/27 (SovEcon)", "value": "36,7 Mt", "change": "▼ 4,7 Mt", "src": [36] },
      { "label": "Rusya buğday üretimi 2026 (SovEcon)", "value": "87,5 Mt", "change": "▼ önceki 88,2", "src": [42] },
      { "label": "Türkiye buğday üretimi 2026", "value": "23 Mt üstü", "change": "rekor", "src": [13] }
    ]
  },
  "exports": {
    "note": "Milyon ton · aylık buğday",
    "unit": "Mt",
    "max": 6,
    "footnote": "Rus Tahıl Birliği liman verisi. Çizgili çubuk tahmindir; bıyık, analistlerin daha yüksek tahminini gösterir (Eylül: Rusagrotrans ≈2,7 Mt; Ekim: IKAR 3,0 Mt).",
    "src": [35, 4, 40, 49],
    "rows": [
      { "label": "Eylül 2025", "value": 5.4, "display": "5,4", "note": "Geçen yılın aynı ayı (Rus Tahıl Birliği)" },
      { "label": "Ağustos 2026", "value": 1.3, "display": "1,3", "note": "Rus Tahıl Birliği" },
      {
        "label": "Eylül 2026",
        "value": 1.36,
        "hi": 2.7,
        "display": "1,36",
        "note": "Rus Tahıl Birliği · IKAR ≈2,5 · Rusagrotrans ≈2,7"
      },
      {
        "label": "Ekim 2026",
        "tag": "tahmin",
        "value": 2.5,
        "hi": 3,
        "estimate": true,
        "display": "2,5–3",
        "note": "SovEcon 2,5 · IKAR 3,0"
      }
    ]
  },
  "ladder": [
    { "label": "Rus buğdayı FOB Baltık", "kpi": "ru_fob", "note": "%12,5 protein" },
    { "label": "AB buğdayı, Rouen fiziki", "kpi": "eu_wheat", "note": "limana teslim" },
    { "label": "CBOT buğday, Ara-26", "kpi": "cbot_wheat" },
    { "label": "KC buğday (HRW), Ara-26", "kpi": "kc_wheat" },
    { "label": "TMO satış, ekmeklik buğday", "kpi": "tmo_sell", "note": "yurt içi teslim" },
    { "label": "Konya TB, 1. grup kırmızı sert", "kpi": "konya_wheat", "note": "borsa ortalaması" }
  ],
  "positioning": {
    "title": "Fon pozisyonları",
    "source": "CFTC COT · managed money",
    "cadence": "haftalik",
    "maxAge": 10,
    "asOf": "2026-10-20",
    "checked": "2026-10-27T21:16:00+03:00",
    "src": [25],
    "rows": [
      {
        "label": "CBOT buğday (SRW)",
        "code": "001602",
        "long": 88258,
        "short": 140263,
        "changeLong": -851,
        "changeShort": 18599,
        "oi": 516379
      },
      {
        "label": "KC buğday (HRW)",
        "code": "001612",
        "long": 53234,
        "short": 45744,
        "changeLong": -6187,
        "changeShort": 3668,
        "oi": 320369
      },
      {
        "label": "CBOT mısır",
        "code": "002602",
        "long": 297797,
        "short": 133374,
        "changeLong": -32447,
        "changeShort": 49555,
        "oi": 1835658
      },
      {
        "label": "CBOT soya",
        "code": "005602",
        "long": 259970,
        "short": 38645,
        "changeLong": -25261,
        "changeShort": 3221,
        "oi": 1093612
      }
    ]
  },
  "policy": [
    {
      "date": "2026-10-02",
      "dateLabel": "2–5 Eki",
      "country": "TR",
      "title": "TMO 5,5 Mt buğdayı satışa açtı",
      "body": "Ekmeklik ve makarnalık 17.750–18.500 TL/t, düşük vasıflı 16.750; arpa 14.000 TL/t. Ödeme 5–23 Ekim, teslim 31 Ekim'e kadar; fiyatlar değişmedi.",
      "level": "mid",
      "src": [34]
    },
    {
      "date": "2026-10-01",
      "country": "RU",
      "title": "Bütçe taslağı: tahıl vergisi 2027'de dönüyor",
      "body": "Tahıl ihracat vergisi geliri 2026 için 135,8'den 12,0 milyar rubleye indirildi; 2027'de 60,3, 2028'de 58,6 milyar ruble öngörülüyor.",
      "level": "mid",
      "src": [37]
    },
    {
      "date": "2026-10-01",
      "country": "RU",
      "title": "SovEcon buğday ihracat tahminini düşürdü",
      "body": "2026/27 buğday ihracatı 36,7 Mt (−4,7 Mt), tahıl 49,4'ten 44,7 Mt'a; gerekçe Karadeniz ve Azak'taki aksama.",
      "level": "mid",
      "src": [36]
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
    }
  ],
  "calendar": [
    {
      "date": "2026-10-16",
      "time": "22:30",
      "title": "CFTC COT",
      "short": "COT",
      "body": "13 Ekim Salı pozisyonları",
      "key": true,
      "src": [25]
    },
    {
      "date": "2026-10-23",
      "title": "TMO buğday satışı: son ödeme günü",
      "short": "TMO",
      "body": "5,5 Mt'luk Ekim satışı; teslim 31 Ekim'e kadar",
      "key": true,
      "src": [34]
    },
    {
      "date": "2026-11-10",
      "time": "20:00",
      "title": "USDA WASDE (Kasım)",
      "short": "WASDE",
      "body": "ABD'de yaz saati bittiği için saat 20:00",
      "src": [15],
      "key": true
    },
    {
      "date": "2026-12-31",
      "title": "Rus tahıl vergisi muafiyeti bitiyor",
      "body": "Bütçe taslağı 2027'de vergi geliri öngörüyor",
      "src": [5, 37]
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
      ["2026-10-06", 704.25, "AMS uzlaşma"],
      ["2026-10-07", 686.5, "AMS uzlaşma"],
      ["2026-10-08", 683.25, "AMS uzlaşma"],
      ["2026-10-09", 671, "AMS uzlaşma"],
      ["2026-10-12", 672.25, "AMS uzlaşma"],
      ["2026-10-13", 669.25, "AMS uzlaşma"],
      ["2026-10-14", 673.25, "AMS uzlaşma"],
      ["2026-10-15", 670, "AMS uzlaşma"],
      ["2026-10-16", 660.5, "AMS uzlaşma"],
      ["2026-10-19", 655.25, "AMS uzlaşma"],
      ["2026-10-21", 628.25, "AMS uzlaşma"],
      ["2026-10-22", 624.75, "AMS uzlaşma"],
      ["2026-10-23", 625, "AMS uzlaşma"],
      ["2026-10-26", 616, "AMS uzlaşma"]
    ]
  },
  "feeds": [
    {
      "name": "USDA AMS günlük raporları",
      "data": "CBOT, KC, MGE vadeli uzlaşma fiyatları",
      "freq": "Günlük",
      "cadence": "gunluk",
      "method": "PDF, otomatik (cek.mjs cbot)",
      "cost": "Ücretsiz, kamu verisi",
      "status": "used",
      "ref": 28,
      "latest": "2026-10-26",
      "lastChecked": "2026-10-27T21:16:00+03:00"
    },
    {
      "name": "Reuters (haber akışı)",
      "data": "Piyasa yorumu, tahmin revizyonları",
      "freq": "Günlük",
      "cadence": "gunluk",
      "method": "Haber",
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
      "ref": 37,
      "latest": "2026-10-01",
      "lastChecked": "2026-10-16T08:16:00+03:00"
    },
    {
      "name": "IKAR, SovEcon, Rus Tahıl Birliği",
      "data": "Baltık ve Karadeniz FOB fiyatları, ihracat tahminleri",
      "freq": "Haftalık",
      "cadence": "haftalik",
      "method": "Haber (Reuters RU, Interfax)",
      "cost": "Ham veri ücretli",
      "status": "used",
      "ref": 49,
      "latest": "2026-10-12",
      "lastChecked": "2026-10-16T08:16:00+03:00"
    },
    {
      "name": "Konya Ticaret Borsası",
      "data": "Ekmeklik buğday işlem fiyatları (sınıf bazında)",
      "freq": "İş günü",
      "cadence": "gunluk",
      "method": "JSON, otomatik (cek.mjs konya)",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 29,
      "latest": "2026-10-26",
      "lastChecked": "2026-10-27T21:16:00+03:00"
    },
    {
      "name": "AB Komisyonu tarım veri portalı",
      "data": "Fransa değirmenlik buğdayı, Rouen (limana teslim)",
      "freq": "Haftalık",
      "cadence": "haftalik",
      "method": "REST API, otomatik (cek.mjs ab)",
      "cost": "Ücretsiz, CC BY 4.0",
      "status": "used",
      "ref": 30,
      "latest": "2026-10-18",
      "lastChecked": "2026-10-27T21:16:00+03:00"
    },
    {
      "name": "TMO duyuruları",
      "data": "Alım ve satış fiyatları, ihracat izinleri",
      "freq": "Olay bazlı",
      "cadence": "olay",
      "method": "Haber (tarimdanhaber.com)",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 34,
      "latest": "2026-10-02",
      "lastChecked": "2026-10-16T08:16:00+03:00"
    },
    {
      "name": "USDA WASDE ve FAS",
      "data": "Arz-talep, ihracat satışları",
      "freq": "Aylık / haftalık",
      "cadence": "aylik",
      "method": "Metin, XML",
      "cost": "Ücretsiz",
      "status": "used",
      "ref": 44,
      "latest": "2026-10-09",
      "lastChecked": "2026-10-10T08:15:00+03:00"
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
      "latest": "2026-10-27",
      "lastChecked": "2026-10-27T21:16:00+03:00"
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
      "latest": "2026-10-27T21:16:00+03:00",
      "lastChecked": "2026-10-27T21:16:00+03:00"
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
      "latest": "2026-10-20",
      "lastChecked": "2026-10-27T21:16:00+03:00"
    },
    {
      "name": "Sektör haberleri (Baird Maritime, Fastmarkets)",
      "data": "Gemi saldırıları, liman olayları, lojistik",
      "freq": "Sürekli",
      "cadence": "olay",
      "method": "Haber",
      "cost": "Bazıları abonelikli",
      "status": "used",
      "ref": 32,
      "latest": "2026-10-15",
      "lastChecked": "2026-10-16T08:16:00+03:00"
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
      "name": "Meteostat",
      "data": "İstasyon gözlemleri (Konya, Rostov, Krasnodar)",
      "freq": "Günlük",
      "method": "JSON API / Python",
      "cost": "Ücretsiz, CC BY 4.0 (atıf şart)",
      "status": "plan",
      "ref": null
    },
    {
      "name": "Open-Meteo",
      "data": "Yağış ve sıcaklık sapmaları",
      "freq": "Günlük",
      "method": "REST API",
      "cost": "Ücretsiz API yalnız ticari olmayan kullanım; ticari için ücretli plan ya da kendi sunucusu",
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
      "data": "Paris değirmenlik buğday vadelisi",
      "freq": "Günlük",
      "method": "Koşulları otomatik çekmeyi ve izinsiz yayını yasaklıyor",
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
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
    },
    {
      "name": "TradingView Lightweight Charts",
      "url": "https://github.com/tradingview/lightweight-charts",
      "category": "Grafik (statik HTML)",
      "what": "Canvas tabanlı finansal grafik kütüphanesi; çizgi, mum, histogram ve çoklu fiyat ekseni. Tek dosyalık sürümü statik sayfada çalışır.",
      "use": "Fiyat ile fon net pozisyonunu, kalendar spread'i ve FOB farklarını aynı zaman ekseninde göstermek; uyumsuzlukları (fiyat düşerken short'ların azalması gibi) görsel yakalamak.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-09",
      "maintained": true,
      "caveat": "Lisans, sayfada TradingView atıf notu ve tradingview.com bağlantısı ister (attributionLogo seçeneği yeterli).",
      "effort": "dusuk",
      "recommendation": "hemen",
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
    },
    {
      "name": "earthkit-data + cdsapi (ERA5)",
      "url": "https://github.com/ecmwf/earthkit-data",
      "category": "Hava ve iklim geçmişi",
      "what": "ECMWF'nin veri arayüzü; Copernicus CDS (ERA5), ECMWF açık verisi ve GRIB/NetCDF dosyalarını tek API ile getirir.",
      "use": "Bölgesel 30 yıllık normali ve güncel sezon sapmasını üretip tahminleri bağlama oturtmak; ekim yağışı normalin çok altındaysa Rus kışlık buğday riski long tezini destekler.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-08",
      "maintained": true,
      "caveat": "ERA5 CC BY 4.0 (atıf şart); CDS hesabı gerekir, veri birkaç gün gecikmeli.",
      "effort": "orta",
      "recommendation": "degerlendir",
      "checked": "2026-10-12"
    },
    {
      "name": "xclim",
      "url": "https://github.com/Ouranosinc/xclim",
      "category": "Ürün-iklim göstergeleri",
      "what": "İklim göstergeleri hesaplar: büyüme derece-günü, ardışık kurak gün, sıcak ve don günü sayısı, SPI/SPEI kuraklık endeksleri.",
      "use": "Ham hava verisini buğday ve mısır stres skoruna çevirir; skorun sezon normaline göre kötüleşmesi long, iyileşmesi short lehine okunur.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-09",
      "maintained": true,
      "caveat": null,
      "effort": "orta",
      "recommendation": "degerlendir",
      "checked": "2026-10-12"
    },
    {
      "name": "StatsForecast (Nixtla)",
      "url": "https://github.com/Nixtla/statsforecast",
      "category": "Tahmin ve mevsimsellik",
      "what": "AutoARIMA, AutoETS, MSTL, Theta gibi istatistiksel modelleri çok sayıda seride hızlı çalıştırır; tahmin aralığı ve çapraz doğrulama içerir.",
      "use": "Fiyat, spread, FOB farkı ve USD/TRY için mevsimsel normal bant üretmek; bant dışına taşma ortalamaya dönüş ya da trend kırılımı adayı.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-10",
      "maintained": true,
      "caveat": null,
      "effort": "dusuk",
      "recommendation": "degerlendir",
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
    },
    {
      "name": "Chronos-2 (chronos-forecasting)",
      "url": "https://github.com/amazon-science/chronos-forecasting",
      "category": "Tahmin (foundation model)",
      "what": "Amazon'un önceden eğitilmiş zaman serisi modelleri; eğitim gerektirmeden olasılıksal (kantil) tahmin yapar, ek değişken kabul eder.",
      "use": "Buğday ve mısır için 1-4 haftalık P10-P90 bantları; ek değişken olarak USD/TRY, fon net pozisyonu ve hava skoru. Bant asimetrisi pozisyon boyutu ve stop seviyesine girdi olur.",
      "license": "Apache-2.0",
      "commercial": "serbest",
      "lastActivity": "2026-10-05",
      "maintained": true,
      "caveat": "Kod ve chronos-2 ağırlıkları Apache-2.0. Fiyat yönünde isabet sınırlı olabilir; geriye dönük test edilmeden karar girdisi yapmayın.",
      "effort": "orta",
      "recommendation": "degerlendir",
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
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
      "checked": "2026-10-12"
    },
    {
      "name": "Mirror-Market",
      "url": "https://github.com/philipbergman6-glitch/Mirror-Market",
      "category": "Benzer sistem (fikir kaynağı)",
      "what": "Bu bültene en çok benzeyen proje: her sabah 36 veri katmanını (USDA NASS/PSD/WASDE/AMS, CFTC, CONAB, EIA, hava) toplayıp GitHub Pages üzerinde sinyal ve brifing sitesi üretiyor.",
      "use": "Hangi veri katmanlarının long/short sinyaline dönüştürülebileceğine dair fikir kaynağı. Soya kompleksine odaklı; Türkiye ve Karadeniz katmanı yok.",
      "license": "Lisans yok (tüm hakları saklı)",
      "commercial": "kisitli",
      "lastActivity": "2026-10-07",
      "maintained": true,
      "caveat": "LICENSE dosyası yok: kod kopyalanamaz, yalnızca fikir alınabilir. Yahoo verisine ve ticari kullanıma kapalı ücretsiz Open-Meteo API'sine bağlı.",
      "effort": "yuksek",
      "recommendation": "izle",
      "checked": "2026-10-12"
    },
    {
      "name": "grain-market-dashboard",
      "url": "https://github.com/josea12345/grain-market-dashboard",
      "category": "Benzer sistem (fikir kaynağı)",
      "what": "Streamlit ve GitHub Actions ile CBOT mısır, soya, küspe, yağ ve CBOT/KC buğday için fiyat, vade eğrisi, fon pozisyonu yüzdelikleri, WASDE olay çalışması ve mevsimsellik gösteriyor.",
      "use": "Vade eğrisi, fon pozisyonu yüzdeliği ve WASDE olay çalışması gibi panellerin nasıl kurulabileceğine örnek. ABD odaklı; Karadeniz FOB, TMO ve USD/TRY yok.",
      "license": "Lisans yok (tüm hakları saklı)",
      "commercial": "kisitli",
      "lastActivity": "2026-10-07",
      "maintained": true,
      "caveat": "LICENSE dosyası yok: kod kopyalanamaz. 5 Ekim 2026'da açılmış yeni bir depo; fiyatları Yahoo'dan alıyor (kişisel kullanım şartı).",
      "effort": "yuksek",
      "recommendation": "izle",
      "checked": "2026-10-12"
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
      "id": 8,
      "title": "Baird Maritime: Novorossiysk terminalleri durdu",
      "url": "https://www.bairdmaritime.com/shipping/dry-cargo/bulkers/port-shutdowns-push-russia-into-deeper-grain-export-slowdown",
      "published": null
    },
    {
      "id": 10,
      "title": "Fastmarkets: Novorossiysk'te üçüncü terminal durdu",
      "url": "https://www.fastmarkets.com/insights/third-major-terminal-suspended-at-novorossiysk/",
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
      "id": 20,
      "title": "Databento fiyatlandırma (CBOT vadeli verisi)",
      "url": "https://databento.com/pricing",
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
      "published": "2026-10-27"
    },
    {
      "id": 24,
      "title": "TCMB gösterge niteliğindeki döviz kurları",
      "url": "https://www.tcmb.gov.tr/kurlar/today.xml",
      "published": "2026-10-27"
    },
    {
      "id": 25,
      "title": "CFTC: Commitments of Traders, disaggregated futures-only",
      "url": "https://publicreporting.cftc.gov/Commitments-of-Traders/Disaggregated-Futures-Only/72hh-3qpy",
      "published": "2026-10-23"
    },
    {
      "id": 28,
      "title": "USDA AMS: Kansas City Daily Grain Bids, vadeli uzlaşma fiyatları",
      "url": "https://www.ams.usda.gov/mnreports/ams_3223.pdf",
      "published": "2026-10-26"
    },
    {
      "id": 29,
      "title": "Konya Ticaret Borsası: günlük bülten",
      "url": "https://www.ktb.org.tr/",
      "published": "2026-10-26"
    },
    {
      "id": 30,
      "title": "AB Komisyonu tarım veri portalı: Fransa değirmenlik buğdayı, Rouen (limana teslim)",
      "url": "https://agridata.ec.europa.eu/extensions/DataPortal/cereals.html",
      "published": "2026-10-22"
    },
    {
      "id": 31,
      "title": "Baird Maritime: Royad Mammadov Karadeniz'de battı",
      "url": "https://www.bairdmaritime.com/security/incidents/ukraine-blames-russian-drones-after-fire-sinks-ship-in-black-sea-leaving-two-dead",
      "published": "2026-10-05"
    },
    {
      "id": 32,
      "title": "Baird Maritime: Bulgaristan açıklarında Alfa Watan battı, Able vuruldu",
      "url": "https://www.bairdmaritime.com/security/incidents/acts-of-war/suspected-russian-drone-strike-sinks-merchant-ship-off-bulgaria-crew-missing",
      "published": "2026-10-06"
    },
    {
      "id": 33,
      "title": "Al Jazeera: Bulgaristan, iki ticari gemiye drone saldırısı",
      "url": "https://www.aljazeera.com/news/2026/10/6/bulgaria-says-two-commercial-vessels-were-hit-in-drone-attack-in-its-waters",
      "published": "2026-10-06"
    },
    {
      "id": 34,
      "title": "Tarımdan Haber: TMO 5,5 milyon ton buğdayı piyasaya veriyor",
      "url": "https://www.tarimdanhaber.com/tmo-55-milyon-ton-bugdayi-piyasaya-veriyor-ekim-ayi-satis-fiyatlari-belli-oldu",
      "published": "2026-10-02"
    },
    {
      "id": 35,
      "title": "Interfax: Rus Tahıl Birliği, Eylül ihracatı",
      "url": "https://www.interfax.ru/russia/1119761",
      "published": "2026-10-01"
    },
    {
      "id": 36,
      "title": "UkrAgroConsult: SovEcon buğday ihracat tahminini 36,7 Mt'a indirdi",
      "url": "https://ukragroconsult.com/en/news/russian-exporters-no-longer-expect-normalization-as-wheat-export-forecast-falls-to-a-multi-year-low/",
      "published": "2026-10-01"
    },
    {
      "id": 37,
      "title": "Interfax: 2027 bütçe taslağında tahıl ihracat vergisi geliri",
      "url": "https://www.interfax.ru/business/1119613",
      "published": "2026-10-01"
    },
    {
      "id": 38,
      "title": "Baird Maritime: Bulgaristan mürettebat aramasını durdurdu",
      "url": "https://www.bairdmaritime.com/security/incidents/no-survivors-found-bulgaria-ends-search-for-crew-of-drone-hit-black-sea-vessel",
      "published": "2026-10-07"
    },
    {
      "id": 39,
      "title": "Interfax: IKAR, Eylül'de Baltık'tan rekor buğday sevkiyatı",
      "url": "https://www.interfax.ru/business/1120817",
      "published": "2026-10-07"
    },
    {
      "id": 40,
      "title": "Interfax: Rusagrotrans, Temmuz–Eylül buğday ihracatı ≈7 Mt",
      "url": "https://www.interfax.ru/business/1120901",
      "published": "2026-10-07"
    },
    {
      "id": 42,
      "title": "Interfax: SovEcon Rus buğday hasadı tahminini 87,5 Mt'a indirdi",
      "url": "https://www.interfax.ru/business/1120927",
      "published": "2026-10-07"
    },
    {
      "id": 44,
      "title": "USDA: WASDE, Ekim 2026",
      "url": "https://www.usda.gov/oce/commodity/wasde/wasde1026.pdf",
      "published": "2026-10-09"
    },
    {
      "id": 45,
      "title": "DTN / Northern Ag Network: Ekim WASDE sonrası vadeliler",
      "url": "https://www.northernag.net/october-wasdes-shocks-grain-futures/",
      "published": "2026-10-09"
    },
    {
      "id": 46,
      "title": "Euronews: Karadeniz’deki drone saldırıları ve Avrupa’nın savunması",
      "url": "https://www.euronews.com/2026/10/07/deadly-drone-attacks-raise-questions-over-europes-black-sea-defences",
      "published": "2026-10-07"
    },
    {
      "id": 48,
      "title": "USDA AMS: Oklahoma Daily Grain Bids, vadeli uzlaşma fiyatları",
      "url": "https://www.ams.usda.gov/mnreports/ams_3100.pdf",
      "published": "2026-10-12"
    },
    {
      "id": 49,
      "title": "Reuters / The Moscow Times: Rus buğdayı ihraç fiyatları (IKAR, 12 Eki)",
      "url": "https://ru.themoscowtimes.com/2026/10/12/eksportnye-tseny-na-pshenitsu-rf-podrosli-na-proshloy-nedele-a208395",
      "published": "2026-10-12"
    },
    {
      "id": 50,
      "title": "Al Jazeera: Zelenskiy, Rusya'yı Trump'ın enerji ateşkesini ihlal etmekle suçladı",
      "url": "https://www.aljazeera.com/news/2026/10/12/ukraines-zelenskyy-accuses-russia-of-violating-trumps-energy-ceasefire",
      "published": "2026-10-12"
    },
    {
      "id": 51,
      "title": "TASS: Kremlin, enerji ateşkesi temaslarının sürdüğünü söyledi",
      "url": "https://tass.com/politics/2201369",
      "published": "2026-10-13"
    },
    {
      "id": 52,
      "title": "UkrAgroConsult (Bloomberg): buğday fiyatları ateşkes umuduyla dördüncü gün düştü",
      "url": "https://ukragroconsult.com/en/news/wheat-prices-fall-for-fourth-consecutive-day-on-black-sea-truce-hopes/",
      "published": "2026-10-12"
    },
    {
      "id": 53,
      "title": "Marinelink (Reuters): Rusya, Mikolayiv'e giden iki gemiyi vurduğunu söyledi",
      "url": "https://www.marinelink.com/news/russia-says-hit-vessels-delivering-543656",
      "published": "2026-10-13"
    },
    {
      "id": 54,
      "title": "Novinite: Hindistan Karadeniz'de seyir güvencesi istedi",
      "url": "https://www.novinite.com/articles/241082/India+Seeks+Black+Sea+Shipping+Guarantees+From+Russia+and+Ukraine",
      "published": "2026-10-15"
    },
    {
      "id": 55,
      "title": "USDA AMS: Kansas Daily Grain Bids, vadeli uzlaşma fiyatları",
      "url": "https://www.ams.usda.gov/mnreports/ams_2886.pdf",
      "published": "2026-10-21"
    }
  ]
};
