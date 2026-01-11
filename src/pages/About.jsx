import React from "react";
import Section from "../components/Section";

export default function About() {
  return (
    <div className="relative z-10">
      <Section
        eyebrow="About"
        title="Built for creators who want control"
        desc="Vionix AI is an umbrella platform for creative AI tools: fast workflows, clean UI, and scalable deployments."
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
          <p>
            Vionix AI is designed as a platform — not a single tool. Each module can be deployed independently
            (Vercel/Railway) while the main site remains the home base for discovery, pricing, and growth.
          </p>
          <p className="mt-3">
            Next upgrades: account system, Stripe billing, tool dashboards, and a unified gallery profile.
          </p>
        </div>
      </Section>
    </div>
  );
}
