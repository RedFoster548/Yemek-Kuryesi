import type { PlacedOrder } from "../Interfaces/PlacedOrder";

interface OrderConfirmationProps {
  order: PlacedOrder;
  onNewOrder: () => void;
}

export function OrderConfirmation({ order, onNewOrder }: OrderConfirmationProps) {
  const orderNo = order.id.slice(0, 8).toUpperCase();
  const time = new Date(order.placedAt).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="animate-fade-up overflow-hidden rounded-2xl bg-white shadow-xl shadow-emerald-500/15 ring-1 ring-emerald-100">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-5 py-8 text-center text-white">
        <p className="text-6xl drop-shadow-md">🎉</p>
        <h2 className="mt-3 text-2xl font-extrabold">Siparişiniz alındı!</h2>
        <p className="mt-2 text-sm text-emerald-100">
          No: <span className="font-mono font-bold">{orderNo}</span> · {time}
        </p>
      </div>

      <div className="p-5">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5 text-center ring-1 ring-emerald-100">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Tahmini teslimat
          </p>
          <p className="mt-2 text-4xl font-extrabold text-emerald-600">
            {order.deliveryMin}–{order.deliveryMax}
          </p>
          <p className="text-lg font-bold text-emerald-700">dakika</p>
          <div className="mt-4 flex justify-center gap-1">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className="h-2 w-8 animate-pulse-soft rounded-full bg-emerald-400"
                style={{ animationDelay: `${n * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
          <div className="rounded-xl bg-gray-50 py-3">
            <p className="font-extrabold text-gray-900">{order.itemCount}</p>
            <p className="text-gray-500">ürün</p>
          </div>
          <div className="rounded-xl bg-orange-50 py-3">
            <p className="font-extrabold text-[#ff6000]">{order.totalPrice} ₺</p>
            <p className="text-gray-500">toplam</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewOrder}
          className="btn-primary mt-5 w-full rounded-2xl py-3.5 font-extrabold text-white"
        >
          Yeni sipariş ver
        </button>
      </div>
    </div>
  );
}
