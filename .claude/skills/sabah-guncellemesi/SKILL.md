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
5. **Kaynaksız cümle yok.** Özet, risk ve politika metnindeki her iddia `src` ile bir `refs` kaydına bağlanır. `refs[].published` kaynağın yayın tarihidir. Özette yayın tarihi bilinmeyen ya da 14 günden eski haber kaynağı kullanma (yapısal bilgi için resmi sayfalar hariç).
6. **Hesaplamayı sayfaya bırak.** $/t, TL→$, % değişim ve fiyat merdiveni `app.js`'te hesaplanır. Sen ham değeri, birimi ve `base`'i gir. Metinde hesaplanmış rakam kullanırsan ≈ ile işaretle.
7. **Yalnızca bu repo, yalnızca `data.js`.** `index.html`, `app.js`, `tazelik.js`, betikler ve bu dosya rutin tarafından değiştirilmez. Bir hata görürsen son mesajda bildir. PR açma, zorla push etme, doğrulamayı atlama ya da gevşetme.
8. **İşlem tavsiyesi yok.** Bülten bilgi verir; "al" ya da "sat" demez. Long/short açısından önemli gelişmeyi "Türkiye etkisi" ve risk metnine yansıt.
9. **Başka depoya dokunma.** Açık kaynak taramasında yalnızca herkese açık web kaynaklarını kullan (WebSearch, WebFetch, pypi.org JSON, repos.ecosyste.ms). Başka depolar için `mcp__github__*` araçlarını, `gh`'yi ya da `git clone`'u kullanma.

## Adımlar

### 0. Hazırlık
- Çalışma dizininde repo yoksa `add_repo` ile ekle (owner `sabalioglu`, repo `Tradeling`, access `push`) ve verilen komutla klonla.
- `git checkout main && git pull origin main`
- Bugünün TSİ tarihi ve günü: `TZ=Europe/Istanbul date`. Hafta sonu ya da ABD/Avrupa/Rusya/Türkiye tatili mi, not al.

### 1. Durumu gör
`node scripts/kontrol.mjs` → hangi göstergeler eski, hangi uyarılar var.

### 2. Mekanik veriler
`node scripts/cek.mjs` API'si olan kaynakları çeker ve önerilen değerleri yazdırır. `node scripts/cek.mjs --yaz` aynı değerleri `data.js`'e işler. Çıktıyı mantık açısından kontrol et; bir kaynak yanıt vermezse aşağıdaki yedeğe geç.

### 3. Piyasa göstergeleri
Her gösterge için kaynak sırası, yayın saati (TSİ) ve notlar aşağıdaki "Kaynak sırası" bölümünde. Her değer için: en son yayını bul, tarihini doğrula, ikinci kaynakla karşılaştır, `value`, `asOf`, `asOfNote`, `checked`, `src` ve gerekiyorsa `base`'i yaz.

- CBOT için `base` = bir önceki uzlaşma; `base.label` = "6 Eki uzlaşmasına göre" gibi. `asOfNote` = "uzlaşma" (seans içi fiyat yalnızca uzlaşma yoksa, "seans içi" notuyla).
- **Kontrat devri.** İlk ihbar gününden (FND, kontrat ayından önceki ayın son iş günü) en az 3 iş günü önce bir sonraki kontrata geç: soya Kas-26 → Oca-27 (FND 30 Eki 2026), buğday ve mısır Ara-26 → Mar-27 (FND 30 Kas 2026). Devirde `label`, `base`, `chart.title`, `chart.contract` güncellenir; `chart.points` yeni kontratın son 20–30 iş günlük uzlaşmalarıyla yeniden başlatılır ve özet mesajında belirtilir.

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
- `meta`: `bulletinDate` bugün, `generatedAt` şimdi (`+03:00`), `generatedBy` "Claude rutini".

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

Önce `node scripts/cek.mjs` ile mekanik kaynaklar, sonra araştırma. Her satırda soldaki kaynak tercih edilir; yanıt vermezse ya da yeni veri yoksa sağdakine geç. Saatler TSİ.

| Veri | Sıklık | Birincil kaynak | Yedek | Ne zaman yayımlanır | Not |
|---|---|---|---|---|---|
| CBOT buğday, mısır, soya (`cbot_*`, `chart`) | Her iş günü | `cek.mjs cbot`: USDA AMS günlük tahıl raporu (`ams.usda.gov/mnreports/ams_3100.pdf`, kamu verisi) | Uzlaşma rakamını açıkça yazan kapanış haberleri (Reuters, DTN, Brownfield, Successful Farming) | Uzlaşma 21:20 TSİ sonrası (ABD kış saatinde 22:20); AMS raporu ABD akşamı | **CME sitesine otomatik istek atma**: kullanım koşulları yasaklıyor ve IP engelliyor. Göstergedeki `contract` alanı ("Dec 26") okunacak vadeyi belirler |
| USD/TRY, EUR/TRY (`usdtry`) | Anlık + iş günü | `cek.mjs kur`: Coinbase piyasa kuru + TCMB `today.xml` | open.er-api.com | TCMB 15:30 | Sayfa açılışta ayrıca canlı kur çeker |
| Fon pozisyonları (`positioning`) | Haftalık | `cek.mjs cot`: CFTC Socrata API (disaggregated, `72hh-3qpy`) | cftc.gov COT sayfası | Cuma 15:30 ET (22:30, kışın 23:30 TSİ) | Salı pozisyonları; tatil haftasında yayın kayar |
| AB buğdayı (`eu_wheat`) | Her iş günü | Euronext değirmenlik buğday (vadeli, ön ay) uzlaşmasını yazan haberler: Reuters "European wheat", Agritel/Argus özetleri, Terre-net, FranceAgriMer | AB Komisyonu tarım veri portalı (haftalık FOB Rouen) | Euronext kapanışı 18:30 CET (19:30 TSİ) | Euronext sitesine toplu/otomatik istek atma. €/t veri için `unit: "€/t"` ve `eur: true` kullan; $/t'yi sayfa hesaplar |
| Rus buğdayı %12,5 FOB (`ru_fob`) | Haftalık | IKAR / SovEcon haftalık fiyatı (Interfax, Reuters üzerinden) | Rusagrotrans, APK-Inform, UkrAgroConsult, zerno.ru | Genelde pazartesi–salı | Aralık verilmişse orta noktayı yaz, aralığı `sub`'a ekle; işlem azsa "nominal" notu |
| Rus ihracat vergisi (`ru_duty`) | Haftalık (şu an askıda) | Rusya Tarım Bakanlığı duyurusu (mcx.gov.ru), hükümet kararnamesi (government.ru) | Interfax, TASS | Normalde cuma | 31 Ara 2026'ya kadar sıfır kararı var; uzatma ya da erken bitişi izle |
| TMO fiyatları (`tmo_sell`) | Karar çıktıkça | tmo.gov.tr duyuruları | AA, Resmî Gazete, Ticaret Bakanlığı | Olay bazlı | Değişiklik yoksa yalnız `checked` güncellenir |
| Arz ve talep (`supplyDemand`) | Aylık | USDA WASDE (usda.gov/oce/commodity/wasde) | DTN/Reuters WASDE özetleri; SovEcon/IKAR tahmin revizyonları | WASDE günü 19:00 (kışın 20:00) | `asOf` = rapor tarihi |
| Rus ihracatı (`exports`) | Aylık / haftalık tahmin | Rus Tahıl Birliği, Rusagrotrans, SovEcon | Interfax, UkrAgroConsult | Ay başı ve hafta içi | Tahminleri `estimate: true`, alternatif tahmini `hi` ile göster |
| Politika (`policy`) ve takvim | Günlük tarama | Resmî Gazete (resmigazete.gov.tr), TMO, Ticaret Bakanlığı; government.ru, mcx.gov.ru; USDA ve CME rapor takvimleri | AA, Interfax, Reuters | — | Yalnız son 90 gün |

Bir veri için yukarıdakilerden daha güncel ya da daha birincil ve kullanım koşulları uygun bir kaynak bulursan kullan, `feeds` tablosuna ekle ve son mesajda belirt.
