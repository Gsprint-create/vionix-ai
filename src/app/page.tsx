"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ToolPreview = {
  name: string;
  status: "Live" | "Coming soon" | "Planned";
  desc: string;
  bullets: string[];
  gradient: string; // tailwind gradient classes
};

export default function HomePage() {
  const [openAbout, setOpenAbout] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // --- Wide carousel data (placeholders, not links) ---
  const toolPreviews: ToolPreview[] = useMemo(
    () => [
      {
        name: "MorphAI FaceSwap",
        status: "Live",
        desc: "Swap faces cleanly with a creator-friendly workflow. Source → Target, fast results.",
        bullets: ["Single swap", "Multi-face mapping", "Download result"],
        gradient: "from-blue-500/25 via-cyan-500/10 to-purple-500/20",
      },
      {
        name: "GeniX",
        status: "Coming soon",
        desc: "Text-to-image generation with style presets and prompt helpers for consistent output.",
        bullets: ["Style presets", "Upscale & variations", "History gallery"],
        gradient: "from-emerald-500/20 via-teal-500/10 to-blue-500/20",
      },
      {
        name: "AI Influencer Generator",
        status: "Coming soon",
        desc: "Build persona packs and content pipelines for consistent characters and branding.",
        bullets: ["Persona packs", "Content templates", "Batch creation"],
        gradient: "from-fuchsia-500/20 via-pink-500/10 to-orange-500/20",
      },
      {
        name: "LipSync",
        status: "Planned",
        desc: "Sync voice to video with clean timing and export-ready formats.",
        bullets: ["Audio → video sync", "Mouth control", "Export presets"],
        gradient: "from-yellow-500/20 via-orange-500/10 to-red-500/20",
      },
    ],
    []
  );

  const carouselRef = useRef<HTMLDivElement | null>(null);

  function scrollCarousel(dir: "left" | "right") {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenAbout(false);
    }
    if (openAbout) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openAbout]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!openAbout) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openAbout]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_20%,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_90%_35%,rgba(236,72,153,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />
      </div>

      {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
            <span className="text-xs font-semibold text-white/80">VX</span>
          </div>
          <div>
            <div className="text-sm font-semibold">Vionix AI</div>
            <div className="text-xs text-white/50">MorphAI • Creative tools</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenAbout(true)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          >
            What is Vionix?
          </button>

          <a
            href="/tools/faceswap"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            Enter MorphAI →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              One platform.
              <span className="block text-white/70">Multiple creative AI tools.</span>
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
              <span className="text-white/90 font-medium">Vionix AI</span> is the umbrella.
              Inside it, <span className="text-white/90 font-medium">MorphAI</span> is the tool hub —
              FaceSwap is live, more tools are coming.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="/tools/faceswap"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition"
              >
                Enter MorphAI →
              </a>

              <button
                onClick={() => setOpenAbout(true)}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 hover:bg-white/10 transition"
              >
                What is Vionix?
              </button>

              <div className="text-xs text-white/40">
                (Previews below are placeholders — not clickable yet)
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/80">Fast</div>
                <div className="mt-1 text-sm text-white/60">Simple flows, minimal steps.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/80">Clean UI</div>
                <div className="mt-1 text-sm text-white/60">Made for normal users.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/80">Roadmap</div>
                <div className="mt-1 text-sm text-white/60">More tools will unlock.</div>
              </div>
            </div>
          </div>

          {/* Right “poster” */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/90">MorphAI Preview</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Coming soon: full access
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                <div className="h-28 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/15" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
                  <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
                  <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
                </div>
                <div className="h-12 rounded-xl border border-white/10 bg-white/5" />
              </div>
              <div className="mt-4 text-xs text-white/50">
                You’ll see tools, progress, and results — all in one clean hub.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wide carousel previews */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">What you’ll get inside MorphAI</h2>
            <p className="mt-1 text-sm text-white/60">
              Preview cards (placeholders) — screenshots will replace these later.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollCarousel("left")}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative mt-5">
          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black/90 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black/90 to-transparent" />

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {toolPreviews.map((t) => (
              <article
                key={t.name}
                className="snap-start shrink-0 w-[88vw] sm:w-[72vw] lg:w-[58vw] rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                {/* Preview placeholder “image” */}
                <div className={`relative h-56 sm:h-64 bg-gradient-to-br ${t.gradient}`}>
                  <div className="absolute inset-0 bg-black/25" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80">
                      Preview
                    </span>
                    <span
                      className={`rounded-full border border-white/10 px-3 py-1 text-xs ${
                        t.status === "Live"
                          ? "bg-emerald-500/15 text-emerald-200"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  {/* Fake UI blocks */}
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
                    <div className="h-10 rounded-xl border border-white/10 bg-black/30" />
                    <div className="h-10 rounded-xl border border-white/10 bg-black/30" />
                    <div className="h-10 rounded-xl border border-white/10 bg-black/30" />
                  </div>
                </div>

                {/* Text */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">{t.name}</h3>
                      <p className="mt-1 text-sm text-white/65 leading-relaxed">{t.desc}</p>
                    </div>
                    <div className="hidden md:block text-xs text-white/40">Not clickable</div>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {t.bullets.map((b) => (
                      <div
                        key={b}
                        className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/70"
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-2 text-center text-xs text-white/40 sm:hidden">Swipe to preview →</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/70">
            <span className="text-white/90 font-semibold">Vionix AI</span> • MorphAI tools • Built in public
          </div>
          <div className="flex gap-4 text-xs text-white/50">
            <a href="/terms" className="hover:text-white/80">
              Terms
            </a>
            <a href="/privacy" className="hover:text-white/80">
              Privacy
            </a>
          </div>
        </div>
      </footer>

      {/* ✅ Modal (About + T&C summary) */}
      {openAbout && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <button
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpenAbout(false)}
          />

          {/* Panel */}
          <div className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1a] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-white">What is Vionix AI?</h2>
                <p className="text-sm text-white/60">Platform overview + Terms & Conditions</p>
              </div>
              <button
                onClick={() => setOpenAbout(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              {/* About */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white/90">The short version</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  <span className="text-white/90 font-medium">Vionix AI</span> is the umbrella platform.
                  Inside it lives <span className="text-white/90 font-medium">MorphAI</span> — the tool hub.
                  MorphAI hosts creative tools like FaceSwap, image generation, and more.
                </p>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/80">Vionix AI</div>
                    <div className="mt-1 text-sm text-white/60">The platform, roadmap, accounts & future tools.</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/80">MorphAI</div>
                    <div className="mt-1 text-sm text-white/60">The tool hub where you actually use features.</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/80">FaceSwap</div>
                    <div className="mt-1 text-sm text-white/60">First live tool. Upload source + target and swap.</div>
                  </div>
                </div>
              </section>

              <div className="my-6 h-px bg-white/10" />

              {/* Terms */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white/90">Terms & Conditions (summary)</h3>
                <p className="text-xs text-white/50">
                  This is a practical short version for the UI. For a full legal document, you can publish a
                  dedicated /terms page later.
                </p>

                <div className="space-y-3 text-sm text-white/70 leading-relaxed">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">1) Allowed use</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Use the tools for lawful, personal or commercial creative work.</li>
                      <li>Don’t use it to harass, defame, scam, or impersonate people for harm.</li>
                      <li>Don’t upload illegal content.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">2) You own your uploads</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>You keep ownership of images you upload.</li>
                      <li>You confirm you have rights/permission to use uploaded images.</li>
                      <li>Outputs are provided “as-is”.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">3) Privacy</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Uploads are processed to produce your result.</li>
                      <li>We may keep temporary files for performance/debugging, then remove them.</li>
                      <li>We don’t sell your uploads.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">4) Safety</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Don’t upload images of minors.</li>
                      <li>Don’t create content meant to deceive or exploit others.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">5) Availability</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Service may change, be updated, or temporarily unavailable.</li>
                      <li>We’re not liable for indirect losses from downtime.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Agreement */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-sm text-white/70">
                    I understand and agree to the Terms & Conditions summary above.
                  </span>
                </label>

                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    onClick={() => setOpenAbout(false)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                    disabled={!agreed}
                    title={!agreed ? "Please accept the terms first" : ""}
                    style={{ opacity: agreed ? 1 : 0.5 }}
                  >
                    Continue
                  </button>

                  <button
                    onClick={() => setOpenAbout(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-4 text-xs text-white/40 flex items-center gap-4">
              <a href="/terms" className="text-white/60 hover:text-white">
                Terms
              </a>
              <a href="/privacy" className="text-white/60 hover:text-white">
                Privacy
              </a>
              <span className="ml-auto">© {new Date().getFullYear()} Vionix AI</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
