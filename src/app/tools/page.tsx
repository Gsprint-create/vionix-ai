import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";

export default function ToolsPage() {
  return (
    <section className="py-14 md:py-16">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          Directory
        </div>

        <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Tools</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Everything under the Vionix AI umbrella. Link to live deployments or mark items as coming soon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((t) => (
          <ToolCard key={t.name} tool={t} />
        ))}
      </div>
    </section>
  );
}
