# Türkiye Hububat Masası

Türkiye'deki bir hububat ticaret masası için sabah bülteni dashboard'u. Statik bir sayfadır; sunucu, veritabanı ya da kurulum gerektirmez.

**Nasıl güncellenir:** Otomasyon repoya gömülüdür (GitHub Actions). Hafta içi günde üç kez fiyatlar yapay zekâsız çekilir; her gün 06:29 TSİ'de Claude bülteni yazar, doğrular ve `main` dalına gönderir; her güncellemeden sonra sayfa yeniden yayınlanır. n8n ya da başka bir otomasyon aracı kullanılmaz.

**Tazelik:** Her rakam tarihli ve kaynaklıdır. Sayfa açıldığında her göstergenin tazeliği tarayıcıda yeniden hesaplanır: yeşil güncel, sarı gecikmiş, kırmızı eski. Rutin bir gün çalışmazsa noktalar kendiliğinden sararır ve sayfanın üstünde uyarı çıkar.

## Nasıl açılır

- Canlı: GitHub Pages üzerinden, kendi alan adınızla (kurulum aşağıda, "Canlı yayın ve otomasyon").
- Yerel: `index.html` dosyasını tarayıcıda açın. `data.js`, `tazelik.js` ve `app.js` aynı klasörde olmalıdır.

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
| `.github/workflows/veri.yml` | "Veri çek": hafta içi 13:07, 15:45, 23:20 TSİ'de API'li kaynakları çeker (yapay zekâ yok) |
| `.github/workflows/sabah-bulteni.yml` | "Sabah bülteni": her gün 06:29 TSİ'de Claude prosedürü uygular |
| `.github/workflows/yayin.yml` | "Yayın": her güncellemeden sonra sayfayı GitHub Pages'e yayınlar |

## Canlı yayın ve otomasyon

| İş akışı | Ne zaman (TSİ) | Ne yapar | Yapay zekâ |
|---|---|---|---|
| Veri çek | Hafta içi 13:07, 15:45, 23:20 | CBOT/KC uzlaşmaları, kur, Konya borsası, AB Rouen, CFTC COT; değiştiyse `main`'e gönderir | Yok, ücretsiz |
| Sabah bülteni | Her gün 06:29 | `SKILL.md` prosedürü: araştırma, bülten metni, doğrulama, gönderim | Claude (aboneliğinizden) |
| Yayın | Her güncellemeden sonra | `index.html`, `app.js`, `tazelik.js`, `data.js`'i GitHub Pages'e yayınlar | Yok |

Bir iş akışı başarısız olursa GitHub e-postayla haber verir. Elle çalıştırmak için: *Actions → iş akışı → Run workflow*.

**Bir kerelik kurulum (repo sahibi yapar):**

1. **Claude jetonu.** Bilgisayarınızda `claude setup-token` çalıştırın ve çıkan jetonu *Settings → Secrets and variables → Actions → New repository secret* ile `CLAUDE_CODE_OAUTH_TOKEN` adıyla ekleyin. Jeton yokken "Sabah bülteni" kendini atlar.
2. **GitHub Pages.** *Settings → Pages → Build and deployment → Source: GitHub Actions*.
3. **Alan adı.** Aynı sayfada *Custom domain* kutusuna alan adını yazın (ör. `hububat.sirketiniz.com`) ve *Enforce HTTPS*'i açın. Alan adınızın DNS panelinde bir kayıt ekleyin:
   - Alt alan adı için: `CNAME` kaydı, ad `hububat`, değer `sabalioglu.github.io`
   - Kök alan adı için: `A` kayıtları `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

   DNS'in yayılması birkaç dakikadan birkaç saate kadar sürebilir; HTTPS sertifikası ardından kendiliğinden gelir.

**Yedek rutin:** claude.ai'deki "Hububat Masası sabah güncellemesi" rutini her gün 08:13 TSİ'de kalıcı "Hububat Masası · sabah rutini" oturumunu uyandırır. O günün bülteni zaten yayınlandıysa hiçbir şey yapmadan durur; GitHub tarafı çalışmadıysa bülteni o yazar. Bu oturumu arşivlemeyin. Yedeğe gerek kalmazsa claude.ai → Routines'ten kapatılabilir.

Prosedürün tamamı `.claude/skills/sabah-guncellemesi/SKILL.md` dosyasındadır. Prosedürü değiştirmek için iş akışını değil bu dosyayı düzenleyin. Pazartesileri prosedür açık kaynak araç listesini de yeniler.

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
