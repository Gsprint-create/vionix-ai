import Seo from "../../components/Seo";
import Section from "../../components/Section";

export default function MorphAI() {
  return (
    <>
      {/* ✅ SEO goes FIRST */}
      <Seo
        title="MorphAI FaceSwap"
        description="FaceSwap with a gallery-first workflow. Live tool."
        url="https://vionix-ai.com/tools/morphai-faceswap"
        image="/og-morphai.png"
      />

      {/* ✅ Your existing content goes BELOW */}
      <Section
        eyebrow="Live Tool"
        title="MorphAI FaceSwap"
        subtitle="Face swapping with a gallery-first workflow."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-white/70">
            <p>
              MorphAI lets you swap faces with clean previews, history, and
              gallery management — built for creators.
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Protected access</li>
              <li>Gallery + history</li>
              <li>Job-based processing</li>
              <li>Scalable GPU backend</li>
            </ul>

            <div className="pt-4">
              <a
                href="https://www.morphai.net"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open MorphAI
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/60">
              Live · Powered by dedicated GPU workers
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
