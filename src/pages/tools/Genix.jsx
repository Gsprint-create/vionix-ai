import Section from "../../components/Section";
import GenixDemo from "../../components/GenixDemo";

export default function Genix() {
  return (
    <>
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
              <button className="btn-primary opacity-60 cursor-not-allowed">
                Coming soon
              </button>
            </div>
          </div>

          <GenixDemo />
        </div>
      </Section>
    </>
  );
}
