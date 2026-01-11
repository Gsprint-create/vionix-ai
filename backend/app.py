import stripe
from flask import Flask, request, jsonify

app = Flask(__name__)

stripe.api_key = "sk_live_xxx"  # from Stripe dashboard

TRIAL_PRICE_ID = "price_trial_xxx"
SUBSCRIPTION_PRICE_ID = "price_sub_xxx"

@app.route("/create-checkout-session", methods=["POST"])
def create_checkout():
    session = stripe.checkout.Session.create(
        mode="payment",
        payment_method_types=["card"],
        line_items=[{
            "price": TRIAL_PRICE_ID,
            "quantity": 1,
        }],
        success_url="https://www.vionix-ai.com/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="https://www.vionix-ai.com/pricing",
    )
    return jsonify({"url": session.url})

@app.route("/create-subscription", methods=["POST"])
def create_subscription():
    data = request.json
    customer_id = data["customer_id"]

    stripe.Subscription.create(
        customer=customer_id,
        items=[{"price": SUBSCRIPTION_PRICE_ID}],
        trial_period_days=7
    )

    return jsonify({"status": "ok"})
