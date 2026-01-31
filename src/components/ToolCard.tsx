import StatusPill from "@/components/StatusPill";
import { ToolItem } from "@/data/tools";

export default function ToolCard({ tool }: { tool: ToolItem }) {
  const isLive = tool.status === "live";

  return (
    <div
      className={[
        "relative rounded-2xl p-6 glass transition",
        "hover:translate-y-[-2px] hover:border-white/20",
        tool.primary ? "ring-1 ring-blue-500/40" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{tool.name}</h3>
        <StatusPill status={tool.status} />
      </div>

      <p className="mt-2 text-sm text-white/70">{tool.description}</p>

      <div className="mt-6">
  {isLive ? (
    <a
      href={tool.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-blue-500/90 px-4 py-2 text-sm font-medium hover:bg-blue-500"
    >
      {tool.cta ?? "Launch"} <span className="opacity-80">→</span>
    </a>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 cursor-not-allowed select-none">
      {tool.cta ?? "Learn more"} <span className="opacity-60">→</span>
    </span>
  )}
</div>
    </div>
  );
}
