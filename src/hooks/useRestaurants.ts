import { useCallback, useEffect, useMemo, useState } from "react";
import { RESTAURANTS as DEFAULT_RESTAURANTS } from "../data/restaurants";
import type { MenuDish, Restaurant } from "../Interfaces/Restaurant";
import { slugify } from "../utils/slugify";
import { loadRestaurants, saveRestaurants } from "../utils/restaurantStorage";

export interface NewRestaurantInput {
  name: string;
  category: string;
  emoji: string;
  minOrder: number;
  deliveryTime: string;
}

export interface NewDishInput {
  name: string;
  price: number;
  description: string;
}

function nextRestaurantId(list: Restaurant[]): string {
  const numeric = list
    .map((r) => Number.parseInt(r.id, 10))
    .filter((n) => !Number.isNaN(n));
  const max = numeric.length > 0 ? Math.max(...numeric) : 0;
  return String(max + 1);
}

export function buildCategories(restaurants: Restaurant[]): string[] {
  return ["Tümü", ...new Set(restaurants.map((r) => r.category))];
}

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() =>
    loadRestaurants(DEFAULT_RESTAURANTS)
  );

  useEffect(() => {
    saveRestaurants(restaurants);
  }, [restaurants]);

  const categories = useMemo(
    () => buildCategories(restaurants),
    [restaurants]
  );

  const persist = useCallback((next: Restaurant[]) => {
    setRestaurants(next);
  }, []);

  const addRestaurant = useCallback(
    (input: NewRestaurantInput): Restaurant => {
      const name = input.name.trim();
      const category = input.category.trim();
      const restaurant: Restaurant = {
        id: nextRestaurantId(restaurants),
        name,
        category,
        // No customer ratings yet
        rating: 0,
        ratingCount: 0,
        minOrder: Math.max(0, input.minOrder),
        deliveryTime: input.deliveryTime.trim() || "30-45 dk",
        emoji: input.emoji.trim() || "🍽️",
        dishes: [],
      };
      persist([restaurant, ...restaurants]);
      return restaurant;
    },
    [restaurants, persist]
  );

  const addDish = useCallback(
    (restaurantId: string, input: NewDishInput): MenuDish | null => {
      const target = restaurants.find((r) => r.id === restaurantId);
      if (!target) return null;

      const dish: MenuDish = {
        id: `${slugify(target.name)}-${target.dishes.length + 1}-${Date.now()}`,
        name: input.name.trim(),
        price: Math.max(1, input.price),
        description: input.description.trim() || "Lezzetli seçenek",
      };

      persist(
        restaurants.map((r) =>
          r.id === restaurantId ? { ...r, dishes: [...r.dishes, dish] } : r
        )
      );
      return dish;
    },
    [restaurants, persist]
  );

  const rateRestaurant = useCallback(
    (restaurantId: string, value: number) => {
      const clamped = Math.min(5, Math.max(1, Math.round(value * 10) / 10));
      persist(
        restaurants.map((r) => {
          if (r.id !== restaurantId) return r;
          const prevCount = r.ratingCount ?? 0;
          const prevAvg = r.rating ?? 0;
          const total = prevAvg * prevCount + clamped;
          const nextCount = prevCount + 1;
          const nextAvg = Math.round((total / nextCount) * 10) / 10;
          return { ...r, rating: nextAvg, ratingCount: nextCount };
        })
      );
    },
    [restaurants, persist]
  );

  const changeRestaurantVote = useCallback(
    (restaurantId: string, oldValue: number, newValue: number) => {
      const clamped = Math.min(5, Math.max(1, Math.round(newValue * 10) / 10));
      persist(
        restaurants.map((r) => {
          if (r.id !== restaurantId) return r;
          const prevCount = r.ratingCount ?? 0;
          const prevAvg = r.rating ?? 0;
          if (prevCount === 0) {
            // no previous ratings, treat as new
            const total = clamped;
            return { ...r, rating: Math.round(total * 10) / 10, ratingCount: 1 };
          }
          const total = prevAvg * prevCount;
          const nextTotal = total - oldValue + clamped;
          const nextAvg = Math.round((nextTotal / prevCount) * 10) / 10;
          return { ...r, rating: nextAvg, ratingCount: prevCount };
        })
      );
    },
    [restaurants, persist]
  );

  const removeRestaurantVote = useCallback(
    (restaurantId: string, oldValue: number) => {
      persist(
        restaurants.map((r) => {
          if (r.id !== restaurantId) return r;
          const prevCount = r.ratingCount ?? 0;
          const prevAvg = r.rating ?? 0;
          if (prevCount <= 1) {
            return { ...r, rating: 0, ratingCount: 0 };
          }
          const total = prevAvg * prevCount;
          const nextCount = prevCount - 1;
          const nextTotal = total - oldValue;
          const nextAvg = Math.round((nextTotal / nextCount) * 10) / 10;
          return { ...r, rating: nextAvg, ratingCount: nextCount };
        })
      );
    },
    [restaurants, persist]
  );

  return {
    restaurants,
    categories,
    addRestaurant,
    addDish,
    rateRestaurant,
    changeRestaurantVote,
    removeRestaurantVote,
  };
}
