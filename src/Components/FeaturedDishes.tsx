import { FEATURED_DISHES } from "../data/featuredDishes";

interface FeaturedDishesProps {
  onAddToCart: (restaurantName: string, dishName: string, price: number) => void;
}

export function FeaturedDishes({ onAddToCart }: FeaturedDishesProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-orange-500/10 ring-1 ring-orange-100">
      <div className="bg-gradient-to-r from-[#ff6000] to-orange-400 px-5 py-4">
        <h2 className="text-lg font-bold text-white">⭐ Öne Çıkan Yemekler</h2>
        <p className="text-sm text-orange-100">Tek tıkla sepete ekle</p>
      </div>

      <ul className="max-h-[360px] space-y-1 overflow-y-auto p-2">
        {FEATURED_DISHES.map((dish, i) => (
          <li key={dish.id}>
            <button
              type="button"
              onClick={() =>
                onAddToCart(dish.restaurantName, dish.dishName, dish.price)
              }
              className="card-hover group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 text-2xl transition group-hover:scale-110">
                {dish.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-gray-900">{dish.dishName}</p>
                  <span className="rounded-full bg-[#ff6000]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#ff6000]">
                    {dish.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{dish.restaurantName}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-lg font-extrabold text-[#ff6000]">{dish.price} ₺</p>
                <p className="text-xs font-semibold text-gray-400 group-hover:text-[#ff6000]">
                  + Ekle
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
