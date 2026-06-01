import { useState } from "react";
import type { Restaurant } from "../Interfaces/Restaurant";
import { getCategoryGradient } from "../utils/categoryStyle";

interface MenuPanelProps {
  restaurant: Restaurant | null;
  onAddToCart: (
    restaurantName: string,
    dishName: string,
    price: number
  ) => void;
  onRateRestaurant?: (restaurantId: string, value: number) => void;
  onChangeRestaurantVote?: (restaurantId: string, oldValue: number, newValue: number) => void;
  onRemoveRestaurantVote?: (restaurantId: string, oldValue: number) => void;
}

export function MenuPanel({ restaurant, onAddToCart, onRateRestaurant, onChangeRestaurantVote, onRemoveRestaurantVote }: MenuPanelProps) {
  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-white/60 p-12 text-center backdrop-blur-sm">
        <p className="animate-float text-6xl">🍽️</p>
        <p className="mt-4 text-lg font-bold text-gray-800">
          Menüyü görmek için restoran seçin
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Yukarıdan bir restorana tıklayın
        </p>
      </div>
    );
  }

  const gradient = getCategoryGradient(restaurant.category);

  const [selectedRating, setSelectedRating] = useState<number>(
    restaurant.rating > 0 ? Math.round(restaurant.rating) : 5
  );
  const VOTE_STORAGE_KEY = "yemek-kuryesi-user-ratings";
  const [voted, setVoted] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem(VOTE_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, number>) : {};
    } catch {
      return {};
    }
  });
  const [message, setMessage] = useState<string | null>(null);
  const hasVoted = Boolean(voted[restaurant.id]);
  const userVote = voted[restaurant.id] ?? null;
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-200/60 ring-1 ring-gray-100">
      <div className={`bg-gradient-to-r ${gradient} px-5 py-5`}>
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-sm">
            {restaurant.emoji}
          </span>
          <div className="text-white">
            <h2 className="text-xl font-extrabold">{restaurant.name}</h2>
            <p className="text-sm text-white/90">
              {restaurant.dishes.length} lezzet · {restaurant.rating > 0 ? `★ ${restaurant.rating}` : "Yeni"}
            </p>
            {onRateRestaurant && (
              <div className="mt-2 flex items-center gap-3">
                <label className="text-sm">Puan ver:</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseEnter={() => setHoveredStar(s)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={() => {
                        const already = hasVoted && userVote !== null;
                        if (!already) {
                          // first time vote
                          setSelectedRating(s);
                          onRateRestaurant?.(restaurant.id, s);
                          const next = { ...voted, [restaurant.id]: s };
                          setVoted(next);
                          try {
                            localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(next));
                          } catch {}
                          setMessage("Oy için teşekkürler!");
                          window.setTimeout(() => setMessage(null), 3000);
                          return;
                        }
                        // change existing vote
                        const old = userVote as number;
                        if (old === s) return;
                        setSelectedRating(s);
                        onChangeRestaurantVote?.(restaurant.id, old, s);
                        const next = { ...voted, [restaurant.id]: s };
                        setVoted(next);
                        try {
                          localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(next));
                        } catch {}
                        setMessage("Oy güncellendi.");
                        window.setTimeout(() => setMessage(null), 3000);
                      }}
                      aria-label={`${s} yıldız`}
                      className={`text-2xl leading-none transition-colors ${
                        s <= (hoveredStar ?? (userVote ?? selectedRating))
                          ? "text-yellow-300"
                          : "text-white/70"
                      } hover:text-yellow-300`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {message && (
                  <div className="ml-3 rounded-md bg-white/10 px-3 py-1 text-sm text-white/90">
                    {message}
                  </div>
                )}
                {hasVoted && (
                  <button
                    type="button"
                    onClick={() => {
                      const old = userVote as number;
                      onRemoveRestaurantVote?.(restaurant.id, old);
                      const next = { ...voted };
                      delete next[restaurant.id];
                      setVoted(next);
                      try {
                        localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(next));
                      } catch {}
                      setMessage("Oyunuz kaldırıldı.");
                      window.setTimeout(() => setMessage(null), 3000);
                    }}
                    className="ml-3 rounded-md bg-white/20 px-3 py-1 text-sm font-semibold text-white"
                  >
                    Oyumu geri al
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ul className="max-h-[420px] divide-y divide-gray-50 overflow-y-auto p-2">
        {restaurant.dishes.map((dish) => (
          <li
            key={dish.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 transition hover:bg-orange-50/80"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900">{dish.name}</p>
              <p className="text-sm text-gray-500">{dish.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-extrabold text-[#ff6000]">
                {dish.price} ₺
              </span>
              <button
                type="button"
                onClick={() =>
                  onAddToCart(restaurant.name, dish.name, dish.price)
                }
                className="btn-primary rounded-full px-5 py-2.5 text-sm font-bold text-white"
              >
                + Sepete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
