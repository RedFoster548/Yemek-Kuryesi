import { RESTAURANTS } from "../data/restaurants";

export function parseDeliveryTime(text: string): { min: number; max: number } {
  const range = text.match(/(\d+)\s*-\s*(\d+)/);
  if (range) {
    return { min: Number(range[1]), max: Number(range[2]) };
  }
  const single = text.match(/(\d+)/);
  if (single) {
    const n = Number(single[1]);
    return { min: n, max: n + 10 };
  }
  return { min: 25, max: 35 };
}

export function estimateDeliveryMinutes(
  restaurantNames: string[]
): { min: number; max: number } {
  const unique = [...new Set(restaurantNames)];
  let min = 0;
  let max = 0;

  for (const name of unique) {
    const restaurant = RESTAURANTS.find((r) => r.name === name);
    const times = parseDeliveryTime(restaurant?.deliveryTime ?? "25-35 dk");
    min = Math.max(min, times.min);
    max = Math.max(max, times.max);
  }

  if (min === 0) return { min: 25, max: 35 };
  return { min, max };
}
