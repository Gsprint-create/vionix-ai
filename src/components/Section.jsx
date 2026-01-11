import React from "react";

export default function Section({ eyebrow, title, desc, children }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            {eyebrow}
          </div>
        )}
        {title && <h2 className="mt-4 text-3xl font-semibold tracking-tight">{title}</h2>}
        {desc && <p className="mt-3 text-white/70">{desc}</p>}
      </div>
      {children && <div className="mt-10">{children}</div>}
    </section>
  );
}
