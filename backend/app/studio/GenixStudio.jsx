import { useEffect, useMemo, useState } from "react";
import useJobPoll from "./useJobPoll";
import { genixGenerate } from "./api";

const ASPECTS = ["1:1", "16:9", "9:16", "4:3", "3:4"];

function absUrl(u) {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  const base = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
  return `${base}${u}`;
}

export default function GenixStudio() {
  const { job, polling, start } = useJobPoll();

  const [prompt, setPrompt] = useState("cinematic portrait, realistic, soft rim light");
  const [aspect, setAspect] = useState("1:1");
  const [steps, setSteps] = useState(25);
  const [error, setError] = useState("");

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("genix_history") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("genix_history", JSON.stringify(history.slice(0, 24)));
  }, [history]);

  const progress = job?.progress ?? 0;
  const status = job?.status || "idle";
  const img = job?.result?.image_url;

  useEffect(() => {
    if (job?.status === "succeeded" && job?.result?.image_url) {
      setHistory((prev) => [
        { ts: Date.now(), prompt: job.payload?.prompt || prompt, url: job.result.image_url },
        ...prev,
      ].slice(0, 24));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job?.status]);

  async function onGenerate() {
    setError("");
    try {
      const res = await genixGenerate({ prompt, aspect_ratio: aspect, steps });
      await start(res.job_id);
    } catch (e) {
      setError("Generate failed. Check backend URL / CORS / auth.");
    }
  }

  const canGenerate = useMemo(() => prompt.trim().length > 0 && !polling, [prompt, polling]);

  return (
    <div className="space-y-4">
      <Header
        title="GeniX"
        subtitle="Text → Image generation (ComfyUI worker)."
        right={<StatusPill status={status} progress={progress} />}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* Left: Controls + Result */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/10 p-4">
            <div className="text-sm font-medium">Prompt</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
            />

            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div>
                <div className="text-xs text-white/60">Aspect</div>
                <select
                  value={aspect}
                  onChange={(e) => setAspect(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
                >
                  {ASPECTS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-xs text-white/60">Steps</div>
                <input
                  type="number"
                  min={5}
                  max={60}
                  value={steps}
                  onChange={(e) => setSteps(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  disabled={!canGenerate}
                  onClick={onGenerate}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {polling ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>

            {error ? <div className="mt-3 text-sm text-red-300">{error}</div> : null}

            {/* Progress */}
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-white/60">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded bg-white/10">
                <div
                  className="h-2 rounded bg-white/30 transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl border border-white/10 bg-black/10 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Result</div>
              {img ? (
                <a
                  href={absUrl(img)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/70 hover:text-white"
                >
                  Open →
                </a>
              ) : null}
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
              {img ? (
                <img
                  src={absUrl(img)}
                  alt="GeniX result"
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="py-10 text-center text-sm text-white/60">
                  Generate an image to see results here.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: History */}
        <div className="rounded-xl border border-white/10 bg-black/10 p-4">
          <div className="text-sm font-medium">Recent</div>
          <div className="mt-3 grid gap-3">
            {history.length === 0 ? (
              <div className="text-sm text-white/60">No results yet.</div>
            ) : (
              history.map((h) => (
                <button
                  key={h.ts}
                  onClick={() => window.open(absUrl(h.url), "_blank")}
                  className="group rounded-xl border border-white/10 bg-black/20 p-2 text-left hover:bg-white/10"
                >
                  <div className="overflow-hidden rounded-lg border border-white/10">
                    <img src={absUrl(h.url)} alt="" className="w-full" />
                  </div>
                  <div className="mt-2 line-clamp-2 text-xs text-white/60 group-hover:text-white/80">
                    {h.prompt}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-sm text-white/60">{subtitle}</div>
      </div>
      {right}
    </div>
  );
}

function StatusPill({ status, progress }) {
  const label =
    status === "idle" ? "Ready" :
    status === "queued" ? "Queued" :
    status === "running" ? `Running • ${progress}%` :
    status === "succeeded" ? "Succeeded" :
    status === "failed" ? "Failed" : status;

  return (
    <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-white/70">
      {label}
    </div>
  );
}
