import { useState } from 'preact/hooks';
import { addToCart } from '../stores/cart';

interface Props {
  slug: string;
  stripePriceId: string;
  inStock: boolean;
}

export default function AddToCartButton({ slug, stripePriceId, inStock }: Props) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (!inStock) return;
    addToCart(slug, stripePriceId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      disabled={!inStock}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.85rem 2rem',
        background: !inStock ? '#333' : added ? '#2ecc71' : '#e63946',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        border: 'none',
        borderRadius: '8px',
        cursor: inStock ? 'pointer' : 'not-allowed',
        transition: 'background 0.2s, transform 0.15s',
        width: '100%',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {!inStock ? 'Out of Stock' : added ? 'Added!' : 'Add to Cart'}
    </button>
  );
}
