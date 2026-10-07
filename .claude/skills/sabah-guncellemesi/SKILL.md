---
name: sabah-guncellemesi
description: Türkiye Hububat Masası bültenini (data.js) en güncel kaynaklardan yeniler, doğrular ve main dalına yayınlar. Sabah rutini her gün çalıştırır; kullanıcı "bülteni güncelle" dediğinde de kullanılır.
---

# Sabah güncellemesi

Hedef: `data.js`'teki her rakamı kaynağın yayımladığı **en son** veriyle yenilemek, her rakama tarih ve kaynak bağlamak, doğrulayıp `main`'e göndermek. GitHub Pages `main`'den yayın yapar; push ettiğin an sayfa değişir. Kullanıcı için en önemli iki şey: veri güncel olmalı ve kaynağı doğru olmalı.

## Değişmez kurallar

1. **Tazelik.** Bir değeri ancak kaynağın yayımladığı en son veri olduğunu doğruladıysan yaz. `asOf` = verinin ait olduğu gün (uzlaşma günü, rapor tarihi, kararname tarihi). `checked` = bu çalıştırmada doğruladığın an (`2026-10-08T06:52:00+03:00` biçiminde). Değer değişmese bile doğruladıysan `checked`'i güncelle.
2. **Yeni veri yoksa uydurma.** Kaynak yeni veri yayımlamadıysa (hafta sonu, ABD/Rusya tatili, haftalık seri) değeri koru, `checked`'i güncelle. Tazelik sınırı aşılıyorsa `staleReason` alanına kısa gerekçe yaz ("CBOT 12 Eki'de kapalıydı"). Veri yenilendiğinde `staleReason`'ı sil.
3. **Kaynak sırası.** Birincil/resmi kaynak > kurumun kendi yayını > büyük haber ajansı > ikincil özet. Ayna siteleri ve yeniden yayınlar (oklahomafarmreport.com'daki AMS kopyası, capital.com'daki Reuters kopyası, cropgpt.ai, roic.ai gibi) yalnızca başka kaynak yoksa ve başlıkta belirtilerek kullanılır.
4. **Çapraz kontrol.** Fiyatları iki bağımsız kaynakla karşılaştır. Fark varsa birincil kaynağı yaz, farkı son mesajda belirt.
5. **Kaynaksız cümle yok.** Özet, risk ve politika metnindeki her iddia `src` ile bir `refs` kaydına bağlanır. Rakamı ve niteliği kaynakta yazdığı gibi aktar: kaynakta olmayan bir özellik ekleme (bayrak, sahiplik, "ilk kez" gibi), tek bir örneği gruba genelleme, bir kişinin ya da tarafın iddiasını "X'e göre" diye yaz. `refs[].published` kaynağın yayın tarihidir. Özette yayın tarihi bilinmeyen ya da 14 günden eski haber kaynağı kullanma (yapısal bilgi için resmi sayfalar hariç).
6. **Hesaplamayı sayfaya bırak.** $/t, TL→$, % değişim ve fiyat merdiveni `app.js`'te hesaplanır. Sen ham değeri, birimi ve `base`'i gir. Metinde hesaplanmış rakam kullanırsan ≈ ile işaretle.
7. **Yalnızca bu repo, yalnızca `data.js`.** `index.html`, `app.js`, `tazelik.js`, betikler ve bu dosya rutin tarafından değiştirilmez. Bir hata görürsen son mesajda bildir. PR açma, zorla push etme, doğrulamayı atlama ya da gevşetme.
8. **İşlem tavsiyesi yok.** Bülten bilgi verir; "al" ya da "sat" demez. Long/short açısından önemli gelişmeyi "Türkiye etkisi" ve risk metnine yansıt.
9. **Başka depoya dokunma.** Açık kaynak taramasında yalnızca herkese açık web kaynaklarını kullan (WebSearch, WebFetch, pypi.org JSON, repos.ecosyste.ms). Başka depolar için `mcp__github__*` araçlarını, `gh`'yi ya da `git clone`'u kullanma.

## Adımlar

### 0. Hazırlık
- Rutin normalde GitHub Actions'ta çalışır (`.github/workflows/sabah-bulteni.yml`, her gün 06:29 TSİ); depo zaten çalışma dizinindedir. Yedek olarak kalıcı "Hububat Masası · sabah rutini" claude.ai oturumu 08:13'te uyanır ve o günün bülteni yayınlanmamışsa aynı prosedürü uygular.
- Repo kökünde: `git checkout main && git pull origin main`.
- claude.ai oturumunda repo çalışma dizininde yoksa ve `mcp__claude-code-remote__add_repo` aracı varsa onunla ekle (owner `sabalioglu`, repo `Tradeling`, access `push`). Araç yoksa dur ve bildir: düz `git clone` push yetkisi vermez.
- Bugünün TSİ tarihi ve günü: `TZ=Europe/Istanbul date`. Hafta sonu ya da ABD/Avrupa/Rusya/Türkiye tatili mi, not al.

### 1. Durumu gör
`node scripts/kontrol.mjs` → hangi göstergeler eski, hangi uyarılar var.

### 2. Mekanik veriler
"Veri çek" iş akışı bu çekimi hafta içi günde üç kez (13:07, 15:45, 23:20 TSİ) yapay zekâsız yapar; sabah yine çalıştır.
`node scripts/cek.mjs` API'si olan kaynakları çeker ve önerilen değerleri yazdırır. `node scripts/cek.mjs --yaz` aynı değerleri `data.js`'e işler. Çıktıyı mantık açısından kontrol et; bir kaynak yanıt vermezse aşağıdaki yedeğe geç.

### 3. Piyasa göstergeleri
Her gösterge için kaynak sırası, yayın saati (TSİ) ve notlar aşağıdaki "Kaynak sırası" bölümünde. Her değer için: en son yayını bul, tarihini doğrula, ikinci kaynakla karşılaştır, `value`, `asOf`, `asOfNote`, `checked`, `src` ve gerekiyorsa `base`'i yaz.

- CBOT için `base` = bir önceki uzlaşma; `base.label` = "6 Eki uzlaşmasına göre" gibi. `asOfNote` = "uzlaşma" (seans içi fiyat yalnızca uzlaşma yoksa, "seans içi" notuyla).
- **Kontrat devri.** İlk ihbar gününden (FND, kontrat ayından önceki ayın son iş günü) en az 3 iş günü önce bir sonraki kontrata geç: soya Kas-26 → Oca-27 (FND 30 Eki 2026), CBOT ve KC buğday ile mısır Ara-26 → Mar-27 (FND 30 Kas 2026). Devirde `contract` (ör. "Jan 27"), `label`, `base`, `chart.title`, `chart.contract` güncellenir; `chart.points` yeni kontratın son 20–30 iş günlük uzlaşmalarıyla yeniden başlatılır ve özet mesajında belirtilir.

### 4. Haberler, politika, hava (son 24–72 saat)
- Karadeniz lojistiği: Novorossiysk ve Azak limanları, terminal durumu, savaş riski sigortası, navlun.
- Rusya: ihracat vergisi (Tarım Bakanlığı her hafta), kota, IKAR/SovEcon/Rus Tahıl Birliği tahminleri, güz ekimi ve toprak nemi.
- Türkiye: Resmî Gazete (gümrük vergisi, Dahilde İşleme Rejimi, ithalat/ihracat kararları), TMO duyuruları ve ihaleleri, Ticaret Bakanlığı, TÜİK.
- ABD: USDA (WASDE, Crop Progress, Export Sales), CFTC COT (Cuma 15:30 ET: ABD yaz saatinde 22:30, kışın 23:30 TSİ; Salı günü pozisyonları).
- AB: Euronext, FranceAgriMer, AB Komisyonu MARS bülteni.
- Hava: güney Rusya (Krasnodar, Rostov, Stavropol), Ukrayna, Türkiye (Konya, Ankara, Eskişehir), ABD ovaları.

### 5. Bülten metni
- `brief`: tam 3 madde. En önemli üç gelişme, her biri için somut "Türkiye etkisi". Gelişme yoksa mevcut maddeleri güncel rakam ve tarihle yenile; dünkü metni olduğu gibi bırakma.
- `risks`: 3–7 madde, seviye `high`, `mid`, `low` ya da `pos`.
- `policy`: son 90 gün. Yeni gelişmeyi ekle, 90 günü geçenleri sil.
- `calendar`: geçmiş tek seferlik olayları sil. Önümüzdeki 6–8 haftanın kritik olaylarını tut (WASDE, büyük USDA raporları, Rus vergi kararı tarihleri, TMO ihaleleri, kontrat FND'leri). En yakın kritik olaylarda `key: true` ve kısa ad (`short`).
- `supplyDemand`: yeni WASDE ya da büyük tahmin revizyonu geldiyse güncelle (`asOf` = rapor tarihi).
- `exports`: yeni Rus aylık ihracat verisi ya da tahmini geldiyse güncelle; `max` en büyük değerin üstünde kalmalı.
- `chart.points`: CBOT buğday göstergesinin son uzlaşmasını ekle (aynı gün varsa güncelle). Tarihler artan sırada ve tekil.
- `meta`: `bulletinDate` bugün, `generatedAt` şimdi (`+03:00`), `generatedBy` "Claude rutini" (GitHub Actions'ta "Claude rutini · GitHub Actions").

### 6. Kaynak listesi
- Bugün kullandığın her kaynak için `refs` kaydı: kısa başlık ("Kurum: konu"), doğrudan URL, `published`.
- Kullanılmayan `refs` kayıtlarını sil (kontrol uyarır). `id`'ler tekil olmalı; yeni kayda en büyük `id` + 1 ver, var olanları yeniden numaralandırma.
- `feeds`: kullanılan her kaynak için `latest` (kaynaktaki en son verinin tarihi) ve `lastChecked` (şimdi). Kaynağa ulaşamadıysan `lastChecked`'i güncelleme ve son mesajda belirt. Daha güncel ya da daha birincil bir kaynak bulursan tabloya ekle, eskisini `plan`'a çek ya da sil.

### 7. Pazartesi: açık kaynak taraması
Yalnızca pazartesi (ya da `meta.projectsCheckedAt` 7 günden eskiyse):
- `projects` listesindeki her proje için lisansı ve son etkinliği yeniden doğrula (proje sayfası, pypi.org JSON, repos.ecosyste.ms). Lisans kısıtlayıcıya döndüyse `commercial` ve `recommendation`'ı güncelle, `caveat` yaz. 12 aydır etkinlik yoksa `maintained: false`.
- Tahıl/emtia long/short kararlarına yardım eden yeni açık kaynak projeleri ara (pozisyon/COT, USDA verisi, hava ve ürün izleme, mevsimsellik ve spread, backtest, tahmin modelleri). Haftada en fazla 3 yeni proje ekle; yalnızca varlığını, lisansını ve son etkinliğini doğruladıklarını.
- `meta.projectsCheckedAt` = bugün.

### 8. Doğrula
```sh
node scripts/veri.mjs bicimle
node scripts/kontrol.mjs --sabah --linkler
node scripts/onizleme.mjs            # ekran görüntülerinin yolunu yazdırır
```
Hata varsa düzelt ve tekrar çalıştır. Uyarıları oku: kullanılmayan kaynağı sil, büyük değişimleri ikinci kaynakla doğrula. Açılmayan bağlantıda 403 çoğu zaman bot korumasıdır (CME, USDA gibi); WebFetch ile dene, gerçekten kırıksa yenisini bul. Ekran görüntülerine (`masaustu.png`, `mobil.png`) Read ile bak: boş bölüm, taşan metin, yanlış birim olmamalı.

### 9. Yayınla
```sh
git add data.js
git commit -m "Sabah bülteni: YYYY-AA-GG"   # gövdede: güncellenen göstergeler, gecikenler ve nedeni
git push origin main
```
- Ağ hatasında 2, 4, 8, 16 saniye bekleyerek en fazla 4 kez yeniden dene.
- `main` ilerlediği için push reddedilirse: `git pull --rebase origin main`, kontrolü yeniden çalıştır, sonra push.
- Kontrol geçmiyorsa ve düzeltemiyorsan **push etme**. Sayfa eskiyen veriyi zaten kırmızıyla gösterir; yanlış veri yayınlamaktan iyidir.

### 10. Son mesaj
Türkçe, en fazla 12 satır: güncellenen göstergeler (eski → yeni), gecikmiş olanlar ve gerekçesi, ulaşılamayan kaynaklar, bülten maddelerinin başlıkları, pazartesiyse proje taramasının sonucu, commit hash'i.

## Kaynak sırası

Önce `node scripts/cek.mjs --yaz` ile mekanik kaynaklar, sonra araştırma. Her satırda önce birincil kaynak denenir; yanıt vermezse ya da yeni veri yoksa yedeğe geçilir. Saatler TSİ. ABD saatleri 1 Kasım'dan, Avrupa saatleri 25 Ekim'den sonra TSİ'de bir saat ileri kayar. 06:29'da AMS uzlaşmaları, TCMB bülteni ve Konya borsası bir önceki iş gününü gösterir; bu normaldir.

| Veri | Sıklık | Birincil kaynak | Yedek | Ne zaman yayımlanır | Not |
|---|---|---|---|---|---|
| CBOT buğday, mısır, soya; KC buğday (`cbot_*`, `kc_wheat`, `chart`) | Her iş günü | `cek.mjs cbot`: USDA AMS raporları `ams_3223`, `ams_2886`, `ams_3100` (mnreports PDF, kamu verisi); en yeni tarihli rapor seçilir | Uzlaşma rakamını açıkça yazan kapanış haberleri | 21:45 / 22:10 / 23:21 | **CME sitesine otomatik istek atma**: koşulları yasaklıyor, IP engelli. Yahoo yalnız çapraz kontrol içindir, kaynak olarak gösterilmez (kişisel kullanım şartı). Göstergedeki `contract` ("Dec 26") okunacak vadeyi belirler |
| USD/TRY, EUR/TRY (`usdtry`) | Anlık + iş günü | `cek.mjs kur`: Coinbase piyasa kuru + TCMB `today.xml` | ECB `eurofxref-daily.xml`, Frankfurter, open.er-api.com | TCMB 15:30 | Sayfa açılışta ayrıca canlı kur çeker |
| Fon pozisyonları (`positioning`) | Haftalık | `cek.mjs cot`: CFTC Socrata API (disaggregated, `72hh-3qpy`) | cftc.gov COT sayfası | Cuma 22:30 (1 Kas'tan sonra 23:30) | Salı pozisyonları; Ekim yayınları 9, 16, 23, 30 Ekim |
| AB buğdayı (`eu_wheat`) | Haftalık | `cek.mjs ab`: AB Komisyonu tarım veri portalı API, Fransa değirmenlik buğdayı Rouen, limana teslim (CC BY 4.0) | Rusagrotrans'ın haftalık dünya fiyatları notundaki Fransız FOB (Interfax) | Hafta sonundan ~4 gün sonra | **Euronext verisini sayfada gösterme ve kaynak gösterme**: koşulları sistematik çekmeyi ve izinsiz yayını yasaklıyor; yalnız iç çapraz kontrol için bakılabilir |
| Rus buğdayı %12,5 FOB (`ru_fob`) | Haftalık | IKAR Baltık FOB (Vysotsk/Ust-Luga): pazartesi Reuters RU haberi (ru.themoscowtimes.com aynası) | Interfax (IKAR, SovEcon, Rusagrotrans); Novorossiysk için RGU/UkrAgroConsult nominal fiyatı | Pazartesi öğlen (önceki cuma fiyatı) | Novorossiysk'te Ağustos ortasından beri işlem yok; Novorossiysk rakamı yalnız "nominal" notuyla `sub`'da. Terminaller açılırsa göstergeyi Novorossiysk'e geri al |
| Konya borsası (`konya_wheat`) | Her iş günü | `cek.mjs konya`: Konya Ticaret Borsası günlük bülten JSON'u | — | Seans kapanışından sonra | TL/kg × 1000 = TL/t. TÜRİB ve Polatlı TB erişilemiyor |
| Rus ihracat vergisi (`ru_duty`) | Haftalık (şu an askıda) | Interfax, government.ru kararnameleri | tks.ru, ikar.ru basın listesi | Normalde cuma | mcx.gov.ru ve publication.pravo.gov.ru erişilemiyor. 31 Ara 2026'ya kadar sıfır; uzatma ya da erken bitişi izle |
| TMO fiyatları (`tmo_sell`) | Karar çıktıkça | tarimdanhaber.com TMO kategorisi | Bloomberg HT tarım, NTV, Dünya, AA English | Olay bazlı | tmo.gov.tr ve Ticaret Bakanlığı siteleri erişilemiyor. Değişiklik yoksa yalnız `checked` güncellenir |
| Arz ve talep (`supplyDemand`) | Aylık | USDA WASDE: `usda.gov/oce/commodity/wasde/wasdeAAYY.xml` (ör. `wasde1026.xml`), .txt, .pdf | DTN/Reuters özetleri; SovEcon/IKAR tahmin revizyonları | 2026: 9 Eki 19:00, 10 Kas ve 10 Ara 20:00 | `asOf` = rapor tarihi; yayından önce XML 302 döner |
| Rus ihracatı (`exports`) | 10 günlük / aylık | Rus Tahıl Birliği (grun.ru) | IKAR, SovEcon, Rusagrotrans (Interfax, Reuters) | Ay başı ve 10 günde bir | Liman (RGU) ve demiryolu dahil (IKAR) rakamları farklıdır; hangisi olduğunu `note`'ta yaz, alternatif tahmin `hi` |
| Politika (`policy`) ve takvim | Günlük tarama | Resmî Gazete `resmigazete.gov.tr/eskiler/YYYY/AA/YYYYAAGG.htm` (windows-1254), government.ru/news, tarimorman.gov.tr | Interfax, Türk haber siteleri | Resmî Gazete 00:00 | USDA NASS takvimi (Crop Progress pazartesi 23:00; ABD tatilinde salı), FAS ihracat satışları perşembe 15:30 |
| Hava (`risks`) | Günlük | NOAA CPC günlük yağış (kamu verisi), MGM (Konya) | Meteostat (CC BY 4.0, atıf) | — | Open-Meteo'nun ücretsiz API'si ticari kullanıma kapalı ve paylaşılan IP'de kota hatası veriyor: kullanma |

Erişilemeyen siteler (bu ortamdan): tmo.gov.tr, ticaret.gov.tr, mcx.gov.ru, publication.pravo.gov.ru, customs.gov.ru, turib.com.tr, polatlitb.org.tr, aa.com.tr/tr, stooq.com, mymarketnews.ams.usda.gov, apk-inform, zerno.ru. Bunlarda zaman kaybetme; yedeğe geç.

Bir veri için yukarıdakilerden daha güncel ya da daha birincil ve kullanım koşulları uygun bir kaynak bulursan kullan, `feeds` tablosuna ekle ve son mesajda belirt.
