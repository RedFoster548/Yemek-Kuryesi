interface HeroBannerProps {
  restaurantCount: number;
}

export function HeroBanner({ restaurantCount }: HeroBannerProps) {
  return (
    <section className="animate-fade-up relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff6000] via-orange-500 to-amber-500 p-6 text-white shadow-xl shadow-orange-500/25 md:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-lg">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-white" />
            Hızlı teslimat · Canlı sipariş
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Lezzet kapınıza
            <br />
            <span className="text-orange-100">birkaç tık uzağınızda</span>
          </h2>
          <p className="mt-3 text-sm text-orange-50/90 md:text-base">
            {restaurantCount}+ restoran, yüzlerce yemek. Sepete ekle, siparişi onayla.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="animate-float text-6xl md:text-7xl">🛵</span>
          <div className="hidden gap-3 sm:flex sm:flex-col">
            <div className="rounded-2xl bg-white/15 px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold">25 dk</p>
              <p className="text-xs text-orange-100">Ort. teslimat</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold">%100</p>
              <p className="text-xs text-orange-100">Güvenli ödeme</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
