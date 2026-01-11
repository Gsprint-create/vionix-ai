import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { LINKS } from "../config/links";

const navItem =
  "text-sm text-white/70 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/5";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur bg-black/20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid place-items-center h-9 w-9 rounded-xl bg-blue-500/20 border border-blue-400/20">
              <Sparkles className="h-5 w-5 text-blue-200" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">Vionix AI</div>
              <div className="text-xs text-white/50 -mt-0.5">
                Create. Morph. Transform.
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink className={navItem} to="/tools">Tools</NavLink>
            <NavLink className={navItem} to="/pricing">Pricing</NavLink>
            <NavLink className={navItem} to="/about">About</NavLink>
            <NavLink className={navItem} to="/contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://morphai.net"
              className="hidden sm:inline-flex text-sm px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
              target="_blank"
              rel="noreferrer"
            >
              Open MorphAI
            </a>
            <Link
              to="/pricing"
              className="inline-flex text-sm px-4 py-2 rounded-xl bg-blue-500/80 hover:bg-blue-500 border border-blue-300/30 transition"
            >
              <a
  href={LINKS.FACESWAP}
  target="_blank"
  rel="noreferrer"
  className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm"
>
  FaceSwap
</a>

<a
  href={LINKS.GENIX}
  target="_blank"
  rel="noreferrer"
  className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm"
>
  GeniX
</a>

            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
