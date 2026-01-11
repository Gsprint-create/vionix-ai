import React from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import ToolCard from "../components/ToolCard";
import { Shield, Zap, Layers } from "lucide-react";

export default function Home() {
  return (
      <div className="relative z-10">
      <Hero />
      <TrustBar />
      <Section
        eyebrow="Platform"
        title="One hub for creative AI tools"
        desc="Vionix AI is your home for image generation, face swapping, influencer creation, and more — built to feel fast, clean, and professional."
      >
        <div className="grid md:grid-cols-3 gap-4">
          <Value icon={<Zap className="h-5 w-5" />} title="Fast workflows" desc="Generate, swap, export — minimal steps, maximum results." />
          <Value icon={<Shield className="h-5 w-5" />} title="Safer by design" desc="Tooling built with guardrails, privacy, and control." />
          <Value icon={<Layers className="h-5 w-5" />} title="Expandable ecosystem" desc="Add new tools under one brand without rebuilding everything." />
        </div>
      </Section>

      <Section
        eyebrow="Tools"
        title="Start with the essentials"
        desc="Launch with 2–4 tools, then expand. Each tool can live on its own subdomain or inside Vionix AI."
      >
        <div className="grid md:grid-cols-3 gap-4">
          <ToolCard
            name="MorphAI FaceSwap"
            desc="Swap faces in images with a clean UX and gallery workflow."
            status="Live"
            href="https://morphai.net"
          />
          <ToolCard
            name="GeniX (Text-to-Image)"
            desc="Generate high-quality images from prompts — style presets, upscale, export."
            status="Coming soon"
            href="/tools"
          />
          <ToolCard
            name="AI Influencer Generator"
            desc="Create consistent influencer personas and content packs."
            status="Coming soon"
            href="/tools"
          />
        </div>

        <div className="mt-8">
          <Link
            to="/tools"
            className="inline-flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-sm hover:bg-white/10 transition"
          >
            View all tools
          </Link>
        </div>
      </Section>

      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-10">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Vionix AI • Create. Morph. Transform.
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            A premium home for your
            <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              image transformation tools
            </span>
          </h1>

          <p className="mt-4 text-white/70 text-base md:text-lg max-w-xl">
            Build a real platform: clean landing pages, pricing, tool directory, and a scalable structure for everything you’re shipping under Vionix AI.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-500/80 hover:bg-blue-500 border border-blue-300/30 px-6 py-3 text-sm transition"
            >
              Start now
            </Link>
            <Link
              to="/tools"
              className="inline-flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 text-sm transition"
            >
              Explore tools
            </Link>
          </div>

          <div className="mt-6 text-xs text-white/50">
            Tip: Keep MorphAI live on morphai.net, and use Vionix AI as the umbrella hub.
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
          <div className="text-sm text-white/60">Tool Preview</div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="text-lg font-semibold">MorphAI FaceSwap</div>
            <div className="mt-2 text-sm text-white/70">
              Upload → swap → auto-save → gallery → share/export.
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Placeholder />
              <Placeholder />
              <Placeholder />
            </div>
            <div className="mt-5 flex gap-2">
              <div className="h-9 w-28 rounded-xl bg-white/10 border border-white/10" />
              <div className="h-9 w-28 rounded-xl bg-blue-500/30 border border-blue-300/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Placeholder() {
  return <div className="aspect-square rounded-xl bg-white/5 border border-white/10" />;
}

function TrustBar() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
        Built for fast deployment • Clean branding • Ready for Stripe tiers • Built to scale
      </div>
    </div>
  );
}

function Value({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/5 border border-white/10">
        {icon}
      </div>
      <div className="mt-4 font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
    </div>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-blue-500/20 p-8">
        <div className="text-2xl font-semibold tracking-tight">
          Ready to turn Vionix AI into a real platform?
        </div>
        <p className="mt-2 text-white/70 max-w-2xl">
          Next step: hook Pricing to Stripe and connect each Tool card to your real deployments (Vercel/Railway).
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/pricing" className="rounded-2xl bg-blue-500/80 hover:bg-blue-500 border border-blue-300/30 px-6 py-3 text-sm transition text-center">
            View pricing
          </Link>
          <Link to="/contact" className="rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 text-sm transition text-center">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
