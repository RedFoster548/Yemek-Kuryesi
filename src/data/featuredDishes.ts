export interface FeaturedDish {
  id: string;
  restaurantName: string;
  emoji: string;
  dishName: string;
  price: number;
  badge: string;
}

export const FEATURED_DISHES: FeaturedDish[] = [
  { id: "f1", restaurantName: "Burger House", emoji: "🍔", dishName: "Double Smash Burger", price: 229, badge: "Çok satan" },
  { id: "f2", restaurantName: "Pizza Roma", emoji: "🍕", dishName: "Karışık Pizza", price: 249, badge: "Favori" },
  { id: "f3", restaurantName: "Dönerci Usta", emoji: "🥙", dishName: "İskender", price: 265, badge: "Popüler" },
  { id: "f4", restaurantName: "Kebapçı Halil", emoji: "🍖", dishName: "Adana Kebap", price: 245, badge: "Çok satan" },
  { id: "f5", restaurantName: "Kahvaltı Evi", emoji: "🥐", dishName: "Serpme Kahvaltı", price: 320, badge: "2 kişilik" },
  { id: "f6", restaurantName: "Tatlı Dünyası", emoji: "🍰", dishName: "Künefe", price: 185, badge: "Sıcak" },
  { id: "f7", restaurantName: "Balık Evi", emoji: "🐟", dishName: "Izgara Levrek", price: 285, badge: "Taze" },
  { id: "f8", restaurantName: "Fast Bite", emoji: "⚡", dishName: "Menü 1 (Burger + Patates)", price: 199, badge: "Hızlı" },
  { id: "f9", restaurantName: "Makarna & İtalyan", emoji: "🍝", dishName: "Lazanya", price: 225, badge: "Yeni" },
  { id: "f10", restaurantName: "Vegan Lezzet", emoji: "🥗", dishName: "Buddha Bowl", price: 175, badge: "Sağlıklı" },
];
