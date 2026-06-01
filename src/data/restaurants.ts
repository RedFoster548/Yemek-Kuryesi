import type { MenuDish, Restaurant } from "../Interfaces/Restaurant";

interface CategorySeed {
  category: string;
  emoji: string;
  minOrder: number;
  deliveryTime: string;
  names: string[];
  dishes: Omit<MenuDish, "id">[];
}

const CATEGORY_SEEDS: CategorySeed[] = [
  {
    category: "Burger",
    emoji: "🍔",
    minOrder: 100,
    deliveryTime: "25-35 dk",
    names: [
      "Burger House",
      "Smash Lab",
      "Grill Burger",
      "Brooklyn Burger",
      "King Burger",
      "Mojo Burger",
      "Street Burger",
      "Flame Burger",
      "Urban Burger",
      "Classic Burger",
    ],
    dishes: [
      { name: "Cheese Burger", price: 189, description: "Dana köfte, cheddar" },
      { name: "Double Smash", price: 229, description: "Çift köfte, özel sos" },
      { name: "BBQ Burger", price: 215, description: "Barbekü soslu" },
      { name: "Tavuk Burger", price: 175, description: "Çıtır tavuk" },
      { name: "Patates", price: 79, description: "Büyük boy" },
      { name: "Milkshake", price: 95, description: "Çikolatalı" },
    ],
  },
  {
    category: "Pizza",
    emoji: "🍕",
    minOrder: 120,
    deliveryTime: "30-40 dk",
    names: [
      "Pizza Roma",
      "Napoli Pizza",
      "Forno Pizza",
      "Slice House",
      "Marco Pizza",
      "Vesuvio",
      "Pizza Palace",
      "La Pizzeria",
      "Pizza Express",
      "Taş Fırın Pizza",
    ],
    dishes: [
      { name: "Margherita", price: 199, description: "Mozzarella, domates" },
      { name: "Karışık Pizza", price: 249, description: "Sucuk, mantar, biber" },
      { name: "Pepperoni", price: 235, description: "Bol pepperoni" },
      { name: "Lahmacun", price: 89, description: "İnce hamur" },
      { name: "Pide Kaşarlı", price: 145, description: "Taş fırın" },
      { name: "Calzone", price: 220, description: "İçi dolu" },
    ],
  },
  {
    category: "Döner",
    emoji: "🥙",
    minOrder: 70,
    deliveryTime: "20-30 dk",
    names: [
      "Dönerci Usta",
      "Bereket Döner",
      "Anadolu Döner",
      "Efeler Döner",
      "Saray Döner",
      "24 Saat Döner",
      "Kardeşler Döner",
      "Sultan Döner",
      "Metro Döner",
      "Lezzet Döner",
    ],
    dishes: [
      { name: "Tavuk Dürüm", price: 145, description: "Patatesli" },
      { name: "Et Dürüm", price: 165, description: "Bol et" },
      { name: "Et Porsiyon", price: 220, description: "Pilavlı" },
      { name: "İskender", price: 265, description: "Yoğurtlu" },
      { name: "Tombik", price: 155, description: "Ekmek arası" },
      { name: "Ayran", price: 35, description: "Soğuk" },
    ],
  },
  {
    category: "Sushi",
    emoji: "🍣",
    minOrder: 180,
    deliveryTime: "35-45 dk",
    names: [
      "Sushi Tokyo",
      "Sakura Sushi",
      "Tokyo Express",
      "Fuji Sushi",
      "Maki House",
      "Zen Sushi",
      "Osaka Roll",
      "Nigiri Bar",
      "Pacific Sushi",
      "Kimono Sushi",
    ],
    dishes: [
      { name: "California Roll", price: 175, description: "8 parça" },
      { name: "Salmon Nigiri", price: 210, description: "6 adet" },
      { name: "Dragon Roll", price: 245, description: "Tempura" },
      { name: "Maki Set", price: 285, description: "12 parça" },
      { name: "Edamame", price: 75, description: "Tuzlu" },
      { name: "Miso Çorbası", price: 65, description: "Geleneksel" },
    ],
  },
  {
    category: "Kahvaltı",
    emoji: "🥐",
    minOrder: 90,
    deliveryTime: "25-35 dk",
    names: [
      "Kahvaltı Evi",
      "Sabah Keyfi",
      "Günaydın Cafe",
      "Köşe Kahvaltı",
      "Beyaz Fırın",
      "Anadolu Kahvaltı",
      "Brunch & Co",
      "Simit Sarayı",
      "Fincan Cafe",
      "Yeni Gün",
    ],
    dishes: [
      { name: "Serpme Kahvaltı", price: 320, description: "2 kişilik" },
      { name: "Menemen", price: 135, description: "Ekmekli" },
      { name: "Sucuklu Yumurta", price: 145, description: "Sıcak" },
      { name: "Gözleme", price: 95, description: "Peynirli" },
      { name: "Simit & Çay", price: 55, description: "Klasik" },
      { name: "Pankek", price: 120, description: "3 adet" },
    ],
  },
  {
    category: "Tatlı",
    emoji: "🍰",
    minOrder: 55,
    deliveryTime: "20-30 dk",
    names: [
      "Tatlı Dünyası",
      "Baklava Evi",
      "Çikolata Atölyesi",
      "Dondurmacı",
      "Pastane 1923",
      "Şeker Dünyası",
      "Fıstık Sarayı",
      "Cheesecake Lab",
      "Sufle House",
      "Lezzet Tatlı",
    ],
    dishes: [
      { name: "Sufle", price: 145, description: "Çikolatalı" },
      { name: "Künefe", price: 185, description: "Fıstıklı" },
      { name: "Tiramisu", price: 135, description: "İtalyan" },
      { name: "Baklava", price: 155, description: "4 dilim" },
      { name: "Magnolia", price: 125, description: "Ev yapımı" },
      { name: "Dondurma", price: 85, description: "3 top" },
    ],
  },
  {
    category: "Kebap",
    emoji: "🍖",
    minOrder: 120,
    deliveryTime: "30-40 dk",
    names: [
      "Kebapçı Halil",
      "Adana Sofrası",
      "Urfa Kebap",
      "Kebap 45",
      "Mangal Evi",
      "Ocakbaşı",
      "Kazan Kebap",
      "Meşhur Kebap",
      "Antep Sofrası",
      "Ciğerci Niyazi",
    ],
    dishes: [
      { name: "Adana Kebap", price: 245, description: "Lavaşlı" },
      { name: "Urfa Kebap", price: 235, description: "Acısız" },
      { name: "Beyti Sarma", price: 255, description: "Yoğurtlu" },
      { name: "Kuzu Şiş", price: 270, description: "200g" },
      { name: "Tavuk Şiş", price: 195, description: "Marine" },
      { name: "Köfte Tabak", price: 210, description: "Pilavlı" },
    ],
  },
  {
    category: "Ev Yemekleri",
    emoji: "🍲",
    minOrder: 85,
    deliveryTime: "25-35 dk",
    names: [
      "Çorba & Ev Yemekleri",
      "Anne Eli",
      "Ev Sofrası",
      "Günün Yemeği",
      "Tencere",
      "Komşu Mutfağı",
      "Sofram",
      "Ev Lezzeti",
      "Mutfak 34",
      "Gelenek Sofrası",
    ],
    dishes: [
      { name: "Mercimek Çorbası", price: 75, description: "Krutonlu" },
      { name: "Kuru Fasulye", price: 165, description: "Pilavlı" },
      { name: "Tavuk Sote", price: 185, description: "Sebzeli" },
      { name: "Karnıyarık", price: 195, description: "Kıymalı" },
      { name: "Mantı", price: 155, description: "8 adet" },
      { name: "Cacık", price: 45, description: "Ev yapımı" },
    ],
  },
  {
    category: "İtalyan",
    emoji: "🍝",
    minOrder: 130,
    deliveryTime: "30-40 dk",
    names: [
      "Makarna & İtalyan",
      "Pasta Fresca",
      "Trattoria",
      "Roma Makarna",
      "Italian Corner",
      "Risotto House",
      "Spaghetti Co",
      "Milano",
      "Olive Kitchen",
      "Penne Bar",
    ],
    dishes: [
      { name: "Bolognese", price: 195, description: "Kıymalı sos" },
      { name: "Alfredo", price: 210, description: "Kremalı" },
      { name: "Arrabbiata", price: 185, description: "Acılı" },
      { name: "Lazanya", price: 225, description: "Fırın" },
      { name: "Ravioli", price: 215, description: "Ispanaklı" },
      { name: "Bruschetta", price: 95, description: "4 dilim" },
    ],
  },
  {
    category: "Çin",
    emoji: "🥡",
    minOrder: 110,
    deliveryTime: "30-45 dk",
    names: [
      "Çin Wok",
      "Dragon Wok",
      "Pekin Palace",
      "Uzak Doğu",
      "Chopstick House",
      "Wok Express",
      "Shanghai Kitchen",
      "Panda Wok",
      "Golden Dragon",
      "Noodle Box",
    ],
    dishes: [
      { name: "Tavuklu Noodle", price: 175, description: "Sebzeli" },
      { name: "Etli Noodle", price: 195, description: "Soya soslu" },
      { name: "Spring Roll", price: 95, description: "4 adet" },
      { name: "Fried Rice", price: 155, description: "Yumurtalı" },
      { name: "Sweet & Sour", price: 205, description: "Tavuk" },
      { name: "Wonton Çorbası", price: 85, description: "Sıcak" },
    ],
  },
  {
    category: "Deniz",
    emoji: "🐟",
    minOrder: 170,
    deliveryTime: "35-50 dk",
    names: [
      "Balık Evi",
      "Balıkçı Hasan",
      "Deniz Sofrası",
      "Kalamar King",
      "Taze Balık",
      "Marmara Balık",
      "Fisherman's",
      "Aqua Fish",
      "Liman Restaurant",
      "Poseidon",
    ],
    dishes: [
      { name: "Izgara Levrek", price: 285, description: "Rokalı" },
      { name: "Çupra", price: 295, description: "Buğulama" },
      { name: "Karides Güveç", price: 265, description: "Domatesli" },
      { name: "Kalamar Tava", price: 195, description: "Tarator" },
      { name: "Balık Ekmek", price: 165, description: "Taze" },
      { name: "Meze Tabağı", price: 220, description: "4 çeşit" },
    ],
  },
  {
    category: "Köfte",
    emoji: "🧆",
    minOrder: 95,
    deliveryTime: "20-30 dk",
    names: [
      "Köfteci Ramiz",
      "İnegöl Köfte Evi",
      "Kasap Köfte",
      "Sultan Köfte",
      "Köfte Durağı",
      "Topçu Köfte",
      "Mangal Köfte",
      "Bursa Köfte",
      "Köfteçi Ahmet",
      "Usta Köfte",
    ],
    dishes: [
      { name: "İnegöl Köfte", price: 195, description: "Piyazlı" },
      { name: "Kasap Köfte", price: 205, description: "Ekmek arası" },
      { name: "Sucuk Ekmek", price: 145, description: "Bol sucuk" },
      { name: "Köfte Tabak", price: 225, description: "Pilavlı" },
      { name: "Çiğ Köfte Dürüm", price: 95, description: "Acılı" },
      { name: "Piyaz", price: 75, description: "Büyük" },
    ],
  },
  {
    category: "Tavuk",
    emoji: "🍗",
    minOrder: 100,
    deliveryTime: "25-35 dk",
    names: [
      "Tavuk Dünyası",
      "Chick Master",
      "Kanat Evi",
      "Tavukçu Ali",
      "Crispy Chicken",
      "Wing House",
      "Grill Tavuk",
      "Tavuk Izgara",
      "Golden Chick",
      "Hot Wings",
    ],
    dishes: [
      { name: "Çıtır Tavuk", price: 195, description: "6 parça" },
      { name: "Kanat", price: 175, description: "8 adet" },
      { name: "Izgara Göğüs", price: 185, description: "Sebzeli" },
      { name: "Schnitzel", price: 205, description: "Patatesli" },
      { name: "Fajita", price: 215, description: "Lavaşlı" },
      { name: "Tavuklu Salata", price: 155, description: "Akdeniz" },
    ],
  },
  {
    category: "Vegan",
    emoji: "🥗",
    minOrder: 95,
    deliveryTime: "25-35 dk",
    names: [
      "Vegan Lezzet",
      "Green Kitchen",
      "Plant Based",
      "Veggie House",
      "Humus Bar",
      "Falafel Co",
      "Eco Bowl",
      "Yeşil Tabak",
      "Vegan İstanbul",
      "Nature Cafe",
    ],
    dishes: [
      { name: "Buddha Bowl", price: 175, description: "Kinoa" },
      { name: "Vegan Burger", price: 185, description: "Nohut" },
      { name: "Falafel Dürüm", price: 145, description: "Humuslu" },
      { name: "Sebzeli Curry", price: 165, description: "Kokos" },
      { name: "Tofu Izgara", price: 155, description: "Soya" },
      { name: "Smoothie Bowl", price: 135, description: "Meyveli" },
    ],
  },
  {
    category: "Pide",
    emoji: "🫓",
    minOrder: 65,
    deliveryTime: "20-30 dk",
    names: [
      "Pide & Lahmacun",
      "Taş Fırın Pide",
      "Bafra Pide",
      "Kayseri Pide",
      "Lahmacun Evi",
      "Pideci Kamil",
      "Fırın Pide",
      "Anadolu Pide",
      "Sofra Pide",
      "Pide King",
    ],
    dishes: [
      { name: "Kıymalı Pide", price: 155, description: "Sıcak" },
      { name: "Kaşarlı Pide", price: 145, description: "Bol peynir" },
      { name: "Karışık Pide", price: 165, description: "Kıyma + kaşar" },
      { name: "Kuşbaşılı", price: 175, description: "Dana" },
      { name: "Lahmacun", price: 65, description: "2 adet" },
      { name: "Künefe", price: 175, description: "Fırından" },
    ],
  },
  {
    category: "Fast Food",
    emoji: "⚡",
    minOrder: 75,
    deliveryTime: "15-25 dk",
    names: [
      "Fast Bite",
      "Quick Meal",
      "Express Food",
      "Hızlı Lezzet",
      "Snack Bar",
      "Street Food",
      "Mega Meal",
      "Turbo Eat",
      "Fast Corner",
      "Go Food",
    ],
    dishes: [
      { name: "Burger Menü", price: 199, description: "Cola dahil" },
      { name: "Tavuk Menü", price: 189, description: "Ayran dahil" },
      { name: "Hot Dog", price: 95, description: "Ketçaplı" },
      { name: "Tost", price: 85, description: "Karışık" },
      { name: "Patso", price: 75, description: "Soslu" },
      { name: "Nugget", price: 115, description: "9 adet" },
    ],
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildRestaurants(): Restaurant[] {
  const list: Restaurant[] = [];
  let counter = 1;

  for (const seed of CATEGORY_SEEDS) {
    seed.names.forEach((name, index) => {
      const rating = Math.round((4.3 + (index % 6) * 0.1) * 10) / 10;
      const slug = slugify(name);

      list.push({
        id: String(counter++),
        name,
        category: seed.category,
        rating: rating > 4.9 ? 4.9 : rating,
        ratingCount: 1,
        minOrder: seed.minOrder + index * 5,
        deliveryTime: seed.deliveryTime,
        emoji: seed.emoji,
        dishes: seed.dishes.map((dish, dishIndex) => ({
          id: `${slug}-${dishIndex + 1}`,
          name: dish.name,
          price: dish.price + (index % 3) * 5,
          description: dish.description,
        })),
      });
    });
  }

  return list;
}

// Limit total restaurants to 65 for the UI
export const RESTAURANTS: Restaurant[] = buildRestaurants().slice(0, 65);

export const CATEGORIES = ["Tümü", ...new Set(RESTAURANTS.map((r) => r.category))];

export const RESTAURANT_CATEGORY_OPTIONS = CATEGORY_SEEDS.map((s) => s.category);

export const CATEGORY_EMOJIS: Record<string, string> = Object.fromEntries(
  CATEGORY_SEEDS.map((s) => [s.category, s.emoji])
);
