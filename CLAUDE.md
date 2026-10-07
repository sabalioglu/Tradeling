# Türkiye Hububat Masası

Statik sabah bülteni: `index.html` (yapı ve stil), `app.js` (çizim), `tazelik.js` (tazelik kuralları), `data.js` (günlük veri). Sunucu ya da derleme adımı yok. Sayfa dili Türkçe.

- Günlük güncelleme prosedürü: `.claude/skills/sabah-guncellemesi/SKILL.md`. GitHub Actions'taki "Sabah bülteni" iş akışı bunu her gün 06:29 TSİ'de çalıştırır ve `main`'e push eder; "Veri çek" hafta içi üç kez yapay zekâsız çekim yapar; "Yayın" sayfayı Cloudflare Workers'a (`wrangler.json`) ya da GitHub Pages'e gönderir. Yedek: claude.ai rutini 08:13'te, bülten yayınlanmadıysa.
- Veri yalnızca `data.js`'te durur. Sayılar nokta ondalıklı JSON sayısıdır; Türkçe biçimlendirme ve hesaplanan değerler ($/t, TL→$, % değişim, fiyat merdiveni) `app.js`'te üretilir. Metne hesaplanmış rakam yazacaksan ≈ ile işaretle.
- `data.js`'i değiştirdikten sonra: `node scripts/veri.mjs bicimle && node scripts/kontrol.mjs` (rutin `--sabah` ile çalıştırır). Görünümü `node scripts/onizleme.mjs` ile kontrol et.
- Tazelik kuralları tek yerde, `tazelik.js`'te; sayfa ve `scripts/kontrol.mjs` aynı dosyayı kullanır. Kuralı değiştirirsen README'deki tabloyu da güncelle.
- Otomasyon için n8n ya da benzeri bir araç kullanılmıyor; otomasyon Claude rutinidir.
