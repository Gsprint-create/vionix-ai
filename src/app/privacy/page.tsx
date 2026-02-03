export const metadata = {
  title: "Privacy Policy | Vionix AI",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-white/70">
          This is the full Privacy page. (We can expand this anytime.)
        </p>

        <div className="mt-8 space-y-6 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white">Processing</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Uploads are processed to produce outputs you request.</li>
              <li>Temporary processing files may exist briefly.</li>
              <li>We don’t sell your uploads.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Retention</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>We aim to delete temporary files after completion.</li>
              <li>Minimal logs may be kept for stability/debugging.</li>
            </ul>
          </section>
        </div>

        <a
          href="/"
          className="mt-10 inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          ← Back
        </a>
      </div>
    </main>
  );
}
