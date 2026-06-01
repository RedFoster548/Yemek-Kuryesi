# 🍕 Yemek Kuryesi

Yemek Sepeti tarzı online yemek sipariş uygulaması — React, TypeScript, Tailwind CSS.

## 📸 Proje Ekran Görüntüsü

<img src="https://github.com/user-attachments/assets/7c45385c-3aac-4ac6-9094-3ede9b610ff2" alt="Yemek Kuryesi Arayüzü" style="max-width: 100%; display: block; pointer-events: none;" />

---

## ✨ Özellikler

- 🍔 Restoran listesi ve kategori filtreleme
- 🍕 Öne çıkan yemekler ve menüden tek tıkla sepete ekleme
- 🔄 Aynı ürün tekrar eklenince sepet içinde adet artırma
- ⏱️ Sipariş onayı ve restorana özel dinamik tahmini teslimat süresi
- 💾 Sepet CRUD işlemleri ve verilerin `localStorage` üzerinde saklanması

## 🛠️ CRUD İşlemleri

| İşlem | Nasıl Yapılır? |
| :--- | :--- |
| **Ekle** | Menü veya öne çıkan yemekler kartındaki butonlara tıklayarak |
| **Listele** | Sağ panelde yer alan **Sepetim** alanından anlık takip ederek |
| **Güncelle** | Sepet içinde yer alan butonlarla **Adet / Not** değiştirerek |
| **Sil** | Sepetteki ürünü tamamen kaldırarak |

## 🚀 Çalıştırma

Lokal bilgisayarınızda projeyi ayağa kaldırmak için terminalde sırasıyla şu komutları çalıştırabilirsiniz:

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
npm install
npm run dev
