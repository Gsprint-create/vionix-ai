import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function WaitlistForm({ tool = "genix" }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setBusy(true);

    try {
      const res = await fetch(`${API_BASE}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tool,
          company: "", // honeypot
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "failed");
      }

      if (data?.message === "already_joined") {
        setMsg("You’re already on the list ✅");
      } else {
        setMsg("You’re in ✅ We’ll email you when it launches.");
      }
      setEmail("");
    } catch (err) {
      setMsg("Couldn’t join right now. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-medium">Get early access</div>
      <div className="mt-1 text-sm text-white/60">
        Join the waitlist for {tool === "genix" ? "GeniX" : "AI Influencer Generator"}.
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="you@email.com"
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
        />
        <button
          disabled={busy}
          className="btn-primary whitespace-nowrap disabled:opacity-60"
          type="submit"
        >
          {busy ? "Joining..." : "Join waitlist"}
        </button>
      </div>

      {msg ? <div className="mt-3 text-sm text-white/70">{msg}</div> : null}
    </form>
  );
}
