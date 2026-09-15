import axios from 'axios';
import { CUISINES, DISHES, Dish } from '../data/mockData';

export interface PromoBanner {
  id: string;
  title: string;
  message: string;
  cta: string;
  accentColor: string;
}

export interface RemoteProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
}

export interface HomeApiState {
  dishes: Dish[];
  categories: string[];
  promoBanner: PromoBanner;
  profile: RemoteProfile;
}

export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
});

const fallbackProfile: RemoteProfile = {
  email: 'user@foodexpress.com',
  name: 'Food Explorer',
  phone: '+91 98765 43210',
  address: 'Flat 402, Springdale Apartments, Indiranagar, Bengaluru - 560038',
};

const fallbackBanner: PromoBanner = {
  id: 'banner-1',
  title: 'Fresh Picks Today',
  message: 'Enjoy chef-curated meals and free delivery on your first order.',
  cta: 'Order now',
  accentColor: '#FF5200',
};

const palette = ['#FFE8D6', '#E8F5E9', '#FFF8E1', '#FFE5EC', '#ECEFF1'];

const cuisineMapping: Record<string, string> = {
  beauty: 'Desserts',
  fragrances: 'Indian',
  groceries: 'Fast Food',
  home: 'Italian',
  laptop: 'Chinese',
  skincare: 'Desserts',
  smartphones: 'Fast Food',
};

export const sanitizeCategoryValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.trim() || 'Indian';
  }

  if (value && typeof value === 'object') {
    const candidate = (value as Record<string, unknown>).name
      ?? (value as Record<string, unknown>).title
      ?? (value as Record<string, unknown>).label
      ?? '';
    return sanitizeCategoryValue(candidate);
  }

  return 'Indian';
};

const FOOD_ONLY_KEYWORDS = [
  'pizza', 'burger', 'biryani', 'curry', 'paneer', 'noodles', 'pasta', 'roll', 'fries',
  'thali', 'tikka', 'masala', 'dosa', 'idli', 'rice', 'naan', 'cake', 'dessert', 'coffee',
  'tea', 'shake', 'meal', 'sandwich', 'momo', 'chicken', 'fish', 'mutton', 'egg', 'kebab',
  'soup', 'salad', 'dinner', 'lunch', 'breakfast', 'snack', 'food', 'cuisine', 'restaurant'
];

export const sanitizeFoodProduct = (product: any): boolean => {
  if (!product) return false;

  const combined = [
    product.title,
    product.name,
    product.category,
    product.cuisine,
    product.description,
    product.brand,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (!combined) return false;

  const isClearlyNonFood = /bed|sofa|chair|table|lamp|furniture|watch|phone|laptop|shoes|bag|skincare|fragrance|perfume|makeup|cosmetic|book|headphone|camera|tv|speaker|keyboard|monitor/i.test(combined);
  if (isClearlyNonFood) return false;

  return FOOD_ONLY_KEYWORDS.some((keyword) => combined.includes(keyword));
};

export const sanitizeCategoryList = (categories: unknown[]): string[] => {
  const cleaned = categories
    .map((category) => sanitizeCategoryValue(category))
    .filter((category, index, all) => category && all.indexOf(category) === index);

  return cleaned.length ? cleaned.slice(0, 5).map((category) => cuisineMapping[category.toLowerCase()] ?? category) : [...CUISINES];
};

const mapCategoryName = (value?: string): Dish['cuisine'] => {
  const cleaned = String(value || 'Indian').toLowerCase();
  const mapped = cuisineMapping[cleaned];
  if (mapped) return mapped as Dish['cuisine'];
  return (CUISINES[Math.abs(cleaned.length) % CUISINES.length] ?? 'Indian') as Dish['cuisine'];
};

const mapCuisineEmoji = (cuisine: Dish['cuisine']): string => {
  const lookup: Record<Dish['cuisine'], string> = {
    Indian: 'ðŸ›',
    Chinese: 'ðŸ¥¢',
    Italian: 'ðŸ•',
    'Fast Food': 'ðŸ”',
    Desserts: 'ðŸ°',
  };
  return lookup[cuisine] || 'ðŸ½ï¸';
};

const mapSpiceLevel = (value: number): Dish['spiceLevel'] => {
  if (value >= 68) return 'Hot';
  if (value >= 34) return 'Medium';
  return 'Mild';
};

const normalizeDish = (product: any, index: number): Dish => {
  const cuisine = mapCategoryName(product?.category ?? product?.cuisine ?? 'Indian');
  const price = Number(product?.price ?? 249) || 249;
  const rating = Number(product?.rating ?? 4.5) || 4.5;
  const healthScore = Math.min(100, Math.max(20, Math.round((100 - ((index % 5) * 12 + price / 9)) / 1.4)));
  const cravingScore = Math.min(100, Math.round(rating * 18 + ((index % 4) * 9)));

  return {
    id: `api-${product?.id ?? index + 1}`,
    name: product?.title ?? product?.name ?? `Chef Special ${index + 1}`,
    cuisine,
    description: product?.description ?? 'Freshly prepared for a flavorful dining experience.',
    spiceLevel: mapSpiceLevel(rating * 20),
    price,
    rating,
    deliveryTime: `${20 + ((index % 4) * 6)}-${30 + ((index % 4) * 7)} mins`,
    cravingScore,
    restaurantId: "api_rest_",
    restaurantName: "API Kitchen ",
    healthScore,
    color: palette[index % palette.length],
    emoji: mapCuisineEmoji(cuisine),
    imageUrl: product?.thumbnail ?? product?.images?.[0] ?? 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',

    isFlashDeal: index % 3 === 0,
    discountPercent: index % 3 === 0 ? 15 + (index % 4) * 5 : undefined,
  };
};

export const fetchDishAndCategoryData = async (): Promise<HomeApiState> => {
  try {
    const [dishesResponse, categoriesResponse] = await Promise.all([
      fetch('https://dummyjson.com/products?limit=12'),
      fetch('https://dummyjson.com/products/categories'),
    ]);

    if (!dishesResponse.ok || !categoriesResponse.ok) {
      throw new Error('API request failed.');
    }

    const dishesJson = await dishesResponse.json();
    const categoriesJson = await categoriesResponse.json();

    const remoteDishes = Array.isArray(dishesJson?.products)
      ? dishesJson.products.filter(sanitizeFoodProduct).map(normalizeDish)
      : DISHES;

    const remoteCategories = Array.isArray(categoriesJson)
      ? sanitizeCategoryList(categoriesJson)
      : [...CUISINES];

    return {
      dishes: remoteDishes.length ? remoteDishes : DISHES,
      categories: remoteCategories.length ? remoteCategories : [...CUISINES],
      promoBanner: fallbackBanner,
      profile: fallbackProfile,
    };
  } catch (error) {
    console.warn('Using fallback food data because the live API was unavailable:', error);
    return {
      dishes: DISHES,
      categories: [...CUISINES],
      promoBanner: fallbackBanner,
      profile: fallbackProfile,
    };
  }
};

export const fetchProfileData = async (email?: string): Promise<RemoteProfile> => {
  try {
    const { data } = await apiClient.get('/users/1');
    const fullName = [data?.firstName, data?.lastName].filter(Boolean).join(' ') || 'Food Explorer';
    return {
      email: email || data?.email || fallbackProfile.email,
      name: fullName,
      phone: data?.phone || fallbackProfile.phone,
      address: data?.address?.address || fallbackProfile.address,
    };
  } catch (error) {
    console.warn('Using fallback profile data because the live profile API was unavailable:', error);
    return fallbackProfile;
  }
};

export const fetchPromoBanner = async (): Promise<PromoBanner> => {
  try {
    const { data } = await apiClient.get('/posts/1');
    return {
      id: String(data?.id || 'banner-1'),
      title: data?.title || fallbackBanner.title,
      message: data?.body || fallbackBanner.message,
      cta: 'Explore deals',
      accentColor: '#FF5200',
    };
  } catch (error) {
    console.warn('Using fallback promo banner because the live banner API was unavailable:', error);
    return fallbackBanner;
  }
};


