import { useState } from 'preact/hooks';
import { addToCart } from '../stores/cart';

interface Props {
  slug: string;
  name: string;
  stripePriceId: string;
  inStock: boolean;
}

export default function AddToCartButton({ slug, name, stripePriceId, inStock }: Props) {
  const [added, setAdded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  function handleAddToCart() {
    addToCart(slug, stripePriceId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  async function handleNotify(e: Event) {
    e.preventDefault();
    if (!email) return;

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'notify-me');
      formData.append('email', email);
      formData.append('product', name);
      formData.append('slug', slug);

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    }
  }

  // ── In Stock: Add to Cart ──
  if (inStock) {
    return (
      <button
        onClick={handleAddToCart}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.85rem 2rem',
          background: added ? '#2ecc71' : '#e63946',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.95rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background 0.2s',
          width: '100%',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {added ? 'Added!' : 'Add to Cart'}
      </button>
    );
  }

  // ── Out of Stock: Notify Me ──
  if (submitted) {
    return (
      <div
        style={{
          padding: '1rem',
          background: '#1a2e1a',
          border: '1px solid #2ecc71',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#2ecc71',
          fontSize: '0.9rem',
          fontWeight: 500,
        }}
      >
        We'll notify you when this is available.
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          width: '100%',
        }}
      >
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
          style={{
            flex: 1,
            padding: '0.85rem 1rem',
            background: '#141414',
            border: '1px solid #333',
            borderRadius: '8px',
            color: '#e8e8e8',
            fontSize: '0.9rem',
            fontFamily: "'DM Sans', sans-serif",
            outline: 'none',
          }}
        />
        <button
          onClick={handleNotify}
          style={{
            padding: '0.85rem 1.5rem',
            background: '#e63946',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: 'nowrap',
          }}
        >
          Notify Me
        </button>
      </div>
    </div>
  );
}
