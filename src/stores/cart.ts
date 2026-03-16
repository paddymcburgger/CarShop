import { atom, computed } from 'nanostores';
import { products } from '../data/products';

export interface CartItem {
  slug: string;
  stripePriceId: string;
  quantity: number;
}

// ── State ──

export const cartItems = atom<CartItem[]>(loadCart());

// ── Computed ──

export const cartCount = computed(cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartTotal = computed(cartItems, (items) =>
  items.reduce((sum, item) => {
    const product = products.find((p) => p.slug === item.slug);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0)
);

// ── Actions ──

export function addToCart(slug: string, stripePriceId: string) {
  const items = cartItems.get();
  const existing = items.find((i) => i.slug === slug);

  if (existing) {
    cartItems.set(
      items.map((i) => (i.slug === slug ? { ...i, quantity: i.quantity + 1 } : i))
    );
  } else {
    cartItems.set([...items, { slug, stripePriceId, quantity: 1 }]);
  }
  saveCart();
}

export function removeFromCart(slug: string) {
  cartItems.set(cartItems.get().filter((i) => i.slug !== slug));
  saveCart();
}

export function updateQuantity(slug: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(slug);
    return;
  }
  cartItems.set(
    cartItems.get().map((i) => (i.slug === slug ? { ...i, quantity } : i))
  );
  saveCart();
}

export function clearCart() {
  cartItems.set([]);
  saveCart();
}

// ── Persistence (sessionStorage) ──

function saveCart() {
  try {
    sessionStorage.setItem('cart', JSON.stringify(cartItems.get()));
  } catch {}
}

function loadCart(): CartItem[] {
  try {
    const stored = sessionStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
