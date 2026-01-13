import Seo from "../../components/Seo";
import Section from "../../components/Section";
import GenixDemo from "../../components/GenixDemo";
import WaitlistForm from "../../components/WaitlistForm";

export default function Genix() {
  return (
    <>
      <Seo
        title="GeniX"
        description="Text-to-image generation with cinematic style presets."
        url="https://vionix-ai.com/tools/genix"
        image="/og-genix.png"
      />

      <Section
        eyebrow="Tool"
        title="GeniX"
        subtitle="Text-to-image generation with cinematic style presets."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-white/70">
            <p>
              GeniX is Vionix AI’s image generation engine. Designed for fast
              prompting, style presets, and creator-first workflows.
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Style presets (cinematic, realistic, cyberpunk)</li>
              <li>Aspect ratios for social platforms</li>
              <li>Seed locking & variations</li>
              <li>Future FaceSwap integration</li>
            </ul>

            <div className="pt-4">
             <WaitlistForm tool="genix" />

            </div>
          </div>

          <GenixDemo />
        </div>
      </Section>
    </>
  );
}
