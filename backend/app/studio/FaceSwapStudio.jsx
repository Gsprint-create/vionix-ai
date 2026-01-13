export default function FaceSwapStudio() {
  return (
    <div className="space-y-3">
      <div className="text-xl font-semibold">FaceSwap</div>
      <div className="text-sm text-white/60">
        Protected tool. Next: upload-based pipeline + InsightFace worker.
      </div>

      <div className="rounded-xl border border-white/10 bg-black/10 p-4 text-white/70">
        <div className="text-sm font-medium">Status</div>
        <div className="mt-2 text-sm text-white/60">
          UI ready. Backend action currently mock. We’ll wire the real pipeline next.
        </div>

        <button className="btn-primary mt-4 opacity-60 cursor-not-allowed">
          Run FaceSwap (coming next)
        </button>
      </div>
    </div>
  );
}
