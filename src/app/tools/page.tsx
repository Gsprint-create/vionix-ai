import Link from "next/link";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -top-32 left-[-20%] h-[420px] w-[420px] rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute top-20 right-[-15%] h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute bottom-[-25%] left-[20%] h-[520px] w-[520px] rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Vionix AI • Directory
          </div>

          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">
            Tools are hosted in MorphAI
          </h1>

          <p className="mt-3 text-sm text-white/70 md:text-base">
            Vionix is the landing page. The tools directory and apps live under MorphAI.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://www.morphai.net/tools"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-blue-500/90 px-6 py-3 text-sm font-medium hover:bg-blue-500"
            >
              Go to MorphAI Tools →
            </a>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              Back to Vionix Home
            </Link>
          </div>

          <div className="mt-6 text-xs text-white/50">
            Coming next: FaceSwap UI → auth → Stripe (last).
          </div>
        </div>
      </div>
    </main>
  );
}
