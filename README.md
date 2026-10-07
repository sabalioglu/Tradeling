# Türkiye Hububat Masası

Türkiye'deki bir hububat ticaret masası için hazırlanmış sabah bülteni dashboard'u. Tek bir HTML dosyasıdır; sunucu veya kurulum gerektirmez.

**Durum:** Prototip. Veriler canlı değildir; aşağıdaki tarihlerde yayımlanmış kaynaklardan elle derlenmiştir.

## Nasıl açılır

- `index.html` dosyasını tarayıcıda açın.
- Ya da GitHub Pages'i açın: *Settings → Pages → Branch: main / root*. Sayfa birkaç dakika içinde yayına çıkar.

## İçerik

| Bölüm | Ne gösteriyor |
|---|---|
| Fiyat şeridi | CBOT buğday, mısır, soya; Rus ve AB buğdayı; Rus ihracat vergisi; USD/TRY; TMO satış fiyatı |
| Bugünün özeti | Üç madde ve her biri için "Türkiye etkisi" |
| Risk radarı | Lojistik, hava, politika ve fiyat riskleri, seviye etiketiyle |
| CBOT grafiği | Aralık 2026 buğday kontratının 2026 seyri |
| Arz ve talep | USDA WASDE Eylül özetleri |
| Rusya ihracatı ve fiyat merdiveni | Aylık ihracat çöküşü; $/t karşılaştırması |
| Politika takibi ve takvim | Türkiye ve Karadeniz kararları; WASDE ve USDA rapor saatleri (TSİ) |
| Veri kaynakları | 12 kaynak: kullanım durumu, erişim yöntemi, maliyet |
| Akış | Canlı sürüm için önerilen otomasyon (topla → normalize et → yorumla → dağıt) |

## Veri tarihleri

| Veri | Tarih |
|---|---|
| CBOT fiyatları | 30 Eylül 2026, seans içi (Reuters); seri USDA AMS uzlaşma fiyatlarından |
| Rus ve AB buğdayı FOB | Eylül 2026 sonu |
| Rus ihracat vergisi | 19–22 Eylül 2026 kararnamesi |
| USD/TRY, EUR/TRY | 2 Ekim 2026, 09:29 |
| TMO fiyatları | Haziran 2026 (alım), 1 Ekim 2026 (satış) |
| WASDE | 11 Eylül 2026 |

Tüm kaynak linkleri sayfanın altında numaralı olarak listelenir; her rakamın yanında kaynak numarası vardır.

## Yol haritası

1. Verileri `index.html` içinden ayrı bir `data.json` dosyasına taşımak (veri sözleşmesi sayfada tanımlı).
2. Her iş günü 07:30'da çalışan zamanlanmış bir güncelleme ile `data.json`'ı yenilemek.
3. Açık kaynakların yanına lisanslı veri eklemek (Databento ile CBOT, Euronext).

## Uyarı

Bu sayfa işlem kararı için kullanılmamalıdır. Hesaplanan değerler sayfada ≈ ile işaretlidir.
