const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_MAP = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO
};

const TRIAL_FEE_PRICE = process.env.STRIPE_TRIAL_FEE_PRICE;

module.exports = async function handler(req, res) {
  try {
    const host = req.headers.host;
    const proto = req.headers["x-forwarded-proto"] || "http";
    const url = new URL(req.url, `${proto}://${host}`);
    const plan = url.searchParams.get("plan");

    if (!plan || !PRICE_MAP[plan]) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    const siteUrl = process.env.VITE_SITE_URL || "http://localhost:3000";

    const lineItems = [{ price: PRICE_MAP[plan], quantity: 1 }];

    // Optional: €2 one-time "trial fee" only for Pro
    if (plan === "pro" && TRIAL_FEE_PRICE) {
      lineItems.unshift({ price: TRIAL_FEE_PRICE, quantity: 1 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      subscription_data: {
        trial_period_days: plan === "pro" ? 7 : undefined
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
      allow_promotion_codes: true
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
