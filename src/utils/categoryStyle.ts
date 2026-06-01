const CATEGORY_GRADIENTS: Record<string, string> = {
  Burger: "from-amber-500 via-orange-500 to-orange-600",
  Pizza: "from-red-500 via-rose-500 to-pink-600",
  Döner: "from-yellow-500 via-amber-500 to-orange-500",
  Sushi: "from-cyan-500 via-teal-500 to-emerald-600",
  Kahvaltı: "from-amber-400 via-yellow-500 to-orange-400",
  Tatlı: "from-pink-400 via-rose-400 to-fuchsia-500",
  Kebap: "from-orange-600 via-red-600 to-red-700",
  "Ev Yemekleri": "from-lime-600 via-green-600 to-emerald-700",
  İtalyan: "from-green-500 via-emerald-500 to-teal-600",
  Çin: "from-red-600 via-orange-600 to-amber-600",
  Deniz: "from-blue-500 via-cyan-500 to-teal-600",
  Köfte: "from-stone-500 via-amber-700 to-orange-700",
  Tavuk: "from-yellow-400 via-amber-500 to-orange-500",
  Vegan: "from-green-400 via-lime-500 to-emerald-500",
  Pide: "from-amber-600 via-orange-600 to-red-600",
  "Fast Food": "from-violet-500 via-purple-500 to-fuchsia-600",
};

export function getCategoryGradient(category: string): string {
  return CATEGORY_GRADIENTS[category] ?? "from-[#ff6000] via-orange-500 to-amber-500";
}
