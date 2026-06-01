export interface PlacedOrder {
  id: string;
  totalPrice: number;
  itemCount: number;
  deliveryMin: number;
  deliveryMax: number;
  placedAt: string;
}
