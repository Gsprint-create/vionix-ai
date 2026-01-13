import { NavLink, Outlet } from "react-router-dom";

export default function StudioLayout() {
  return (
    <div className="relative z-10 min-h-[calc(100vh-120px)]">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/60">Vionix AI</div>
            <h1 className="text-2xl font-semibold">Studio</h1>
            <div className="text-sm text-white/60">
              Generate with GeniX, then swap with Morph-style tools.
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
            Tip: set <span className="text-white">VITE_API_BASE</span> to your Railway backend
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 text-xs font-semibold text-white/60">Tools</div>

            <NavItem to="/studio/genix" label="GeniX" sub="Text → Image" badge="Public" />
            <NavItem to="/studio/faceswap" label="FaceSwap" sub="Upload → Swap" badge="Protected" />

            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="text-xs font-semibold text-white/60">Planned</div>
              <div className="mt-2 space-y-2 text-sm text-white/60">
                <div>Upscaler</div>
                <div>Image-to-Video</div>
                <div>Influencer Generator</div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, label, sub, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `mb-2 block rounded-xl border px-3 py-3 transition ${
          isActive ? "border-white/20 bg-white/10" : "border-white/10 bg-black/10 hover:bg-white/10"
        }`
      }
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium">{label}</div>
        <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-xs text-white/70">
          {badge}
        </span>
      </div>
      <div className="text-xs text-white/60">{sub}</div>
    </NavLink>
  );
}
