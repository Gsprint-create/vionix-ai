import Link from "next/link";

export default function HomePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="glass rounded-3xl p-10 md:p-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          Platform • Creative AI Tools
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
          Build faster with a modular creative AI toolkit.
        </h1>

        <p className="mt-4 max-w-2xl text-white/70">
          Vionix AI is the umbrella for tools like MorphAI FaceSwap, GeniX, and more — designed for creators who want
          polished results, fast workflows, and simple UX.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/tools"
            className="rounded-xl bg-blue-500/90 px-5 py-3 text-sm font-medium hover:bg-blue-500 text-center"
          >
            Explore Tools
          </Link>
          <a
            href="https://morphai.net"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10 text-center"
          >
            Open MorphAI
          </a>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Clear statuses", desc: "Live / Coming soon / Planned so users always know what’s ready." },
          { title: "Consistent UX", desc: "Each tool follows the same design language and navigation." },
          { title: "Built to scale", desc: "Add auth, subscriptions, dashboards whenever you’re ready." },
        ].map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6">
            <div className="font-semibold">{f.title}</div>
            <div className="mt-2 text-sm text-white/70">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
