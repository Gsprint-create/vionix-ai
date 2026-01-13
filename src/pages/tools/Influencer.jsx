import Seo from "../../components/Seo";
import Section from "../../components/Section";

export default function Influencer() {
  return (
    <>
      {/* ✅ SEO FIRST */}
      <Seo
        title="AI Influencer Generator"
        description="Persona packs + content pipelines for creators and brands. Coming soon."
        url="https://vionix-ai.com/tools/influencer"
        image="/og-influencer.png"
      />

      {/* ✅ EXISTING CONTENT BELOW */}
      <Section
        eyebrow="Coming soon"
        title="AI Influencer Generator"
        subtitle="Persona-based content pipelines for creators and brands."
      />

      <Section>
        <div className="max-w-3xl text-white/70 space-y-4">
          <p>
            Create consistent AI personas and generate full content packs —
            images, captions, and themes — ready for social platforms.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Persona packs</li>
            <li>Batch content generation</li>
            <li>Caption & hashtag generation</li>
            <li>Planned scheduling integrations</li>
          </ul>

          <WaitlistForm tool="influencer" />
        </div>
      </Section>
    </>
  );
}
