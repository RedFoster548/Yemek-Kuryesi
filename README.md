# Yemek Kuryesi

Yemek Sepeti tarzı online yemek sipariş uygulaması — React, TypeScript, Tailwind CSS.

## Özellikler

- Restoran listesi ve kategori filtreleme
- Öne çıkan yemekler ve menüden sepete ekle
- Aynı ürün tekrar eklenince adet artar
- Sipariş onayı ve tahmini teslimat süresi
- Sepet CRUD (localStorage)

## CRUD işlemleri

| İşlem | Nasıl |
|--------|--------|
| **Ekle** | Menü veya öne çıkan yemeklere tıkla |
| **Listele** | Sağ panel **Sepetim** |
| **Güncelle** | Sepette **Güncelle** → adet / not |
| **Sil** | Sepette **Sil** |

## Çalıştırma

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
npm.cmd run dev
```

Tarayıcı: http://localhost:5173

## Teslim formu

1. **GitHub** — public repo linki
2. **Netlify** — canlı site linki (`netlify.toml` build ayarlarını içerir)
3. **Ekran görüntüsü** — formdaki **Dosya ekle** ile yükle (repoda klasör gerekmez)
