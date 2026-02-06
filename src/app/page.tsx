"use client";

import React, { useEffect, useMemo, useState } from "react";

type ToolPreview = {
  key: string;
  name: string;
  tagline: string;
  status: "Live" | "Coming soon";
  bullets: string[];
  mockLabel: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// Simple inline SVG “mock screenshot” placeholder (no external images needed)
function mockSvgDataUri(title: string, subtitle: string) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0b1220"/>
        <stop offset="45%" stop-color="#101b33"/>
        <stop offset="100%" stop-color="#0a2a24"/>
      </linearGradient>
      <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#22c55e" stop-opacity="0.55"/>
      </linearGradient>
      <filter id="blur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="20"/>
      </filter>
    </defs>

    <rect width="1400" height="800" fill="url(#g)"/>
    <circle cx="260" cy="180" r="180" fill="url(#a)" filter="url(#blur)"/>
    <circle cx="1120" cy="240" r="220" fill="url(#a)" opacity="0.55" filter="url(#blur)"/>
    <circle cx="720" cy="650" r="260" fill="url(#a)" opacity="0.35" filter="url(#blur)"/>

    <!-- “app frame” -->
    <rect x="120" y="110" rx="22" ry="22" width="1160" height="580" fill="#0b0f1a" opacity="0.88" stroke="#ffffff" stroke-opacity="0.12"/>
    <rect x="120" y="110" rx="22" ry="22" width="1160" height="64" fill="#0f1629" opacity="0.92" stroke="#ffffff" stroke-opacity="0.12"/>
    <circle cx="160" cy="142" r="7" fill="#ef4444" opacity="0.85"/>
    <circle cx="184" cy="142" r="7" fill="#f59e0b" opacity="0.85"/>
    <circle cx="208" cy="142" r="7" fill="#22c55e" opacity="0.85"/>

    <text x="170" y="250" fill="#ffffff" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto" font-size="54" font-weight="700">
      ${escapeXml(title)}
    </text>
    <text x="170" y="305" fill="#ffffff" opacity="0.72" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto" font-size="26">
      ${escapeXml(subtitle)}
    </text>

    <!-- blocks -->
    <rect x="170" y="360" width="520" height="90" rx="16" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.10"/>
    <rect x="720" y="360" width="500" height="240" rx="16" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.10"/>
    <rect x="170" y="470" width="520" height="130" rx="16" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.10"/>

    <text x="190" y="412" fill="#ffffff" opacity="0.62" font-family="Inter, system-ui" font-size="18">
      Preview placeholder (not clickable)
    </text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export default function Page() {
  // Where MorphAI lives (separate site)
  const MORPHAI_URL =
    process.env.NEXT_PUBLIC_MORPHAI_URL?.replace(/\/+$/, "") || "https://morphai.net";

  const openMorphAiUrl = `${MORPHAI_URL}/tools`;
  const enterMorphAiUrl = `${MORPHAI_URL}/tools`; // Vionix "Enter MorphAI" goes to tool hub

  // Modal state
  const [openAbout, setOpenAbout] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const tools: ToolPreview[] = useMemo(
    () => [
      {
        key: "faceswap",
        name: "MorphAI FaceSwap",
        tagline: "Swap a face into a target image in seconds.",
        status: "Live",
        bullets: ["Source → Target workflow", "Fast previews", "Simple creator UX"],
        mockLabel: "FaceSwap UI Preview",
      },
      {
        key: "genix",
        name: "GeniX Image Generator",
        tagline: "Text-to-image with presets and consistent style.",
        status: "Coming soon",
        bullets: ["Style presets", "Prompt helpers", "Use output as FaceSwap source"],
        mockLabel: "Image Generator Preview",
      },
    ],
    []
  );

  // ESC to close modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenAbout(false);
    }
    if (openAbout) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openAbout]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (!openAbout) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openAbout]);

  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_40rem_at_20%_10%,rgba(59,130,246,0.20),transparent_60%),radial-gradient(70rem_40rem_at_80%_20%,rgba(34,197,94,0.14),transparent_60%),radial-gradient(60rem_40rem_at_55%_90%,rgba(168,85,247,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
      </div>

      

      {/* Hero */}
<section className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 shadow-2xl">

    <div className="text-xs text-white/60 tracking-widest uppercase">
      Platform • Creative AI Tools
    </div>

    <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
      Vionix is the platform.
      <br />
      Tools live in MorphAI.
    </h1>

    <p className="mt-6 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
      Vionix AI is the umbrella platform. MorphAI is the tool hub — starting
      with FaceSwap, then expanding into image generation, creator pipelines,
      and more.
    </p>

    {/* Buttons */}
    <div className="mt-8 flex justify-center gap-4 flex-wrap">
      <a
        href={enterMorphAiUrl}
        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
      >
        Enter MorphAI →
      </a>

      <button
        onClick={() => {
          setAgreed(false);
          setOpenAbout(true);
        }}
        className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white hover:bg-white/10 transition"
      >
        What is Vionix?
      </button>
    </div>
  </div>
</section>


      {/* Stacked previews (FaceSwap + GeniX only) */}
      <section id="tools" className="mx-auto max-w-5xl px-6 pb-20">
  <div className="mb-10 text-center">
    <h2 className="text-3xl font-semibold tracking-tight">
      Tool Previews
    </h2>
    <p className="mt-3 text-sm text-white/60 max-w-xl mx-auto">
      Visual placeholders showing what users will see inside MorphAI.
    </p>
  </div>


        <div className="flex flex-col gap-10 items-center">
          {tools.map((t) => {
            const img = mockSvgDataUri(t.mockLabel, t.tagline);

            return (
              <article key={t.key} className="w-full">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
                  <div className="relative">
                    <img
                      src={img}
                      alt={`${t.name} preview`}
                      className="h-[260px] w-full object-cover md:h-[340px]"					  
                    />

                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span
                        className={cx(
                          "rounded-full border px-2 py-1 text-xs",
                          t.status === "Live"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                            : "border-white/10 bg-white/5 text-white/70"
                        )}
                      >
                        {t.status}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-white/70">
                        Preview placeholder
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{t.name}</h3>
                        <p className="mt-1 text-sm text-white/65">{t.tagline}</p>
                      </div>

                      <div className="mt-2 flex gap-2 md:mt-0">
                        <a
                          href={openMorphAiUrl}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                        >
                          View MorphAI
                        </a>
                        <button
                          onClick={() => setOpenAbout(true)}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                        >
                          Terms
                        </button>
                      </div>
                    </div>

                    <ul className="mt-4 grid gap-2 md:grid-cols-3">
                      {t.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Placeholder sections so nav works */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-xl font-semibold">Pricing</h2>
          <p className="mt-2 text-sm text-white/65">
            Placeholder section for now — keep it “coming soon” until you’re ready.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {["Starter", "Pro", "Enterprise"].map((p) => (
              <div key={p} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold">{p}</div>
                <div className="mt-2 text-sm text-white/60">Placeholder tier (edit anytime).</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-2 text-sm text-white/65">
            Vionix is the platform brand. MorphAI is the tool hub. This page shows what users will
            get once inside — without exposing unfinished tools.
          </p>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-sm text-white/65">
            Add your email / form later. For now this is a placeholder.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/60">© {new Date().getFullYear()} Vionix AI</div>
          <div className="flex gap-4 text-sm text-white/60">
            <button onClick={() => setOpenAbout(true)} className="hover:text-white">
              Terms
            </button>
            <a className="hover:text-white" href={openMorphAiUrl}>
              MorphAI
            </a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {openAbout && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <button
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpenAbout(false)}
          />

          {/* Panel */}
          <div className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f1a] shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-white">What is Vionix AI?</h2>
                <p className="text-sm text-white/60">Platform overview + Terms & Conditions</p>
              </div>
              <button
                onClick={() => setOpenAbout(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
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
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/80">Vionix AI</div>
                    <div className="mt-1 text-sm text-white/60">
                      The platform, roadmap, accounts & future tools.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/80">MorphAI</div>
                    <div className="mt-1 text-sm text-white/60">
                      The tool hub where you actually use features.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/80">FaceSwap</div>
                    <div className="mt-1 text-sm text-white/60">
                      First live tool. Upload source + target and swap.
                    </div>
                  </div>
                </div>
              </section>

              <div className="my-6 h-px bg-white/10" />

              {/* Terms */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white/90">Terms & Conditions (summary)</h3>
                <p className="text-xs text-white/50">
                  Practical short version for the UI. You can publish a full /terms page later.
                </p>

                <div className="space-y-3 text-sm text-white/70 leading-relaxed">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">1) Allowed use</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Use the tools for lawful creative work.</li>
                      <li>Don’t use it to harass, defame, scam, or impersonate people for harm.</li>
                      <li>Don’t upload illegal content.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">2) You own your uploads</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>You keep ownership of images you upload.</li>
                      <li>You confirm you have the rights/permission to use uploaded images.</li>
                      <li>Outputs are provided “as-is”.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">3) Privacy</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Uploads are processed to produce your result.</li>
                      <li>Temporary files may be kept for performance/debugging, then removed.</li>
                      <li>We don’t sell your uploads.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">4) Safety</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Don’t upload images of minors.</li>
                      <li>Don’t create content meant to deceive or exploit others.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">5) Availability</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Service may change, be updated, or temporarily unavailable.</li>
                      <li>No liability for indirect losses from downtime.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Agreement */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
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
                    disabled={!agreed}
                    className={cx(
                      "rounded-xl px-4 py-2 text-sm font-semibold text-white",
                      agreed ? "bg-blue-600 hover:bg-blue-500" : "bg-white/10 text-white/40"
                    )}
                    title={!agreed ? "Please accept the terms first" : ""}
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
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-xs text-white/40">
              <span>Tip: publish full Terms/Privacy pages later.</span>
              <button onClick={() => setOpenAbout(false)} className="text-white/60 hover:text-white">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
