import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-2xl font-semibold">404</div>
        <p className="mt-2 text-white/70">That page doesn’t exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 text-sm transition"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
