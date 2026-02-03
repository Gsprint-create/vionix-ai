export const metadata = {
  title: "Terms & Conditions | Vionix AI",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Terms & Conditions</h1>
        <p className="mt-3 text-white/70">
          This is the full Terms page. (We can expand this anytime.)
        </p>

        <div className="mt-8 space-y-6 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white">Allowed Use</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Lawful creative use only.</li>
              <li>No harassment, scams, deception, or harmful impersonation.</li>
              <li>No content involving minors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Your Content</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>You confirm you have rights/permission to upload content.</li>
              <li>You keep ownership of your uploads.</li>
              <li>Outputs are provided as-is.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Availability</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Service may change or be temporarily unavailable.</li>
              <li>No liability for indirect losses due to downtime.</li>
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
