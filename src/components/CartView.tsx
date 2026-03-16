import { useStore } from '@nanostores/preact';
import { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } from '../stores/cart';
import { products } from '../data/products';

export default function CartView() {
  const items = useStore(cartItems);
  const total = useStore(cartTotal);

  async function handleCheckout() {
    if (items.length === 0) return;

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            stripePriceId: i.stripePriceId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } catch (err) {
      alert('Checkout error. Please try again.');
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '1.5rem' }}>
          Your cart is empty
        </p>
        <a
          href="/shop/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            border: '1px solid #222',
            color: '#e8e8e8',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
          }}
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item) => {
          const product = products.find((p) => p.slug === item.slug);
          if (!product) return null;
          const itemTotal = (product.price * item.quantity / 100).toFixed(2);

          return (
            <div
              key={item.slug}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1.25rem',
                background: '#141414',
                border: '1px solid #222',
                borderRadius: '8px',
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)',
                  borderRadius: '6px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#333',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.5rem',
                }}
              >
                {product.name.charAt(0)}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <a
                  href={`/shop/product/${product.slug}/`}
                  style={{
                    color: '#e8e8e8',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  {product.name}
                </a>
                <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  &euro;{(product.price / 100).toFixed(2)} each
                </p>
              </div>

              {/* Quantity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    color: '#e8e8e8',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    minWidth: '2rem',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    color: '#e8e8e8',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div style={{ minWidth: '70px', textAlign: 'right' }}>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.3rem',
                    color: '#e63946',
                  }}
                >
                  &euro;{itemTotal}
                </span>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.slug)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#555',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '0.25rem',
                }}
                title="Remove"
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#141414',
          border: '1px solid #222',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <span style={{ fontSize: '1rem', color: '#888' }}>Total</span>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2rem',
              color: '#e63946',
            }}
          >
            &euro;{(total / 100).toFixed(2)}
          </span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '1.5rem' }}>
          Shipping calculated at checkout
        </p>
        <button
          onClick={handleCheckout}
          style={{
            width: '100%',
            padding: '1rem',
            background: '#e63946',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Proceed to Checkout
        </button>
        <a
          href="/shop/"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '1rem',
            color: '#888',
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
