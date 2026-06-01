export interface MenuDish {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  // `rating` is the current average (0 if no ratings yet)
  rating: number;
  // how many customer ratings contributed to the average
  ratingCount: number;
  minOrder: number;
  deliveryTime: string;
  emoji: string;
  dishes: MenuDish[];
}
