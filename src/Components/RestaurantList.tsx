import type { Restaurant } from "../Interfaces/Restaurant";
import { getCategoryGradient } from "../utils/categoryStyle";

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RestaurantList({
  restaurants,
  selectedId,
  onSelect,
}: RestaurantListProps) {
  if (restaurants.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
        <p className="text-4xl">😕</p>
        <p className="mt-2 font-medium text-gray-600">Aramanıza uygun restoran yok</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {restaurants.map((r, i) => {
        const selected = selectedId === r.id;
        const gradient = getCategoryGradient(r.category);
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.id)}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`card-hover animate-fade-up overflow-hidden rounded-2xl text-left shadow-sm ring-1 transition ${
              selected
                ? "ring-2 ring-[#ff6000] ring-offset-2"
                : "ring-gray-100 hover:ring-orange-200"
            }`}
          >
            <div
              className={`bg-gradient-to-r ${gradient} flex items-center justify-between px-4 py-3`}
            >
              <span className="text-3xl drop-shadow-sm">{r.emoji}</span>
              <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                {r.rating > 0 ? `★ ${r.rating}` : "Yeni"}
              </span>
            </div>
            <div className="bg-white p-4">
              <h3 className="font-bold text-gray-900">{r.name}</h3>
              <p className="text-sm font-medium text-[#ff6000]">{r.category}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="rounded-lg bg-gray-50 px-2 py-1">🕐 {r.deliveryTime}</span>
                <span className="rounded-lg bg-gray-50 px-2 py-1">
                  Min. {r.minOrder} ₺
                </span>
                <span className="rounded-lg bg-gray-50 px-2 py-1">
                  {r.dishes.length} ürün
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
