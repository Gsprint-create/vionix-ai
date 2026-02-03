"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [openAbout, setOpenAbout] = useState(false);
  const [agreed, setAgreed] = useState(false);

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
    <main className="min-h-screen">
      {/* ...your existing page... */}

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <a
          href="/tools/faceswap"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Enter MorphAI →
        </a>

        <button
          type="button"
          onClick={() => setOpenAbout(true)}
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
        >
          What is Vionix?
        </button>
      </div>

      {/* ✅ Modal */}
      {openAbout && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
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
                <p className="text-sm text-white/60">
                  Platform overview + Terms & Conditions
                </p>
              </div>
              <button
                onClick={() => setOpenAbout(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            {/* Body (scrollable) */}
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
                    <div className="mt-1 text-sm text-white/60">
                      The platform, roadmap, accounts & future tools.
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/80">MorphAI</div>
                    <div className="mt-1 text-sm text-white/60">
                      The tool hub where you actually use features.
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/80">FaceSwap</div>
                    <div className="mt-1 text-sm text-white/60">
                      First live tool. Upload source + target and swap.
                    </div>
                  </div>
                </div>
              </section>

              {/* Divider */}
              <div className="my-6 h-px bg-white/10" />

              {/* Terms */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white/90">Terms & Conditions (summary)</h3>
                <p className="text-xs text-white/50">
                  This is a practical short version for the UI. For a full legal document, you can publish
                  a dedicated /terms page later.
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
                      <li>You confirm you have the rights/permission to use uploaded images.</li>
                      <li>Generated outputs are provided “as-is”.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/85 font-medium">3) Privacy</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>We process uploads to produce your result.</li>
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
            <div className="border-t border-white/10 px-6 py-4 text-xs text-white/40">
              <a href="/terms" className="text-white/60 hover:text-white">Terms</a>
              <a href="/privacy" className="text-white/60 hover:text-white">Privacy</a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
