"use client";

import { useEffect, useMemo, useState } from "react";

type Tab = "about" | "terms" | "privacy";

function cn(...x: Array<string | false | undefined | null>) {
  return x.filter(Boolean).join(" ");
}

function useLocalStorageBool(key: string, defaultValue: boolean) {
  const [val, setVal] = useState(defaultValue);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return;
      setVal(raw === "true");
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(key, String(val));
    } catch {}
  }, [key, val]);

  return [val, setVal] as const;
}

function sectionId(tab: Tab) {
  return tab === "about" ? "about" : tab === "terms" ? "terms" : "privacy";
}

export default function AboutTermsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("about");
  const [agreed, setAgreed] = useLocalStorageBool("vionix_terms_agreed", false);
  const [dontShowAgain, setDontShowAgain] = useLocalStorageBool(
    "vionix_about_modal_dont_show_again",
    false
  );

  // Only show the modal if open is true AND user didn't opt-out
  const visible = open && !dontShowAgain;

  // Close on ESC
  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  // Lock scroll
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const title = useMemo(() => {
    if (tab === "about") return "What is Vionix AI?";
    if (tab === "terms") return "Terms & Conditions";
    return "Privacy";
  }, [tab]);

  async function copyLink(path: string) {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch {
      prompt("Copy this link:", url);
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1a] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-sm text-white/60">
              Vionix platform • MorphAI tools • quick legal basics
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 px-6 py-3">
          {(["about", "terms", "privacy"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm transition border",
                tab === t
                  ? "bg-blue-600/30 border-blue-400/30 text-white"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
              )}
            >
              {t === "about" ? "About" : t === "terms" ? "Terms" : "Privacy"}
            </button>
          ))}

          <div className="ml-auto flex gap-2">
            <button
              onClick={() => copyLink(`/${sectionId(tab)}` === "/about" ? "/" : `/${sectionId(tab)}`)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
              title="Copy link to this section"
            >
              Copy link
            </button>

            <a
              href={tab === "terms" ? "/terms" : tab === "privacy" ? "/privacy" : "/"}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
              title="Open the full page"
            >
              Open full page
            </a>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {tab === "about" && (
            <section className="space-y-4" id="about">
              <p className="text-sm text-white/70 leading-relaxed">
                <span className="text-white/90 font-semibold">Vionix AI</span> is the umbrella platform.
                Inside it lives <span className="text-white/90 font-semibold">MorphAI</span> — the tool hub.
                MorphAI hosts creative tools like FaceSwap and future generators.
              </p>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold text-white/80">Vionix AI</div>
                  <div className="mt-1 text-sm text-white/60">
                    Platform, roadmap, accounts, pricing, and the “home”.
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold text-white/80">MorphAI</div>
                  <div className="mt-1 text-sm text-white/60">
                    Tool hub where features live.
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold text-white/80">FaceSwap</div>
                  <div className="mt-1 text-sm text-white/60">
                    First live tool: source → target swap.
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                <div className="text-white/90 font-medium">Why this structure?</div>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>One brand (Vionix) + many tools (MorphAI) without confusing users.</li>
                  <li>Tools can evolve independently (new tabs, plans, experiments).</li>
                  <li>Cleaner navigation + easier marketing pages.</li>
                </ul>
              </div>
            </section>
          )}

          {tab === "terms" && (
            <section className="space-y-4" id="terms">
              <p className="text-xs text-white/50">
                UI-friendly summary. Full version lives on the /terms page.
              </p>

              <div className="space-y-3 text-sm text-white/70 leading-relaxed">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/85 font-medium">1) Allowed use</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Use the tools for lawful creative work.</li>
                    <li>No harassment, scams, impersonation for harm, or illegal content.</li>
                    <li>No minors.</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/85 font-medium">2) Rights</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>You must have rights/permission to upload images you use.</li>
                    <li>You keep ownership of your uploads.</li>
                    <li>Outputs are provided as-is (no guarantee they’re perfect).</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/85 font-medium">3) Availability</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Service may change, update, or temporarily go offline.</li>
                    <li>We’re not liable for indirect losses from downtime.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-sm text-white/70">
                    I agree to the Terms (stored on this device).
                  </span>
                </label>
              </div>
            </section>
          )}

          {tab === "privacy" && (
            <section className="space-y-4" id="privacy">
              <p className="text-xs text-white/50">
                UI-friendly summary. Full version lives on the /privacy page.
              </p>

              <div className="space-y-3 text-sm text-white/70 leading-relaxed">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/85 font-medium">What we process</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Uploads are processed to generate outputs you request.</li>
                    <li>Temporary files may exist briefly for processing.</li>
                    <li>We don’t sell your uploads.</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/85 font-medium">Retention</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>We aim to delete temporary processing files after completion.</li>
                    <li>We may keep minimal logs for stability and debugging.</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/85 font-medium">Contact</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>For data requests, contact the site owner via your Contact page.</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Footer controls */}
          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
            <label className="flex items-start gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              Don’t show this popup again
            </label>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-semibold text-white",
                  tab === "terms" && !agreed
                    ? "bg-white/10 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                )}
                disabled={tab === "terms" && !agreed}
                title={tab === "terms" && !agreed ? "Agree to continue" : ""}
              >
                Continue
              </button>

              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-4 text-xs text-white/40">
          Links: <a className="underline hover:text-white/70" href="/terms">/terms</a> •{" "}
          <a className="underline hover:text-white/70" href="/privacy">/privacy</a>
        </div>
      </div>
    </div>
  );
}
