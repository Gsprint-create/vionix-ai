export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -top-32 left-[-20%] h-[420px] w-[420px] rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute top-20 right-[-15%] h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute bottom-[-25%] left-[20%] h-[520px] w-[520px] rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10">
        {/* Hero */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Platform • Creative AI Tools
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Vionix is the platform. Tools live in MorphAI.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Vionix AI is the umbrella platform. MorphAI is our first live tool — face swap with a clean
            gallery workflow and creator-friendly UX.
          </p>

          {/* BIG centered CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.morphai.net/tools"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-500/90 px-10 py-4 text-base font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-500"
            >
              Enter MorphAI →
            </a>

            <a
              href="#platform"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium hover:bg-white/10"
            >
              What is Vionix?
            </a>
          </div>

          <p className="mt-3 text-center text-sm text-white/60">
            Tools are accessible inside MorphAI. This page is the hub.
          </p>
        </section>

        {/* Platform cards */}
        <section id="platform" className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">Clear statuses</div>
            <div className="mt-2 text-sm text-white/70">
              Live / Coming soon / Planned so users always know what’s ready.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">Consistent UX</div>
            <div className="mt-2 text-sm text-white/70">
              Each tool follows the same design language and navigation.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">Built to scale</div>
            <div className="mt-2 text-sm text-white/70">
              Add auth, subscriptions, and dashboards whenever you’re ready.
            </div>
          </div>
        </section>

        {/* Tools preview (placeholders) */}
        <section id="tools" className="mt-10">
          <div className="mb-4">
            <div className="text-2xl font-semibold">Tools</div>
            <div className="mt-1 text-sm text-white/70">
              Names shown here for the roadmap. Access happens inside MorphAI.
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* MorphAI */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">MorphAI FaceSwap</div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200">
                  Live
                </span>
              </div>
              <div className="mt-2 text-sm text-white/70">Face swap + gallery workflow.</div>
              <div className="mt-4">
                <a
                  href="https://www.morphai.net/tools"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-500/90 px-4 py-2 text-sm font-medium hover:bg-blue-500"
                >
                  Open in MorphAI →
                </a>
              </div>
            </div>

            {/* GeniX */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">GeniX</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
                  Coming soon
                </span>
              </div>
              <div className="mt-2 text-sm text-white/70">Text-to-image generator with style presets.</div>
              <div className="mt-4">
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50"
                >
                  View in MorphAI
                </button>
              </div>
            </div>

            {/* Influencer */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">AI Influencer Generator</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
                  Coming soon
                </span>
              </div>
              <div className="mt-2 text-sm text-white/70">Persona packs + content pipelines.</div>
              <div className="mt-4">
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50"
                >
                  View in MorphAI
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-14 border-t border-white/10 pt-8 text-sm text-white/60">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-medium text-white/80">Vionix AI</div>
              <div>A modular creative AI lab for image transformation tools.</div>
              <div className="mt-1 text-xs text-white/40">© {new Date().getFullYear()} Vionix AI</div>
            </div>

            <div className="flex gap-4 text-white/70">
              <a className="hover:text-white" href="#platform">
                Platform
              </a>
              <a className="hover:text-white" href="#tools">
                Roadmap
              </a>
              <a className="hover:text-white" href="https://www.morphai.net/tools" target="_blank" rel="noreferrer">
                MorphAI
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
