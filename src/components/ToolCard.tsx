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
        {isLive && tool.href ? (
          <a
            href={tool.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-blue-200 no-underline"
          >
            {tool.cta ?? "Launch"} <span className="opacity-70">→</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-white/50 cursor-not-allowed select-none">
            {tool.cta ?? "Learn more"} <span className="opacity-50">→</span>
          </span>
        )}
      </div>
    </div>
  );
}
