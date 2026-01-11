import React from "react";
import Section from "../components/Section";

export default function Contact() {
  return (
    <div className="relative z-10">
      <Section
        eyebrow="Contact"
        title="Let’s connect"
        desc="Add your real email or a form service (Formspree / Basin / custom API) later."
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="font-semibold">Email</div>
            <div className="mt-2 text-sm text-white/70">contact@vionix-ai.com (placeholder)</div>
            <div className="mt-6 text-xs text-white/40">
              Replace with your real support email + link it in DNS/Google Workspace if needed.
            </div>
          </div>

          <form
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Hook this to a form backend next.");
            }}
          >
            <div className="font-semibold">Message</div>
            <input
              className="mt-4 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:border-blue-300/30"
              placeholder="Your email"
            />
            <textarea
              className="mt-3 w-full min-h-[120px] rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:border-blue-300/30"
              placeholder="What do you want to build?"
            />
            <button className="mt-4 w-full rounded-2xl bg-blue-500/80 hover:bg-blue-500 border border-blue-300/30 px-4 py-3 text-sm transition">
              Send
            </button>
          </form>
        </div>
      </Section>
    </div>
  );
}
