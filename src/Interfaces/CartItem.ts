export interface CartItem {
  id: string;
  restaurantName: string;
  dishName: string;
  price: number;
  quantity: number;
  note: string;
  createdAt: string;
}

export interface CartItemFormData {
  restaurantName: string;
  dishName: string;
  price: number;
  quantity: number;
  note: string;
}
