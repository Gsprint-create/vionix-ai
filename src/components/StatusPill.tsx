import { ToolStatus } from "@/data/tools";

const labels: Record<ToolStatus, string> = {
  live: "Live",
  coming_soon: "Coming soon",
  planned: "Planned",
};

export default function StatusPill({ status }: { status: ToolStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs border backdrop-blur";
  const styles: Record<ToolStatus, string> = {
    live: "bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
    coming_soon: "bg-white/5 border-white/15 text-white/75",
    planned: "bg-white/5 border-white/15 text-white/75",
  };

  return <span className={`${base} ${styles[status]}`}>{labels[status]}</span>;
}
