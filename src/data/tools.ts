export type ToolStatus = "live" | "coming_soon" | "planned";

export type ToolItem = {
  name: string;
  description: string;
  status: ToolStatus;
  href?: string;
  cta?: string;
  primary?: boolean;
};

export const tools: ToolItem[] = [
  {
    name: "MorphAI FaceSwap",
    description: "Face swap + gallery workflow.",
    status: "live",
    href: "https://morphai.net", // change to your live URL
    cta: "Launch",
    primary: true,
  },
  {
    name: "GeniX",
    description: "Text-to-image generator with style presets.",
    status: "coming_soon",
    cta: "Learn more",
  },
  {
    name: "AI Influencer Generator",
    description: "Persona packs + content pipelines.",
    status: "coming_soon",
    cta: "Learn more",
  },
  {
    name: "Prompt Writer",
    description: "Write prompts that match your tool presets.",
    status: "planned",
    cta: "Learn more",
  },
  {
    name: "Image Upscaler",
    description: "Sharper exports for creators.",
    status: "planned",
    cta: "Learn more",
  },
  {
    name: "Image-to-Video",
    description: "Cinematic motion generation.",
    status: "planned",
    cta: "Learn more",
  },
];
