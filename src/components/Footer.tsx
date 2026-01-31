import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="text-sm text-white/70">
          <div className="font-semibold text-white">Vionix AI</div>
          <div className="mt-1">A modular creative AI lab for image transformation tools.</div>
          <div className="mt-4 text-xs text-white/50">© {new Date().getFullYear()} Vionix AI. All rights reserved.</div>
        </div>

        <div className="flex gap-5 text-sm text-white/70">
          <Link className="hover:text-white" href="/tools">Tools</Link>
          <Link className="hover:text-white" href="/pricing">Pricing</Link>
          <Link className="hover:text-white" href="/about">About</Link>
          <Link className="hover:text-white" href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
