"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onEnter?: () => void; // optional: if you want to navigate programmatically
};

export default function VionixInfoModal({ open, onClose, onEnter }: Props) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-3xl w-[94%] rounded-2xl border border-white/10 bg-[#0b0f1a] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              What you get inside Vionix
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Vionix is the platform. <span className="text-white/80 font-medium">MorphAI</span> is the first live tool inside.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 transition"
          >
            Close
          </button>
        </div>

        {/* Benefits */}
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            { title: "Clean Workflow", desc: "Upload → Swap → Download. Simple and fast." },
            { title: "High-Quality Face Swap", desc: "Powered by inswapper_128 with face detection." },
            { title: "Creator-Friendly UI", desc: "Dark UI, previews, and smooth results flow." },
            { title: "Multi-Face Mode", desc: "Assign sources to faces (optional mode)." },
            { title: "Privacy Respect", desc: "No public galleries. Your files are yours." },
            { title: "Built to Scale", desc: "Subscriptions + accounts ready to plug in later." },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-sm font-semibold text-white">{b.title}</div>
              <div className="mt-1 text-xs text-white/60 leading-relaxed">
                {b.desc}
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
          <div className="text-sm font-semibold text-white">How it works</div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <Step n="1" title="Upload" desc="Choose a source face and a target image." />
            <Step n="2" title="Swap" desc="Run the swap (single or multi-face mode)." />
            <Step n="3" title="Download" desc="Preview the result and download instantly." />
          </div>
        </div>

        {/* Included now / coming soon */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Live now</div>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300 border border-emerald-500/20">
                Available
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• MorphAI FaceSwap (single swap)</li>
              <li>• Optional multi-face mode</li>
              <li>• Fast result preview + download</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Coming soon</div>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/60 border border-white/10">
                Roadmap
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>• GeniX (text-to-image)</li>
              <li>• AI Influencer Generator</li>
              <li>• Accounts + subscriptions</li>
            </ul>
          </div>
        </div>

        {/* Responsibility + Legal */}
        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
          Use responsibly: only upload content you own or have permission to use. No impersonation, fraud, or harmful use.
          <div className="mt-2 flex gap-4">
            <a href="/terms" className="text-blue-400 hover:text-blue-300 transition">
              Terms
            </a>
            <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition">
              Privacy
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="text-xs text-white/50">
            Ready? Enter MorphAI to use the FaceSwap tool.
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
            >
              Not now
            </button>

            <a
              href="/tools/faceswap"
              onClick={(e) => {
                // if you want a custom navigation, use onEnter instead of href
                if (onEnter) {
                  e.preventDefault();
                  onEnter();
                }
              }}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
            >
              Enter MorphAI →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/20 text-blue-300 text-xs border border-blue-500/20">
          {n}
        </span>
        <div className="text-sm font-semibold text-white">{title}</div>
      </div>
      <div className="mt-1 text-xs text-white/60 leading-relaxed">{desc}</div>
    </div>
  );
}
