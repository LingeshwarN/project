export interface Dish {
  id: string;
  name: string;
  cuisine: 'Indian' | 'Chinese' | 'Italian' | 'Fast Food' | 'Desserts';
  description: string;
  spiceLevel: 'Mild' | 'Medium' | 'Hot';
  price: number;
  rating: number;
  deliveryTime: string;
  cravingScore: number;
  healthScore: number;
  color: string;
  emoji: string;
  imageUrl: string;
  restaurantName: string;
  restaurantId: string;
  isVeg?: boolean;
  isFlashDeal?: boolean;
  discountPercent?: number;
}

export interface ComboMeal {
  id: string;
  name: string;
  cuisineCoverage: string;
  prepTime: string;
  spiceLevel: 'Mild' | 'Medium' | 'Hot';
  ordersCount: number;
  price: number;
  emoji: string;
  imageUrl: string;
  color: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minimumOrder: number;
  coverImage: string;
  description: string;
  tags: string[];
}

export const CUISINES = ['Indian', 'Chinese', 'Italian', 'Fast Food', 'Desserts'] as const;

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest1',
    name: 'Mehfil Grand',
    cuisine: 'Indian',
    rating: 4.8,
    deliveryTime: '30-35 mins',
    minimumOrder: 199,
    coverImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop',
    description: 'Authentic North Indian royal cuisine with rich gravies and tandoor specials',
    tags: ['North Indian', 'Tandoor', 'Biryani'],
  },
  {
    id: 'rest2',
    name: 'Kathi Zone',
    cuisine: 'Indian',
    rating: 4.5,
    deliveryTime: '20-25 mins',
    minimumOrder: 149,
    coverImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop',
    description: 'Fresh Kathi rolls and Indian street food made with love',
    tags: ['Street Food', 'Rolls', 'Quick Bites'],
  },
  {
    id: 'rest3',
    name: 'Noodle Bar',
    cuisine: 'Chinese',
    rating: 4.4,
    deliveryTime: '25-30 mins',
    minimumOrder: 149,
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop',
    description: 'Fiery Indo-Chinese noodles, rice, and wok-tossed favourites',
    tags: ['Chinese', 'Noodles', 'Fried Rice'],
  },
  {
    id: 'rest4',
    name: 'Dim Sum House',
    cuisine: 'Chinese',
    rating: 4.6,
    deliveryTime: '20-25 mins',
    minimumOrder: 149,
    coverImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop',
    description: 'Handcrafted dim sum and authentic Chinese appetisers',
    tags: ['Dim Sum', 'Dumplings', 'Steamed'],
  },
  {
    id: 'rest5',
    name: 'Pizzeria Roma',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '35-40 mins',
    minimumOrder: 249,
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    description: 'Wood-fired Neapolitan pizzas baked with authentic Italian ingredients',
    tags: ['Pizza', 'Italian', 'Pasta'],
  },
  {
    id: 'rest6',
    name: 'Pasta Palace',
    cuisine: 'Italian',
    rating: 4.3,
    deliveryTime: '30-35 mins',
    minimumOrder: 199,
    coverImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop',
    description: 'Authentic Italian pasta dishes made fresh with imported ingredients',
    tags: ['Pasta', 'Italian', 'Risotto'],
  },
  {
    id: 'rest7',
    name: 'Burger Club',
    cuisine: 'Fast Food',
    rating: 4.9,
    deliveryTime: '15-20 mins',
    minimumOrder: 99,
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    description: 'Juicy smash burgers, loaded fries, and crispy fried chicken',
    tags: ['Burgers', 'Fast Food', 'Fries'],
  },
  {
    id: 'rest8',
    name: 'Dessert Heaven',
    cuisine: 'Desserts',
    rating: 4.9,
    deliveryTime: '20-25 mins',
    minimumOrder: 99,
    coverImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop',
    description: 'Indulgent desserts, cakes, and sweet treats for every occasion',
    tags: ['Cakes', 'Desserts', 'Ice Cream'],
  },
  {
    id: 'rest9',
    name: 'Sweet Treats',
    cuisine: 'Desserts',
    rating: 4.6,
    deliveryTime: '20 mins',
    minimumOrder: 99,
    coverImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop',
    description: 'Italian-inspired desserts, panna cottas, and gelatos',
    tags: ['Italian Desserts', 'Gelato', 'Panna Cotta'],
  },
];

export const DISHES: Dish[] = [
  {
    id: 'd1',
    name: 'Butter Chicken Masala',
    cuisine: 'Indian',
    description: 'Tender chicken pieces cooked in a rich, creamy tomato butter gravy with aromatic spices.',
    spiceLevel: 'Medium',
    price: 349,
    rating: 4.8,
    deliveryTime: '30-35 mins',
    cravingScore: 95,
    healthScore: 65,
    color: '#FFE8D6',
    emoji: '🍛',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop',
    restaurantName: 'Mehfil Grand',
    restaurantId: 'rest1',
    isVeg: false,
    isFlashDeal: true,
    discountPercent: 20,
  },
  {
    id: 'd2',
    name: 'Paneer Tikka Roll',
    cuisine: 'Indian',
    description: 'Smoky grilled cottage cheese cubes wrapped in a soft flatbread with mint chutney and onions.',
    spiceLevel: 'Hot',
    price: 189,
    rating: 4.5,
    deliveryTime: '20-25 mins',
    cravingScore: 88,
    healthScore: 78,
    color: '#FFE8D6',
    emoji: '🌯',
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop',
    restaurantName: 'Kathi Zone',
    restaurantId: 'rest2',
    isVeg: true,
  },
  {
    id: 'd3',
    name: 'Szechuan Noodles',
    cuisine: 'Chinese',
    description: 'Fiery stir-fried noodles tossed with fresh vegetables and hot szechuan sauce.',
    spiceLevel: 'Hot',
    price: 229,
    rating: 4.4,
    deliveryTime: '25-30 mins',
    cravingScore: 92,
    healthScore: 55,
    color: '#FFE5EC',
    emoji: '🍜',
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop',
    restaurantName: 'Noodle Bar',
    restaurantId: 'rest3',
    isVeg: true,
    isFlashDeal: true,
    discountPercent: 15,
  },
  {
    id: 'd4',
    name: 'Dim Sum Basket',
    cuisine: 'Chinese',
    description: 'Steamed delicate dumplings filled with seasoned vegetables and served with chili dip.',
    spiceLevel: 'Mild',
    price: 199,
    rating: 4.6,
    deliveryTime: '20-25 mins',
    cravingScore: 82,
    healthScore: 85,
    color: '#FFE5EC',
    emoji: '🥟',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop',
    restaurantName: 'Dim Sum House',
    restaurantId: 'rest4',
    isVeg: true,
  },
  {
    id: 'd5',
    name: 'Margherita Pizza',
    cuisine: 'Italian',
    description: 'Classic sourdough crust topped with rich marinara sauce, fresh mozzarella, and fresh basil leaves.',
    spiceLevel: 'Mild',
    price: 299,
    rating: 4.7,
    deliveryTime: '35-40 mins',
    cravingScore: 97,
    healthScore: 70,
    color: '#E8F5E9',
    emoji: '🍕',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop',
    restaurantName: 'Pizzeria Roma',
    restaurantId: 'rest5',
    isVeg: true,
    isFlashDeal: true,
    discountPercent: 25,
  },
  {
    id: 'd6',
    name: 'Penne Arrabbiata',
    cuisine: 'Italian',
    description: 'Spicy pasta dish made with garlic, tomatoes, and dried red chili peppers cooked in olive oil.',
    spiceLevel: 'Hot',
    price: 279,
    rating: 4.3,
    deliveryTime: '30-35 mins',
    cravingScore: 85,
    healthScore: 72,
    color: '#E8F5E9',
    emoji: '🍝',
    imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&auto=format&fit=crop',
    restaurantName: 'Pasta Palace',
    restaurantId: 'rest6',
    isVeg: true,
  },
  {
    id: 'd7',
    name: 'Double Cheese Burger',
    cuisine: 'Fast Food',
    description: 'Two flame-grilled patties, melted cheddar, pickles, onions, and our signature sauce on a toasted bun.',
    spiceLevel: 'Medium',
    price: 249,
    rating: 4.9,
    deliveryTime: '15-20 mins',
    cravingScore: 99,
    healthScore: 40,
    color: '#ECEFF1',
    emoji: '🍔',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop',
    restaurantName: 'Burger Club',
    restaurantId: 'rest7',
    isVeg: false,
    isFlashDeal: true,
    discountPercent: 30,
  },
  {
    id: 'd8',
    name: 'Crispy French Fries',
    cuisine: 'Fast Food',
    description: 'Golden-brown, salted potato fries served piping hot with ketchup and garlic aioli.',
    spiceLevel: 'Mild',
    price: 129,
    rating: 4.5,
    deliveryTime: '15 mins',
    cravingScore: 90,
    healthScore: 35,
    color: '#ECEFF1',
    emoji: '🍟',
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop',
    restaurantName: 'Burger Club',
    restaurantId: 'rest7',
    isVeg: true,
  },
  {
    id: 'd9',
    name: 'Chocolate Lava Cake',
    cuisine: 'Desserts',
    description: 'Decadent chocolate cake with a warm, gooey liquid chocolate center. Served warm.',
    spiceLevel: 'Mild',
    price: 159,
    rating: 4.9,
    deliveryTime: '20-25 mins',
    cravingScore: 98,
    healthScore: 30,
    color: '#FFF8E1',
    emoji: '🎂',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop',
    restaurantName: 'Dessert Heaven',
    restaurantId: 'rest8',
    isVeg: true,
  },
  {
    id: 'd10',
    name: 'Mango Panna Cotta',
    cuisine: 'Desserts',
    description: 'Silky, creamy Italian dessert flavored with fresh vanilla beans and topped with mango puree.',
    spiceLevel: 'Mild',
    price: 179,
    rating: 4.6,
    deliveryTime: '20 mins',
    cravingScore: 84,
    healthScore: 60,
    color: '#FFF8E1',
    emoji: '🍮',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop',
    restaurantName: 'Sweet Treats',
    restaurantId: 'rest9',
    isVeg: true,
  },
];

export const COMBO_MEALS: ComboMeal[] = [
  {
    id: 'c1',
    name: 'Royal North Indian Feast',
    cuisineCoverage: 'Indian & Desserts',
    prepTime: '25 Mins',
    spiceLevel: 'Medium',
    ordersCount: 1420,
    price: 499,
    emoji: '🍱',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop',
    color: '#FFF3E0',
  },
  {
    id: 'c2',
    name: 'Sizzling Szechuan Pair',
    cuisineCoverage: 'Chinese & Fast Food',
    prepTime: '20 Mins',
    spiceLevel: 'Hot',
    ordersCount: 890,
    price: 349,
    emoji: '🍜',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop',
    color: '#FFEBEE',
  },
  {
    id: 'c3',
    name: 'Tuscany Romance Combo',
    cuisineCoverage: 'Italian & Desserts',
    prepTime: '30 Mins',
    spiceLevel: 'Mild',
    ordersCount: 650,
    price: 529,
    emoji: '🍕',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop',
    color: '#E8F5E9',
  },
  {
    id: 'c4',
    name: 'Mega Crunch Party Tub',
    cuisineCoverage: 'Fast Food',
    prepTime: '15 Mins',
    spiceLevel: 'Medium',
    ordersCount: 2310,
    price: 399,
    emoji: '🍔',
    imageUrl: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=500&auto=format&fit=crop',
    color: '#ECEFF1',
  },
];

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percent' | 'flat' | 'free_delivery';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
}

export const COUPONS: Coupon[] = [
  { id: 'cpn1', code: 'WELCOME50', description: '50% off up to ₹100', discountType: 'percent', discountValue: 50, minOrderValue: 149, maxDiscount: 100 },
  { id: 'cpn2', code: 'FLAT150', description: 'Flat ₹150 off on ₹499+', discountType: 'flat', discountValue: 150, minOrderValue: 499 },
  { id: 'cpn3', code: 'PARTY300', description: 'Flat ₹300 off on ₹999+', discountType: 'flat', discountValue: 300, minOrderValue: 999 },
  { id: 'cpn4', code: 'FREEDEL', description: 'Free Delivery on ₹299+', discountType: 'free_delivery', discountValue: 0, minOrderValue: 299 },
];
