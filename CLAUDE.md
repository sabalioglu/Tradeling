# Türkiye Hububat Masası

Statik sabah bülteni: `index.html` (yapı ve stil), `app.js` (çizim), `tazelik.js` (tazelik kuralları), `data.js` (günlük veri). Sunucu ya da derleme adımı yok. Sayfa dili Türkçe.

- Günlük güncelleme prosedürü: `.claude/skills/sabah-guncellemesi/SKILL.md`. GitHub Actions'taki "Sabah bülteni" iş akışı bunu her gün 06:29 TSİ'de çalıştırır ve `main`'e push eder; "Veri çek" hafta içi üç kez yapay zekâsız çekim yapar; "Yayın" sayfayı GitHub Pages'e (canlı adres `https://trade.agentized.io`, DNS Hostinger'da) ya da Cloudflare Workers'a (`wrangler.json`) gönderir. Yedek: claude.ai rutini 08:13'te, bülten yayınlanmadıysa.
- Sayfa dış kaynak yüklemez: yazı tipleri `fonts/`'ta; `index.html`'deki CSP yalnızca canlı kur servislerine (Coinbase, ExchangeRate-API) bağlantıya izin verir. Yeni bir dış kaynak eklersen CSP'yi ve README'deki "Gizlilik" bölümünü güncelle. Yayına giden dosya listesi `yayin.yml`'de, iki işte de aynı.
- Veri yalnızca `data.js`'te durur. Sayılar nokta ondalıklı JSON sayısıdır; Türkçe biçimlendirme ve hesaplanan değerler ($/t, TL→$, % değişim, fiyat merdiveni) `app.js`'te üretilir. Metne hesaplanmış rakam yazacaksan ≈ ile işaretle.
- `data.js`'i değiştirdikten sonra: `node scripts/veri.mjs bicimle && node scripts/kontrol.mjs` (rutin `--sabah` ile çalıştırır). Görünümü `node scripts/onizleme.mjs` ile kontrol et.
- Tazelik kuralları tek yerde, `tazelik.js`'te; sayfa ve `scripts/kontrol.mjs` aynı dosyayı kullanır. Kuralı değiştirirsen README'deki tabloyu da güncelle.
- Otomasyon için n8n ya da benzeri bir araç kullanılmıyor; otomasyon Claude rutinidir.
