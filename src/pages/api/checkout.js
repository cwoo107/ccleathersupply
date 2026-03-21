import Stripe from 'stripe';

export const prerender = false;

export async function POST({ request }) {
    const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_SECRET_KEY);

    try {
        const { items } = await request.json();

        if (!items || items.length === 0) {
            return new Response(JSON.stringify({ error: 'Cart is empty' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: item.leather ? `Leather: ${item.leather}` : undefined,
                    images: item.image ? [item.image] : [],
                    metadata: { sku: item.sku },
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${import.meta.env.SITE_URL || 'http://localhost:4321'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${import.meta.env.SITE_URL || 'http://localhost:4321'}/cart`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 0, currency: 'usd' },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 7 },
                            maximum: { unit: 'business_day', value: 14 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 600, currency: 'usd' },
                        display_name: 'Standard shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 5 },
                            maximum: { unit: 'business_day', value: 7 },
                        },
                    },
                },
            ],
            allow_promotion_codes: true,
            metadata: { source: 'ccleathersupply.com' },
        });

        return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        console.error('Stripe error:', err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}