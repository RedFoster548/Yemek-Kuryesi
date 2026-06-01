import type { Restaurant } from "../Interfaces/Restaurant";

export function shuffleRestaurants(list: Restaurant[]): Restaurant[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Kategori görünümü: en yüksek puan üstte, sonra isim */
export function sortByCategoryView(list: Restaurant[]): Restaurant[] {
  return [...list].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return a.name.localeCompare(b.name, "tr");
  });
}

export function orderByIdList(
  list: Restaurant[],
  idOrder: string[]
): Restaurant[] {
  const index = new Map(idOrder.map((id, i) => [id, i]));
  return [...list].sort(
    (a, b) => (index.get(a.id) ?? 0) - (index.get(b.id) ?? 0)
  );
}
