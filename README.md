# Türkiye Hububat Masası

Türkiye'deki bir hububat ticaret masası için sabah bülteni dashboard'u. Statik bir sayfadır; sunucu, veritabanı ya da kurulum gerektirmez.

**Nasıl güncellenir:** Her gün 06:29 TSİ'de bir Claude rutini çalışır, verileri kaynaklarından yeniden toplar, `data.js` dosyasını günceller, doğrulamadan geçirir ve `main` dalına gönderir. n8n ya da başka bir otomasyon aracı kullanılmaz.

**Tazelik:** Her rakam tarihli ve kaynaklıdır. Sayfa açıldığında her göstergenin tazeliği tarayıcıda yeniden hesaplanır: yeşil güncel, sarı gecikmiş, kırmızı eski. Rutin bir gün çalışmazsa noktalar kendiliğinden sararır ve sayfanın üstünde uyarı çıkar.

## Nasıl açılır

- `index.html` dosyasını tarayıcıda açın. `data.js`, `tazelik.js` ve `app.js` aynı klasörde olmalıdır.
- GitHub Pages için: *Settings → Pages → Source: Deploy from a branch → main / (root)*. Sayfa birkaç dakika içinde `https://sabalioglu.github.io/Tradeling/` adresinde yayına çıkar. Rutin her sabah `main`'e gönderdiği için Pages kendiliğinden yenilenir.

USD/TRY ve EUR/TRY sayfa açılırken ayrıca canlı çekilir (Coinbase, yanıt gelmezse ExchangeRate-API). İkisi de yanıt vermezse bültendeki değer kalır.

## Dosyalar

| Dosya | Görevi |
|---|---|
| `index.html` | Sayfa yapısı ve stil |
| `app.js` | Sayfayı `data.js`'ten çizer; hesaplanan değerler ($/t, TL→$, % değişim) burada üretilir |
| `tazelik.js` | Tazelik kuralları. Sayfa ve doğrulama betiği aynı dosyayı kullanır |
| `data.js` | Günlük veri. Rutin yalnızca bu dosyayı değiştirir |
| `scripts/kontrol.mjs` | Doğrulama: yapı, kaynak numaraları, makul aralıklar, tazelik |
| `scripts/onizleme.mjs` | Sayfayı başsız Chromium'da açar, hata arar, ekran görüntüsü alır |
| `scripts/cek.mjs` | API'si olan kaynaklardan (TCMB, CFTC vb.) mekanik veri çekimi |
| `scripts/veri.mjs` | `data.js` okuma, yazma, biçimleme |
| `.claude/skills/sabah-guncellemesi/SKILL.md` | Rutinin izlediği güncelleme prosedürü ve kaynak sırası |
| `.claude/settings.json` | Rutinin izin istemine takılmadan çalışması için gereken komut izinleri |

## Sabah rutini

- **Ad:** Hububat Masası sabah güncellemesi
- **Zaman:** Her gün 06:29 TSİ. Hafta sonu da çalışır; piyasa verisi yoksa haber, politika ve hava kısmını yeniler.
- **Nerede çalışır:** "Hububat Masası · sabah rutini" adlı kalıcı Claude Code oturumunda. Depo bu oturumun kaynağıdır ve `main`'e push yetkisi buradan gelir. Rutin her sabah bu oturuma güncelleme mesajı gönderir. **Bu oturumu arşivlemeyin**; arşivlenirse rutin çalışmaz.
- **Yönetim:** claude.ai/code → Routines. Saat, istem ya da durdurma buradan değiştirilir.
- **Neden her gün yeni oturum değil:** Rutinin her çalışmada açtığı yeni oturumlar depoya push yetkisi alamadı (denendi, 403). Rutini claude.ai arayüzünden depoyu seçerek yeniden kurarsanız her sabah temiz bir oturum da kullanılabilir.
- **Ne yapar:**
  - Önce API'si olan kaynaklardan otomatik çeker (`node scripts/cek.mjs --yaz`), sonra araştırır.
  - Fiyatları iki kaynakla çapraz kontrol eder.
  - Özet ve risk metinlerini yalnızca topladığı kaynaklardan yazar.
  - `node scripts/kontrol.mjs --sabah` geçmeden push etmez.
- **Pazartesileri** ayrıca açık kaynak araç listesini yeniler: lisans değişikliği, son etkinlik, yeni adaylar.

Prosedürün tamamı `.claude/skills/sabah-guncellemesi/SKILL.md` dosyasındadır. Prosedürü değiştirmek için rutini değil bu dosyayı düzenleyin.

## Tazelik kuralları

| Sıklık | Güncel | Gecikmiş | Eski |
|---|---|---|---|
| Günlük (`gunluk`) | en fazla 1 iş günü geriden | 2 iş günü | daha fazla |
| Haftalık (`haftalik`) | 8 güne kadar | 15 güne kadar | daha fazla |
| Aylık (`aylik`) | 35 güne kadar | 45 güne kadar | daha fazla |
| Olay bazlı (`olay`) | yalnızca son kontrole bakılır | | |

Yayın gecikmesi bilinen serilerde göstergeye özel `maxAge` sınırı kullanılır: CFTC COT Salı verisini Cuma yayımladığı için 10 gün. Ayrıca her göstergenin son kontrolü 30 saatten eskiyse gecikmiş, 54 saatten eskiyse eski sayılır. Kaynak yeni veri yayımlamadıysa (tatil, haftalık seri) rutin değeri korur ve `staleReason` alanına gerekçeyi yazar; gerekçe sayfada noktanın üzerine gelince görünür.

## Veri sözleşmesi (`data.js`)

`window.HUBUBAT = { ... }` biçiminde saf JSON. Tarihler `YYYY-AA-GG`, zamanlar saat dilimli ISO 8601 (`2026-10-08T06:52:00+03:00`). Sayılar JSON sayısıdır; Türkçe biçimlendirmeyi sayfa yapar.

| Bölüm | Alanlar |
|---|---|
| `meta` | `bulletinDate`, `generatedAt`, `generatedBy`, `projectsCheckedAt` |
| `kpis[]` | `id`, `label`, `value`, `decimals`, `unit`, `asOf`, `asOfNote`, `cadence`, `checked`, `src[]`; isteğe bağlı `maxAge`, `base {value,label}` (% değişim), `perTonne` (¢/bu → $/t), `fx` (TL → $), `eur` (€/t → $/t, EUR/USD çaprazı kur göstergesinden), `spread {kpi,label}`, `secondary {label,value}`, `sub`, `approx`, `staleReason` |
| `brief[]` | Tam 3 madde: `headline`, `body`, `src[]`, `impact`, `impactSrc[]` |
| `risks[]` | `category`, `title`, `body`, `level` (`high`, `mid`, `low`, `pos`), `src[]` |
| `supplyDemand` | `source`, `asOf`, `rows[] {label, value, change, src[]}` |
| `exports` | `note`, `unit`, `max`, `footnote`, `src[]`, `rows[] {label, value, display, note, tag, hi, estimate}` |
| `ladder[]` | `label`, `kpi`, `note`. Değerler göstergelerden hesaplanır |
| `positioning` | CFTC COT fon pozisyonları: `title`, `source`, `cadence`, `maxAge`, `asOf`, `checked`, `src[]`, `rows[] {label, code, long, short, changeLong, changeShort, oi}`. `scripts/cek.mjs cot` doldurur |
| `policy[]` | `date`, `dateLabel`, `country`, `title`, `body`, `level`, `src[]` |
| `calendar[]` | Tek seferlik: `date`, `time`, `title`, `short`, `body`, `key`, `src[]`. Tekrarlayan: `recurring`, `time`, `until` |
| `chart` | `title`, `contract`, `unit`, `perTonne`, `src[]`, `points[] ["YYYY-AA-GG", değer, "tür"]` |
| `feeds[]` | Veri kaynakları tablosu: `name`, `data`, `freq`, `cadence`, `method`, `cost`, `status` (`used`, `plan`, `lic`), `ref`, `latest`, `lastChecked` |
| `projects[]` | Açık kaynak araçlar: `name`, `url`, `category`, `what`, `use`, `license`, `commercial` (`serbest`, `copyleft`, `kisitli`), `lastActivity`, `maintained`, `caveat`, `effort`, `recommendation`, `checked` |
| `refs[]` | Numaralı kaynaklar: `id`, `title`, `url`, `published` |

## Elle güncelleme

```sh
# data.js'i düzenledikten sonra
node scripts/veri.mjs bicimle      # standart biçim
node scripts/kontrol.mjs           # yapı ve tazelik raporu (rutin --sabah kullanır)
node scripts/onizleme.mjs          # başsız tarayıcıda çizim kontrolü ve ekran görüntüsü
```

## Uyarı

Bu sayfa işlem kararı için tek başına kullanılmamalıdır. Hesaplanan değerler ≈ ile işaretlidir. Haber kaynaklarından alınan fiyatlar ilgili kurumların lisans koşullarına tabidir.
