import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070B14]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
            ✦
          </div>
          <div className="leading-tight">
            <div className="font-semibold">Vionix AI</div>
            <div className="text-xs text-white/60">Create. Morph. Transform.</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link className="hover:text-white" href="/tools">Tools</Link>
          <Link className="hover:text-white" href="/pricing">Pricing</Link>
          <Link className="hover:text-white" href="/about">About</Link>
          <Link className="hover:text-white" href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
            href="https://www.morphai.net/tools"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/80 hover:text-white""
          >
            Tools
          </a>
          <a
            className="rounded-xl bg-blue-500/90 px-4 py-2 text-sm font-medium hover:bg-blue-500"
            href="/tools"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
