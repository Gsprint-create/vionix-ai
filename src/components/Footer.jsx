import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-semibold">Vionix AI</div>
            <div className="text-sm text-white/60">
              A creative AI lab for image transformation tools.
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <Link className="text-white/60 hover:text-white" to="/tools">Tools</Link>
            <Link className="text-white/60 hover:text-white" to="/pricing">Pricing</Link>
            <Link className="text-white/60 hover:text-white" to="/about">About</Link>
            <Link className="text-white/60 hover:text-white" to="/contact">Contact</Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} Vionix AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
