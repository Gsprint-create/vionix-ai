import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ name, desc, status, href }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <p className="mt-2 text-sm text-white/70">{desc}</p>
        </div>
        {status && (
          <span className="text-xs rounded-full border border-white/10 bg-black/30 px-2 py-1 text-white/70">
            {status}
          </span>
        )}
      </div>

      <div className="mt-5">
        {href?.startsWith("http") ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-blue-100"
          >
            Open <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <Link
            to={href || "/tools"}
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-blue-100"
          >
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
