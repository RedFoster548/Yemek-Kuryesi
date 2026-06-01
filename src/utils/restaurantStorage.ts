import type { Restaurant } from "../Interfaces/Restaurant";

const STORAGE_KEY = "yemek-kuryesi-restaurants";

export function loadRestaurants(fallback: Restaurant[]): Restaurant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Restaurant[];
    if (!Array.isArray(parsed) || parsed.length === 0) return fallback;
    // Enforce maximum of 65 restaurants to match UI requirement
    return parsed.length > 65 ? parsed.slice(0, 65) : parsed;
  } catch {
    return fallback;
  }
}

export function saveRestaurants(restaurants: Restaurant[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
}
