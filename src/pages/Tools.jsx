import React from "react";
import Section from "../components/Section";
import ToolCard from "../components/ToolCard";

<a href={t.url} target="_blank" rel="noreferrer">

export default function Tools() {
  return (
    <div className="relative z-10">
      <Section
        eyebrow="Directory"
        title="Tools"
        desc="Everything under the Vionix AI umbrella. Link to live deployments or mark items as coming soon."
      >
        <div className="grid md:grid-cols-3 gap-4">
          <ToolCard name="MorphAI FaceSwap" desc="Face swap + gallery workflow." status="Live" href="https://morphai.net" />
          <ToolCard name="GeniX" desc="Text-to-image generator with style presets." status="Coming soon" href="/pricing" />
          <ToolCard name="AI Influencer Generator" desc="Persona packs + content pipelines." status="Coming soon" href="/pricing" />
          <ToolCard name="Prompt Writer" desc="Write prompts that match your tool presets." status="Planned" href="/about" />
          <ToolCard name="Image Upscaler" desc="Sharper exports for creators." status="Planned" href="/about" />
          <ToolCard name="Image-to-Video" desc="Cinematic motion generation." status="Planned" href="/about" />
        </div>
      </Section>
    </div>
  );
}
