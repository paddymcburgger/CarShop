export type Category = 'air-fresheners' | 'jdm';
export type Subcategory = 'fruity' | 'masculine' | 'feminine' | 'fresh';

export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number; // cents (EUR)
  currency: 'eur';
  image: string;
  category: Category;
  subcategory?: Subcategory;
  inStock: boolean;
  stripePriceId: string;
}

export const categories: Record<Category, { name: string; description: string }> = {
  'air-fresheners': {
    name: 'Air Fresheners',
    description: 'Premium Japanese car air fresheners. Eikosha Air Spencer and more.',
  },
  jdm: {
    name: 'JDM Accessories',
    description: 'Authentic Japanese Domestic Market accessories for your ride.',
  },
};

export const subcategories: Record<Subcategory, string> = {
  fruity: 'Fruity',
  masculine: 'Masculine',
  feminine: 'Feminine',
  fresh: 'Fresh',
};

export const products: Product[] = [
  // ── Air Fresheners — Fruity ──
  {
    slug: 'air-spencer-black-tropical-squash',
    name: 'Air Spencer Black — Tropical Squash',
    description:
      'Eikosha Air Spencer Black series. Tropical Squash (A53). Bold tropical fruit scent with long-lasting fragrance.',
    price: 1200,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'fruity',
    inStock: false,
    stripePriceId: 'price_placeholder_1',
  },
  {
    slug: 'air-spencer-apple',
    name: 'Air Spencer — Apple',
    description:
      'Classic Eikosha Air Spencer. Crisp green apple fragrance. The original JDM air freshener.',
    price: 1000,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'fruity',
    inStock: true,
    stripePriceId: 'price_placeholder_2',
  },
  {
    slug: 'air-spencer-lemon-lime',
    name: 'Air Spencer — Lemon Lime',
    description:
      'Eikosha Air Spencer citrus blend. Zesty lemon-lime scent that keeps your cabin fresh.',
    price: 1000,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'fruity',
    inStock: true,
    stripePriceId: 'price_placeholder_3',
  },

  // ── Air Fresheners — Masculine ──
  {
    slug: 'air-spencer-black-squash',
    name: 'Air Spencer Black — Squash',
    description:
      'Eikosha Air Spencer Black series. The iconic Squash scent (A52). Deep, sophisticated male fragrance.',
    price: 1200,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'masculine',
    inStock: true,
    stripePriceId: 'price_placeholder_4',
  },
  {
    slug: 'air-spencer-dry-squash',
    name: 'Air Spencer — Dry Squash',
    description:
      'Eikosha Air Spencer Dry Squash. A drier, sharper take on the legendary Squash scent.',
    price: 1000,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'masculine',
    inStock: true,
    stripePriceId: 'price_placeholder_5',
  },

  // ── Air Fresheners — Feminine ──
  {
    slug: 'air-spencer-pink-shower',
    name: 'Air Spencer — Pink Shower',
    description:
      'Eikosha Air Spencer Pink Shower. Soft floral fragrance with a delicate feminine touch.',
    price: 1000,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'feminine',
    inStock: true,
    stripePriceId: 'price_placeholder_6',
  },
  {
    slug: 'air-spencer-white-parfum',
    name: 'Air Spencer — White Parfum',
    description:
      'Eikosha Air Spencer White Parfum. Elegant white floral scent inspired by luxury perfumes.',
    price: 1000,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'feminine',
    inStock: true,
    stripePriceId: 'price_placeholder_7',
  },

  // ── Air Fresheners — Fresh ──
  {
    slug: 'air-spencer-marine-squash',
    name: 'Air Spencer — Marine Squash',
    description:
      'Eikosha Air Spencer Marine Squash. Ocean-fresh scent with a clean aquatic character.',
    price: 1000,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'fresh',
    inStock: true,
    stripePriceId: 'price_placeholder_8',
  },
  {
    slug: 'air-spencer-clear-squash',
    name: 'Air Spencer — Clear Squash',
    description:
      'Eikosha Air Spencer Clear Squash. Light, transparent freshness for everyday driving.',
    price: 1000,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'air-fresheners',
    subcategory: 'fresh',
    inStock: true,
    stripePriceId: 'price_placeholder_9',
  },

  // ── JDM Accessories ──
  {
    slug: 'tsurikawa-ring-white',
    name: 'Tsurikawa Ring — White',
    description:
      'Classic JDM tsurikawa train handle. White colorway. The iconic Japanese car culture accessory.',
    price: 2500,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'jdm',
    inStock: true,
    stripePriceId: 'price_placeholder_10',
  },
  {
    slug: 'tsurikawa-ring-black',
    name: 'Tsurikawa Ring — Black',
    description:
      'Classic JDM tsurikawa train handle. Murdered-out black edition. Fits any interior.',
    price: 2500,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'jdm',
    inStock: true,
    stripePriceId: 'price_placeholder_11',
  },
  {
    slug: 'jdm-fusa-kiku-knot-red',
    name: 'Fusa Kiku Knot — Red',
    description:
      'Traditional Japanese fusa charm (kiku knot). Red and gold. Hang from your rearview mirror.',
    price: 1800,
    currency: 'eur',
    image: 'placeholder.jpg',
    category: 'jdm',
    inStock: true,
    stripePriceId: 'price_placeholder_12',
  },
];

// ── Helpers ──

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsBySubcategory(category: Category, sub: Subcategory): Product[] {
  return products.filter((p) => p.category === category && p.subcategory === sub);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, count);
}
