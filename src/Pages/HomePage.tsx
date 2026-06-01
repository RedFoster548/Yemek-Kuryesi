import { useEffect, useMemo, useState } from "react";
import type { AppPage } from "../Components/Header";
import { Header } from "../Components/Header";
import { CategoryFilter } from "../Components/CategoryFilter";
import { FeaturedDishes } from "../Components/FeaturedDishes";
import { HeroBanner } from "../Components/HeroBanner";
import { MenuPanel } from "../Components/MenuPanel";
import { OrderConfirmation } from "../Components/OrderConfirmation";
import { RestaurantList } from "../Components/RestaurantList";
import { CartPage } from "./CartPage";
import { SellerPage } from "./SellerPage";
import { useCart } from "../hooks/useCart";
import { useRestaurants } from "../hooks/useRestaurants";
import type { CartItem, CartItemFormData } from "../Interfaces/CartItem";
import type { PlacedOrder } from "../Interfaces/PlacedOrder";
import { estimateDeliveryMinutes } from "../utils/deliveryTime";
import {
  orderByIdList,
  shuffleRestaurants,
  sortByCategoryView,
} from "../utils/restaurantSort";

export function HomePage() {
  const { items, addItem, updateItem, deleteItem, clearCart, totalPrice } =
    useCart();
  const {
    restaurants,
    categories,
    addRestaurant,
    addDish,
    rateRestaurant,
    changeRestaurantVote,
    removeRestaurantVote,
  } = useRestaurants();

  const [page, setPage] = useState<AppPage>("shop");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [shuffleOrder, setShuffleOrder] = useState<string[]>(() =>
    shuffleRestaurants(restaurants).map((r) => r.id)
  );
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(
    null
  );
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const filteredRestaurants = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matched = restaurants.filter((r) => {
      const matchCategory = category === "Tümü" || r.category === category;
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.dishes.some((d) => d.name.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });

    if (category === "Tümü") {
      return orderByIdList(matched, shuffleOrder);
    }
    return sortByCategoryView(matched);
  }, [search, category, shuffleOrder, restaurants]);

  useEffect(() => {
    if (category === "Tümü") {
      setShuffleOrder(shuffleRestaurants(restaurants).map((r) => r.id));
    }
  }, [category, restaurants.length]);

  useEffect(() => {
    if (filteredRestaurants.length === 0) {
      setSelectedRestaurantId(null);
      return;
    }
    const stillVisible = filteredRestaurants.some(
      (r) => r.id === selectedRestaurantId
    );
    if (!stillVisible) {
      setSelectedRestaurantId(filteredRestaurants[0].id);
    }
  }, [filteredRestaurants, selectedRestaurantId]);

  const selectedRestaurant =
    restaurants.find((r) => r.id === selectedRestaurantId) ?? null;

  function goShop() {
    setPage("shop");
    setEditingItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goCart() {
    setPage("cart");
    setEditingItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goSeller() {
    setPage("seller");
    setEditingItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleQuickAdd(
    restaurantName: string,
    dishName: string,
    price: number
  ) {
    addItem({
      restaurantName,
      dishName,
      price,
      quantity: 1,
      note: "",
    });
  }

  function handleUpdateItem(id: string, data: CartItemFormData) {
    updateItem(id, data);
    setEditingItem(null);
  }

  function handleConfirmOrder() {
    if (items.length === 0) return;

    const { min, max } = estimateDeliveryMinutes(
      items.map((item) => item.restaurantName)
    );

    setPlacedOrder({
      id: crypto.randomUUID(),
      totalPrice,
      itemCount: cartItemCount,
      deliveryMin: min,
      deliveryMax: max,
      placedAt: new Date().toISOString(),
    });
    setEditingItem(null);
    clearCart();
    setPage("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNewOrder() {
    setPlacedOrder(null);
    goShop();
  }

  function handleBack() {
    if (page === "success") {
      handleNewOrder();
    } else {
      goShop();
    }
  }

  return (
    <div className="min-h-screen bg-mesh">
      <Header
        page={page}
        search={search}
        onSearchChange={setSearch}
        cartItemCount={cartItemCount}
        onCartClick={goCart}
        onSellerClick={goSeller}
        onBack={handleBack}
        onHomeClick={goShop}
      />

      {page === "shop" && (
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="min-w-0 space-y-6">
              <HeroBanner restaurantCount={restaurants.length} />

              <CategoryFilter
                categories={categories}
                selected={category}
                restaurants={restaurants}
                onSelect={setCategory}
                onRestaurantSelect={setSelectedRestaurantId}
              />

              <section>
                <h2 className="mb-4 text-xl font-extrabold text-gray-900">
                  🔥 Restoranlar ({filteredRestaurants.length})
                </h2>
                <RestaurantList
                  restaurants={filteredRestaurants}
                  selectedId={selectedRestaurantId}
                  onSelect={setSelectedRestaurantId}
                />
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-[4.5rem] lg:self-start">
              <section>
                <h2 className="mb-3 text-lg font-extrabold text-gray-900">
                  📋 Menü
                </h2>
                <MenuPanel
                  restaurant={selectedRestaurant}
                  onAddToCart={handleQuickAdd}
                  onRateRestaurant={rateRestaurant}
                  onChangeRestaurantVote={changeRestaurantVote}
                  onRemoveRestaurantVote={removeRestaurantVote}
                />
              </section>
              <FeaturedDishes onAddToCart={handleQuickAdd} />
            </aside>
          </div>
        </div>
      )}

      {page === "seller" && (
        <SellerPage
          restaurants={restaurants}
          onAddRestaurant={addRestaurant}
          onAddDish={addDish}
          onViewShop={goShop}
        />
      )}

      {page === "cart" && (
        <CartPage
          items={items}
          totalPrice={totalPrice}
          editingId={editingItem?.id ?? null}
          onEdit={setEditingItem}
          onSave={handleUpdateItem}
          onCancelEdit={() => setEditingItem(null)}
          onDelete={deleteItem}
          onConfirmOrder={handleConfirmOrder}
          onContinueShopping={goShop}
        />
      )}

      {page === "success" && placedOrder && (
        <main className="mx-auto max-w-lg px-4 py-8">
          <OrderConfirmation order={placedOrder} onNewOrder={handleNewOrder} />
        </main>
      )}

      {page === "shop" && (
        <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400">
          Yemek Kuryesi — Web Geliştirme Projesi
        </footer>
      )}
    </div>
  );
}
