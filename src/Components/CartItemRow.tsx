import { useEffect, useState } from "react";
import type { CartItem, CartItemFormData } from "../Interfaces/CartItem";

interface CartItemRowProps {
  item: CartItem;
  isEditing: boolean;
  onEdit: (item: CartItem) => void;
  onSave: (id: string, data: CartItemFormData) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
}

export function CartItemRow({
  item,
  isEditing,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete,
}: CartItemRowProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [note, setNote] = useState(item.note);

  useEffect(() => {
    if (isEditing) {
      setQuantity(item.quantity);
      setNote(item.note);
    }
  }, [isEditing, item]);

  const lineTotal = item.price * item.quantity;

  if (isEditing) {
    return (
      <article className="rounded-xl border-2 border-[#ff6000] bg-gradient-to-br from-orange-50 to-amber-50 p-4 shadow-inner">
        <p className="text-xs font-bold uppercase tracking-wide text-[#ff6000]">
          {item.restaurantName}
        </p>
        <h3 className="font-bold text-gray-900">{item.dishName}</h3>
        <p className="text-sm text-gray-500">{item.price} ₺ / adet</p>

        <label className="mt-3 block">
          <span className="text-xs font-semibold text-gray-600">Adet</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-orange-200 bg-white px-3 py-2 focus:border-[#ff6000] focus:outline-none focus:ring-2 focus:ring-[#ff6000]/20"
          />
        </label>

        <label className="mt-2 block">
          <span className="text-xs font-semibold text-gray-600">Not</span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="İsteğe bağlı..."
            className="mt-1 w-full rounded-xl border border-orange-200 bg-white px-3 py-2 focus:border-[#ff6000] focus:outline-none"
          />
        </label>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() =>
              onSave(item.id, {
                restaurantName: item.restaurantName,
                dishName: item.dishName,
                price: item.price,
                quantity: Math.max(1, quantity),
                note,
              })
            }
            className="btn-primary rounded-xl px-4 py-2 text-sm font-bold text-white"
          >
            Kaydet
          </button>
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600"
          >
            İptal
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-xl bg-gradient-to-r from-gray-50 to-orange-50/40 p-4 ring-1 ring-orange-100/80">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#ff6000]">
            {item.restaurantName}
          </p>
          <h3 className="font-bold text-gray-900">{item.dishName}</h3>
          {item.note && (
            <p className="mt-1 text-xs text-gray-500">💬 {item.note}</p>
          )}
        </div>
        <p className="shrink-0 rounded-lg bg-white px-2 py-1 text-lg font-extrabold text-[#ff6000] shadow-sm">
          {lineTotal} ₺
        </p>
      </div>

      <p className="mt-2 text-xs font-medium text-gray-500">
        {item.quantity} × {item.price} ₺
      </p>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 hover:bg-orange-50"
        >
          Güncelle
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
        >
          Sil
        </button>
      </div>
    </article>
  );
}
