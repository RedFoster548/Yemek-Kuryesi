import { useCallback, useEffect, useState } from "react";
import type { CartItem, CartItemFormData } from "../Interfaces/CartItem";
import { loadCart, saveCart } from "../utils/cartStorage";

function createId(): string {
  return crypto.randomUUID();
}

function isSameDish(
  a: { restaurantName: string; dishName: string; price: number },
  b: { restaurantName: string; dishName: string; price: number }
): boolean {
  return (
    a.restaurantName.trim().toLowerCase() ===
      b.restaurantName.trim().toLowerCase() &&
    a.dishName.trim().toLowerCase() === b.dishName.trim().toLowerCase() &&
    a.price === b.price
  );
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  }, []);

  const addItem = useCallback(
    (data: CartItemFormData) => {
      const normalized = {
        restaurantName: data.restaurantName.trim(),
        dishName: data.dishName.trim(),
        price: data.price,
      };
      const addQty = Math.max(1, data.quantity);
      const existing = items.find((item) => isSameDish(item, normalized));

      if (existing) {
        persist(
          items.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + addQty }
              : item
          )
        );
        return;
      }

      const item: CartItem = {
        id: createId(),
        ...normalized,
        quantity: addQty,
        note: data.note.trim(),
        createdAt: new Date().toISOString(),
      };
      persist([item, ...items]);
    },
    [items, persist]
  );

  const updateItem = useCallback(
    (id: string, data: CartItemFormData) => {
      persist(
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                restaurantName: data.restaurantName.trim(),
                dishName: data.dishName.trim(),
                price: data.price,
                quantity: Math.max(1, data.quantity),
                note: data.note.trim(),
              }
            : item
        )
      );
    },
    [items, persist]
  );

  const deleteItem = useCallback(
    (id: string) => {
      persist(items.filter((item) => item.id !== id));
    },
    [items, persist]
  );

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { items, addItem, updateItem, deleteItem, clearCart, totalPrice };
}
