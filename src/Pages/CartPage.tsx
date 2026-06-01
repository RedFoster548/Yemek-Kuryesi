import type { CartItem, CartItemFormData } from "../Interfaces/CartItem";
import { CartItemRow } from "../Components/CartItemRow";

interface CartPageProps {
  items: CartItem[];
  totalPrice: number;
  editingId: string | null;
  onEdit: (item: CartItem) => void;
  onSave: (id: string, data: CartItemFormData) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onConfirmOrder: () => void;
  onContinueShopping: () => void;
}

export function CartPage({
  items,
  totalPrice,
  editingId,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete,
  onConfirmOrder,
  onContinueShopping,
}: CartPageProps) {
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-2xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Sepetim</h1>
        <p className="mt-1 text-sm text-gray-500">
          {totalQty > 0
            ? `${totalQty} ürün · Siparişini kontrol et`
            : "Sepetiniz boş"}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
          <p className="text-6xl">🛒</p>
          <p className="mt-4 text-lg font-bold text-gray-800">Sepetiniz boş</p>
          <p className="mt-2 text-sm text-gray-500">
            Lezzetli yemekler için alışverişe başlayın
          </p>
          <button
            type="button"
            onClick={onContinueShopping}
            className="btn-primary mt-6 rounded-2xl px-8 py-3 font-bold text-white"
          >
            Alışverişe dön
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <CartItemRow
                  item={item}
                  isEditing={editingId === item.id}
                  onEdit={onEdit}
                  onSave={onSave}
                  onCancelEdit={onCancelEdit}
                  onDelete={onDelete}
                />
              </li>
            ))}
          </ul>

          <div className="sticky bottom-4 mt-8 rounded-2xl bg-gradient-to-br from-[#ff6000] via-orange-500 to-amber-500 p-5 text-white shadow-xl shadow-orange-500/30">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-orange-100">Ödenecek tutar</p>
                <p className="text-3xl font-extrabold">{totalPrice} ₺</p>
              </div>
              <p className="text-sm font-medium text-orange-100">{totalQty} ürün</p>
            </div>
            <button
              type="button"
              onClick={onConfirmOrder}
              className="mt-4 w-full rounded-2xl bg-white py-3.5 font-extrabold text-[#ff6000] shadow-md transition hover:bg-orange-50"
            >
              Siparişi Onayla
            </button>
            <button
              type="button"
              onClick={onContinueShopping}
              className="mt-2 w-full py-2 text-sm font-semibold text-orange-100 hover:text-white"
            >
              ← Alışverişe devam et
            </button>
          </div>
        </>
      )}
    </main>
  );
}
