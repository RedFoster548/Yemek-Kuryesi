import { useMemo, useState } from "react";
import type { Restaurant } from "../Interfaces/Restaurant";

const CATEGORY_ICONS: Record<string, string> = {
  Tümü: "🍽️",
  Burger: "🍔",
  Pizza: "🍕",
  Döner: "🥙",
  Sushi: "🍣",
  Kahvaltı: "🥐",
  Tatlı: "🍰",
  Kebap: "🍖",
  "Ev Yemekleri": "🍲",
  İtalyan: "🍝",
  Çin: "🥡",
  Deniz: "🐟",
  Köfte: "🧆",
  Tavuk: "🍗",
  Vegan: "🥗",
  Pide: "🫓",
  "Fast Food": "⚡",
};

interface CategoryFilterProps {
  categories: string[];
  restaurants: Restaurant[];
  selected: string;
  onSelect: (category: string) => void;
  onRestaurantSelect?: (restaurantId: string) => void;
}

export function CategoryFilter({
  categories,
  restaurants,
  selected,
  onSelect,
  onRestaurantSelect,
}: CategoryFilterProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const restaurantsByCategory = useMemo(() => {
    const map = new Map<string, Restaurant[]>();
    for (const r of restaurants) {
      const list = map.get(r.category) ?? [];
      list.push(r);
      map.set(r.category, list);
    }
    return map;
  }, [restaurants]);

  function handleRestaurantClick(restaurant: Restaurant) {
    onSelect(restaurant.category);
    onRestaurantSelect?.(restaurant.id);
    setOpenCategory(null);
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <h2 className="mb-4 text-base font-bold text-gray-900">Kategoriler</h2>
      <nav className="flex flex-wrap gap-2" aria-label="Yemek kategorileri">
        {categories.map((cat) => {
          const active = selected === cat;
          const isOpen = openCategory === cat;
          const categoryRestaurants =
            cat === "Tümü" ? [] : (restaurantsByCategory.get(cat) ?? []);
          const hasDropdown = categoryRestaurants.length > 0;

          return (
            <div
              key={cat}
              className="relative"
              onMouseEnter={() => hasDropdown && setOpenCategory(cat)}
              onMouseLeave={() => setOpenCategory(null)}
            >
              <button
                type="button"
                onClick={() => onSelect(cat)}
                aria-expanded={hasDropdown ? isOpen : undefined}
                aria-haspopup={hasDropdown ? "menu" : undefined}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                  active
                    ? "border-[#ff6000] bg-orange-50 font-semibold text-[#ff6000]"
                    : "border-gray-100 bg-gray-50/80 text-gray-700 hover:border-orange-200 hover:bg-orange-50/50"
                } ${isOpen && !active ? "border-orange-200 bg-orange-50/50" : ""}`}
              >
                <span className="text-base">{CATEGORY_ICONS[cat] ?? "🍴"}</span>
                <span className="leading-tight">{cat}</span>
                {hasDropdown && (
                  <span
                    className={`text-[10px] text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    ▼
                  </span>
                )}
              </button>

              {hasDropdown && isOpen && (
                <div className="absolute left-0 top-full z-40 pt-2">
                  <ul
                    role="menu"
                    className="max-h-64 min-w-[220px] overflow-y-auto rounded-xl border border-orange-100 bg-white py-1 shadow-lg shadow-orange-500/10 ring-1 ring-gray-100"
                  >
                    {categoryRestaurants.map((r) => (
                      <li key={r.id} role="none">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => handleRestaurantClick(r)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-orange-50 hover:text-[#ff6000]"
                        >
                          <span className="text-base">{r.emoji}</span>
                          <span className="min-w-0 flex-1 truncate font-medium">
                            {r.name}
                          </span>
                          <span className="shrink-0 text-xs text-amber-600">
                            {r.rating > 0 ? `★ ${r.rating.toFixed(1)}` : "Yeni"}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </section>
  );
}
