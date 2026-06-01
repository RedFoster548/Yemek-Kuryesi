import { useEffect, useState } from "react";
import {
  CATEGORY_EMOJIS,
  RESTAURANT_CATEGORY_OPTIONS,
} from "../data/restaurants";
import type { NewDishInput, NewRestaurantInput } from "../hooks/useRestaurants";
import type { MenuDish, Restaurant } from "../Interfaces/Restaurant";

type SellerTab = "restaurant" | "dish";

interface SellerPageProps {
  restaurants: Restaurant[];
  onAddRestaurant: (input: NewRestaurantInput) => Restaurant;
  onAddDish: (restaurantId: string, input: NewDishInput) => MenuDish | null;
  onViewShop: () => void;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-[#ff6000] focus:outline-none focus:ring-2 focus:ring-[#ff6000]/25";

const labelClass = "mb-1.5 block text-sm font-semibold text-gray-700";

export function SellerPage({
  restaurants,
  onAddRestaurant,
  onAddDish,
  onViewShop,
}: SellerPageProps) {
  const [tab, setTab] = useState<SellerTab>("restaurant");
  const [message, setMessage] = useState<string | null>(null);

  const [restaurantForm, setRestaurantForm] = useState({
    name: "",
    category: RESTAURANT_CATEGORY_OPTIONS[0] ?? "Burger",
    emoji: CATEGORY_EMOJIS[RESTAURANT_CATEGORY_OPTIONS[0] ?? "Burger"] ?? "🍽️",
    minOrder: 100,
    deliveryTime: "30-40 dk",
  });

  const [dishForm, setDishForm] = useState({
    restaurantId: restaurants[0]?.id ?? "",
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (restaurants.length === 0) {
      setDishForm((p) => ({ ...p, restaurantId: "" }));
      return;
    }
    const exists = restaurants.some((r) => r.id === dishForm.restaurantId);
    if (!exists) {
      setDishForm((p) => ({ ...p, restaurantId: restaurants[0].id }));
    }
  }, [restaurants, dishForm.restaurantId]);

  function showSuccess(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 4000);
  }

  function handleCategoryChange(category: string) {
    setRestaurantForm((prev) => ({
      ...prev,
      category,
      emoji: CATEGORY_EMOJIS[category] ?? prev.emoji,
    }));
  }

  function handleRestaurantSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!restaurantForm.name.trim()) {
      setMessage("Restoran adı zorunludur.");
      return;
    }

    const created = onAddRestaurant({
      name: restaurantForm.name,
      category: restaurantForm.category,
      emoji: restaurantForm.emoji,
      minOrder: restaurantForm.minOrder,
      deliveryTime: restaurantForm.deliveryTime,
    });

    setDishForm((prev) => ({ ...prev, restaurantId: created.id }));
    setRestaurantForm((prev) => ({
      ...prev,
      name: "",
      minOrder: 100,
      deliveryTime: "30-40 dk",
    }));
    setTab("dish");
    showSuccess(`"${created.name}" listeye eklendi. Şimdi menüye yemek ekleyebilirsiniz.`);
  }

  function handleDishSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dishForm.restaurantId) {
      setMessage("Önce bir restoran seçin veya yeni restoran açın.");
      return;
    }
    if (!dishForm.name.trim()) {
      setMessage("Yemek adı zorunludur.");
      return;
    }
    if (dishForm.price <= 0) {
      setMessage("Geçerli bir fiyat girin.");
      return;
    }

    const dishName = dishForm.name.trim();
    const restaurant = restaurants.find((r) => r.id === dishForm.restaurantId);
    const added = onAddDish(dishForm.restaurantId, {
      name: dishName,
      price: dishForm.price,
      description: dishForm.description,
    });

    if (!added) {
      setMessage("Restoran bulunamadı.");
      return;
    }

    setDishForm((prev) => ({
      ...prev,
      name: "",
      price: 0,
      description: "",
    }));
    showSuccess(
      `"${dishName}" ${restaurant?.name ?? "restoran"} menüsüne eklendi.`
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Satıcı Paneli</h1>
        <p className="mt-1 text-sm text-gray-500">
          Yeni restoran açın veya mevcut restoranınıza yemek ekleyin
        </p>
      </div>

      {message && (
        <div
          role="status"
          className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
        >
          {message}
        </div>
      )}

      <div className="mb-6 flex gap-2 rounded-2xl bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setTab("restaurant")}
          className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
            tab === "restaurant"
              ? "bg-white text-[#ff6000] shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          🏪 Yeni Restoran
        </button>
        <button
          type="button"
          onClick={() => setTab("dish")}
          className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
            tab === "dish"
              ? "bg-white text-[#ff6000] shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          🍽️ Yemek Ekle
        </button>
      </div>

      {tab === "restaurant" ? (
        <form
          onSubmit={handleRestaurantSubmit}
          className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900">Restoran bilgileri</h2>

          <div>
            <label className={labelClass} htmlFor="seller-name">
              Restoran adı
            </label>
            <input
              id="seller-name"
              type="text"
              required
              value={restaurantForm.name}
              onChange={(e) =>
                setRestaurantForm((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Örn. Lezzet Durağı"
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="seller-category">
                Kategori
              </label>
              <select
                id="seller-category"
                value={restaurantForm.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className={inputClass}
              >
                {RESTAURANT_CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="seller-emoji">
                İkon (emoji)
              </label>
              <input
                id="seller-emoji"
                type="text"
                maxLength={4}
                value={restaurantForm.emoji}
                onChange={(e) =>
                  setRestaurantForm((p) => ({ ...p, emoji: e.target.value }))
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="seller-min">
                Min. sipariş (₺)
              </label>
              <input
                id="seller-min"
                type="number"
                min={0}
                step={5}
                value={restaurantForm.minOrder}
                onChange={(e) =>
                  setRestaurantForm((p) => ({
                    ...p,
                    minOrder: Number(e.target.value) || 0,
                  }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="seller-delivery">
                Teslimat süresi
              </label>
              <input
                id="seller-delivery"
                type="text"
                value={restaurantForm.deliveryTime}
                onChange={(e) =>
                  setRestaurantForm((p) => ({
                    ...p,
                    deliveryTime: e.target.value,
                  }))
                }
                placeholder="30-40 dk"
                className={inputClass}
              />
            </div>
            {/* Puan alanı kaldırıldı — başlangıç puanı sistem tarafından atanır */}
          </div>

          <button
            type="submit"
            className="btn-primary w-full rounded-2xl py-3 font-bold text-white"
          >
            Restoranı yayınla
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleDishSubmit}
          className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900">Menüye yemek ekle</h2>

          {restaurants.length === 0 ? (
            <p className="text-sm text-gray-500">
              Henüz restoran yok. Önce &quot;Yeni Restoran&quot; sekmesinden bir
              restoran ekleyin.
            </p>
          ) : (
            <>
              <div>
                <label className={labelClass} htmlFor="seller-restaurant">
                  Restoran
                </label>
                <select
                  id="seller-restaurant"
                  value={dishForm.restaurantId}
                  onChange={(e) =>
                    setDishForm((p) => ({ ...p, restaurantId: e.target.value }))
                  }
                  className={inputClass}
                >
                  {restaurants.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.emoji} {r.name} ({r.dishes.length} yemek)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="seller-dish-name">
                  Yemek adı
                </label>
                <input
                  id="seller-dish-name"
                  type="text"
                  required
                  value={dishForm.name}
                  onChange={(e) =>
                    setDishForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Örn. Izgara Köfte"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="seller-dish-price">
                  Fiyat (₺)
                </label>
                <input
                  id="seller-dish-price"
                  type="number"
                  min={1}
                  step={1}
                  required
                  value={dishForm.price || ""}
                  onChange={(e) =>
                    setDishForm((p) => ({
                      ...p,
                      price: Number(e.target.value) || 0,
                    }))
                  }
                  placeholder="199"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="seller-dish-desc">
                  Açıklama
                </label>
                <textarea
                  id="seller-dish-desc"
                  rows={3}
                  value={dishForm.description}
                  onChange={(e) =>
                    setDishForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Kısa menü açıklaması..."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full rounded-2xl py-3 font-bold text-white"
              >
                Yemeği menüye ekle
              </button>
            </>
          )}
        </form>
      )}

      <div className="mt-6 rounded-2xl bg-orange-50/80 p-4 text-center ring-1 ring-orange-100">
        <p className="text-sm text-gray-600">
          Eklediğiniz restoran ve yemekler ana sayfada hemen görünür.
        </p>
        <button
          type="button"
          onClick={onViewShop}
          className="mt-3 text-sm font-bold text-[#ff6000] hover:underline"
        >
          Alışveriş sayfasına git →
        </button>
      </div>
    </main>
  );
}
