# Türkiye Hububat Masası

Türkiye'deki bir hububat ticaret masası için sabah bülteni dashboard'u. Statik bir sayfadır; sunucu, veritabanı ya da kurulum gerektirmez.

**Nasıl güncellenir:** Otomasyon repoya gömülüdür (GitHub Actions). Hafta içi günde üç kez fiyatlar yapay zekâsız çekilir; her gün 06:29 TSİ'de Claude bülteni yazar, doğrular ve `main` dalına gönderir; her güncellemeden sonra sayfa yeniden yayınlanır. n8n ya da başka bir otomasyon aracı kullanılmaz.

**Tazelik:** Her rakam tarihli ve kaynaklıdır. Sayfa açıldığında her göstergenin tazeliği tarayıcıda yeniden hesaplanır: yeşil güncel, sarı gecikmiş, kırmızı eski. Rutin bir gün çalışmazsa noktalar kendiliğinden sararır ve sayfanın üstünde uyarı çıkar.

## Nasıl açılır

- Canlı: https://trade.agentized.io (GitHub Pages). Kurulum aşağıda, "Canlı yayın ve otomasyon" bölümünde.
- Yerel: `index.html` dosyasını tarayıcıda açın. `data.js`, `tazelik.js` ve `app.js` aynı klasörde olmalıdır.

USD/TRY ve EUR/TRY sayfa açılırken ayrıca canlı çekilir (Coinbase, yanıt gelmezse ExchangeRate-API). İkisi de yanıt vermezse bültendeki değer kalır.

## Dosyalar

| Dosya | Görevi |
|---|---|
| `index.html` | Sayfa yapısı, stil ve içerik güvenlik politikası (CSP) |
| `app.js` | Sayfayı `data.js`'ten çizer; hesaplanan değerler ($/t, TL→$, % değişim) burada üretilir |
| `tazelik.js` | Tazelik kuralları. Sayfa ve doğrulama betiği aynı dosyayı kullanır |
| `data.js` | Günlük veri. Rutin yalnızca bu dosyayı değiştirir |
| `fonts.css`, `fonts/` | Yazı tipleri (Archivo, IBM Plex; SIL OFL 1.1). Siteden sunulur, Google'a istek gitmez |
| `robots.txt` | Arama motoru ve veri toplayıcı kuralları (bkz. "Gizlilik") |
| `scripts/kontrol.mjs` | Doğrulama: yapı, kaynak numaraları, makul aralıklar, tazelik |
| `scripts/onizleme.mjs` | Sayfayı başsız Chromium'da açar, hata arar, ekran görüntüsü alır |
| `scripts/cek.mjs` | API'si olan kaynaklardan (TCMB, CFTC vb.) mekanik veri çekimi |
| `scripts/veri.mjs` | `data.js` okuma, yazma, biçimleme |
| `.claude/skills/sabah-guncellemesi/SKILL.md` | Rutinin izlediği güncelleme prosedürü ve kaynak sırası |
| `.claude/settings.json` | Rutinin izin istemine takılmadan çalışması için gereken komut izinleri |
| `.github/workflows/veri.yml` | "Veri çek": hafta içi 13:07, 15:45, 23:20 TSİ'de API'li kaynakları çeker (yapay zekâ yok) |
| `.github/workflows/sabah-bulteni.yml` | "Sabah bülteni": her gün 06:29 TSİ'de Claude prosedürü uygular |
| `.github/workflows/yayin.yml` | "Yayın": her güncellemeden sonra sayfayı Cloudflare Workers'a ya da GitHub Pages'e yayınlar |
| `wrangler.json` | Cloudflare Workers yapılandırması (yalnızca statik dosyalar; alan adı yayın sırasında `ALAN_ADI` değişkeninden eklenir) |

## Canlı yayın ve otomasyon

| İş akışı | Ne zaman (TSİ) | Ne yapar | Yapay zekâ |
|---|---|---|---|
| Veri çek | Hafta içi 13:07, 15:45, 23:20 | CBOT/KC uzlaşmaları, kur, Konya borsası, AB Rouen, CFTC COT; değiştiyse `main`'e gönderir | Yok, ücretsiz |
| Sabah bülteni | Her gün 06:29 | `SKILL.md` prosedürü: araştırma, bülten metni, doğrulama, gönderim | Claude (aboneliğinizden) |
| Yayın | Her güncellemeden sonra | Sayfa dosyalarını GitHub Pages'e ya da Cloudflare Workers'a yayınlar (hangisi ayarlıysa) | Yok |

Bir iş akışı başarısız olursa GitHub e-postayla haber verir. Elle çalıştırmak için: *Actions → iş akışı → Run workflow*.

**Bir kerelik kurulum (repo sahibi yapar):**

1. **Claude jetonu.** Bilgisayarınızda `claude setup-token` çalıştırın ve çıkan jetonu *Settings → Secrets and variables → Actions → New repository secret* ile `CLAUDE_CODE_OAUTH_TOKEN` adıyla ekleyin. Jeton yokken "Sabah bülteni" kendini atlar.
2. **Yayın: GitHub Pages ve `trade.agentized.io`.** agentized.io'nun DNS'i Hostinger'da olduğu için bu yol kullanılır.
   1. GitHub'da *Settings → Pages → Build and deployment → Source: GitHub Actions*. Aynı sayfada *Custom domain* kutusuna `trade.agentized.io` yazıp *Save*. Önce burayı kaydedin, sonra DNS kaydını ekleyin; sıra tersine olursa alt alan adı bir süre başka bir GitHub hesabına açık kalır.
   2. Hostinger hPanel → *Alan Adları → agentized.io → DNS / Ad Sunucuları → DNS kayıtları*: yeni kayıt, Tür `CNAME`, Ad `trade`, Hedef `sabalioglu.github.io`, TTL varsayılan. Mevcut kayıtlara (Vercel'e giden `@` ve `www`, Google e-postası için `MX`) dokunmayın.
   3. DNS yayıldığında (genelde birkaç dakika, en geç birkaç saat) *Settings → Pages* sayfasında *Enforce HTTPS*'i açın.
   4. *Actions → Yayın → Run workflow*. Sayfa `https://trade.agentized.io` adresinde açılır.
   5. Önerilen: GitHub profil ayarlarında *Pages → Add a domain* ile `agentized.io`'yu doğrulayın; GitHub'ın verdiği `TXT` kaydını (`_github-pages-challenge-sabalioglu`) Hostinger'a ekleyip *Verify*'a basın. Doğrulanan alan adının alt alan adlarını başka hesap kullanamaz.

   GitHub Pages ücretsiz planda herkese açık repo ister. Site her durumda herkese açıktır.
3. **Alternatif: Cloudflare Workers.** Özel alan adı yalnızca alan adı Cloudflare'de ise (ad sunucuları Cloudflare'e taşınmışsa) bağlanır; o zaman DNS kaydı ve HTTPS sertifikası kendiliğinden kurulur.
   1. Cloudflare panelinde *My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"* şablonunu seçin; *Zone Resources* kısmında alan adınızı seçip jetonu oluşturun.
   2. Hesap kimliğini (*Account ID*) Cloudflare panelinin Workers sayfasından kopyalayın.
   3. GitHub'da *Settings → Secrets and variables → Actions*: `CLOUDFLARE_API_TOKEN` ve `CLOUDFLARE_ACCOUNT_ID` sırlarını ekleyin; *Variables* sekmesinde `ALAN_ADI` değişkenine yayın adresini yazın. Bu adda mevcut bir CNAME kaydı olmamalıdır.
   4. *Actions → Yayın → Run workflow*. Sayfa birkaç dakika içinde `https://<ALAN_ADI>` ve `hububat-masasi.<hesap>.workers.dev` adreslerinde açılır.

**Yedek rutin:** claude.ai'deki "Hububat Masası sabah güncellemesi" rutini her gün 08:13 TSİ'de kalıcı "Hububat Masası · sabah rutini" oturumunu uyandırır. O günün bülteni zaten yayınlandıysa hiçbir şey yapmadan durur; GitHub tarafı çalışmadıysa bülteni o yazar. Bu oturumu arşivlemeyin. Yedeğe gerek kalmazsa claude.ai → Routines'ten kapatılabilir.

Prosedürün tamamı `.claude/skills/sabah-guncellemesi/SKILL.md` dosyasındadır. Prosedürü değiştirmek için iş akışını değil bu dosyayı düzenleyin. Pazartesileri prosedür açık kaynak araç listesini de yeniler.

## Gizlilik

Sayfa herkese açıktır; adresi bilen herkes görebilir. Alınan önlemler:

- **Arama motorları:** sayfada `noindex, nofollow, noarchive` etiketi var. `robots.txt` yalnızca Google, Bing ve Yandex'in sayfayı okumasına izin verir; bu etiketi görüp sayfayı dizine eklememeleri için gereklidir. Yapay zekâ veri toplayıcıları dahil diğer tarayıcılar engellidir.
- **Üçüncü taraf yok:** çerez, analiz ya da takip kodu yok; yazı tipleri sitenin kendisinden sunulur. `index.html`'deki içerik güvenlik politikası (CSP) sayfanın yalnızca kendi dosyalarını yüklemesine ve yalnızca iki kur servisine bağlanmasına izin verir. Metin alanlarına karışabilecek kod çalışmaz.
- **Yönlendiren bilgisi:** `no-referrer`. Sayfadaki bir bağlantıya tıklandığında karşı site ziyaretçinin nereden geldiğini görmez.

Sonra karar verilecekler:

- **Canlı kur:** ziyaretçinin tarayıcısı Coinbase'e (yanıt yoksa ExchangeRate-API'ye) bağlanır; bu servisler ziyaretçinin IP adresini ve sitenin adresini görür. İstenirse kapatılır; kur günde üç kez repo tarafında zaten çekiliyor.
- **Repo herkese açık:** kod ve `data.js` geçmişi GitHub'da görünür. Özel repodan Pages yayını ücretli plan (GitHub Pro) ister; site yine herkese açık olur.
- **Giriş isteyen sayfa:** Cloudflare Access gerekir (50 kullanıcıya kadar ücretsiz). Bunun için ya agentized.io'nun ad sunucuları Cloudflare'e taşınır (Vercel ve Google e-posta kayıtları aynen kopyalanır) ya da sayfa Cloudflare Workers'ın `workers.dev` adresinden yayınlanır.

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
