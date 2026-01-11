import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-2xl font-semibold">Payment successful ✅</div>
        <p className="mt-3 text-white/70">
          Your checkout is complete{sessionId ? " (session recorded)." : "."}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href="https://morphai.net"
            className="rounded-2xl bg-blue-500/80 hover:bg-blue-500 border border-blue-300/30 px-6 py-3 text-sm transition text-center"
          >
            Open MorphAI
          </a>
          <Link
            to="/"
            className="rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 text-sm transition text-center"
          >
            Back home
          </Link>
        </div>

        <div className="mt-4 text-xs text-white/40">
          Next step: when you add login, you’ll tie this purchase to the user account.
        </div>
      </div>
    </div>
  );
}
