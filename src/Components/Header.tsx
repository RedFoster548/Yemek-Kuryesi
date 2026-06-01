export type AppPage = "shop" | "cart" | "success" | "seller";

interface HeaderProps {
  page: AppPage;
  search: string;
  onSearchChange: (value: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
  onSellerClick: () => void;
  onBack: () => void;
  onHomeClick: () => void;
}

export function Header({
  page,
  search,
  onSearchChange,
  cartItemCount,
  onCartClick,
  onSellerClick,
  onBack,
  onHomeClick,
}: HeaderProps) {
  const showSearch = page === "shop";

  return (
    <header className="glass sticky top-0 z-50 border-b border-orange-100/80 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-3">
          {page !== "shop" ? (
            <button
              type="button"
              onClick={onBack}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-bold text-gray-700 ring-1 ring-gray-200 hover:bg-orange-50"
              aria-label="Geri"
            >
              ←
            </button>
          ) : (
            <button
              type="button"
              onClick={onHomeClick}
              className="flex shrink-0 items-center gap-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6000] to-orange-400 text-xl shadow-lg shadow-orange-500/30">
                🛵
              </span>
              <div className="hidden text-left sm:block">
                <p className="text-lg font-extrabold text-gray-900">
                  Yemek <span className="text-[#ff6000]">Kuryesi</span>
                </p>
              </div>
            </button>
          )}

          {showSearch ? (
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Restoran veya yemek ara..."
                className="w-full rounded-2xl border border-orange-100 bg-white py-2.5 pl-11 pr-4 text-sm focus:border-[#ff6000] focus:outline-none focus:ring-2 focus:ring-[#ff6000]/25"
              />
            </div>
          ) : (
            <h1 className="min-w-0 flex-1 text-lg font-extrabold text-gray-900">
              {page === "cart"
                ? "Sepetim"
                : page === "seller"
                  ? "Satıcı Paneli"
                  : "Siparişiniz"}
            </h1>
          )}

          {page === "shop" && (
            <>
              <button
                type="button"
                onClick={onSellerClick}
                className="hidden h-11 shrink-0 items-center gap-1.5 rounded-2xl bg-white px-3 text-sm font-bold text-gray-700 ring-1 ring-gray-200 transition hover:bg-orange-50 sm:flex"
                aria-label="Satıcı paneli"
              >
                <span>🏪</span>
                <span className="hidden md:inline">Satıcı</span>
              </button>
              <button
                type="button"
                onClick={onSellerClick}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl ring-1 ring-gray-200 transition hover:bg-orange-50 sm:hidden"
                aria-label="Satıcı paneli"
              >
                🏪
              </button>
              <button
                type="button"
                onClick={onCartClick}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 ring-1 ring-orange-100 transition hover:bg-orange-100"
                aria-label="Sepete git"
              >
                <span className="text-xl">🛒</span>
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6000] px-1 text-xs font-bold text-white shadow-md">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
