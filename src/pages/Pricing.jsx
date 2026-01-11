import React from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section";

export default function Pricing() {
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Starter",
      price: "€0",
      note: "free",
      perks: ["Basic access", "Standard speed", "Community updates"],
      cta: "Get Started (Free)",
      action: async () => {
        // Choose ONE:
        // window.location.href = "https://morphai.net"; // send to tool immediately
        navigate("/tools"); // or show your tools directory first
      },
    },
    {
      name: "Pro",
      price: "€19",
      note: "per month",
      perks: ["Higher limits", "Faster processing", "Priority upgrades"],
      featured: true,
      cta: "Start 7-day trial (€2)",
      action: async () => {
        try {
          const res = await fetch(`/api/checkout?plan=pro`);
          const data = await res.json();

          if (data?.url) window.location.href = data.url;
          else alert(data?.error || "Checkout failed. Try again.");
        } catch (e) {
          alert("Checkout failed. Try again.");
        }
      },
      footnote: "€2 today • 7-day trial • then €19/month. Cancel anytime.",
    },
    {
      name: "Enterprise",
      price: "Custom",
      note: "team / API",
      perks: ["Dedicated support", "Custom limits", "Deployment options"],
      cta: "Contact Sales",
      action: async () => navigate("/contact"),
    },
  ];

  return (
    <div className="relative z-10">
      <Section
        eyebrow="Pricing"
        title="Simple plans that scale"
        desc="Start free, then upgrade when you need higher limits and faster processing."
      >
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={[
                "rounded-3xl border p-6 shadow-xl shadow-black/30",
                t.featured
                  ? "border-blue-300/30 bg-blue-500/10"
                  : "border-white/10 bg-white/5",
              ].join(" ")}
            >
              <div className="text-lg font-semibold">{t.name}</div>

              <div className="mt-4 flex items-end gap-2">
                <div className="text-4xl font-semibold">{t.price}</div>
                <div className="text-sm text-white/60 pb-1">{t.note}</div>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-blue-200">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <button
                className={[
                  "mt-6 w-full rounded-2xl px-4 py-3 text-sm border transition",
                  t.featured
                    ? "bg-blue-500/80 hover:bg-blue-500 border-blue-300/30"
                    : "bg-white/5 hover:bg-white/10 border-white/10",
                ].join(" ")}
                onClick={t.action}
              >
                {t.cta}
              </button>

              <div className="mt-3 text-xs text-white/40">
                {t.footnote ||
                  (t.name === "Starter"
                    ? "No card required. Upgrade anytime."
                    : t.name === "Enterprise"
                      ? "Let’s talk about custom needs."
                      : "")}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
