import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No items provided' }), {
        status: 400,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((item: { stripePriceId: string; quantity: number }) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ['LV', 'EE', 'LT'],
      },
      success_url: `${import.meta.env.SITE}/shop/success/`,
      cancel_url: `${import.meta.env.SITE}/shop/cart/`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Checkout error:', err.message);
    return new Response(JSON.stringify({ error: 'Checkout failed' }), {
      status: 500,
    });
  }
};
