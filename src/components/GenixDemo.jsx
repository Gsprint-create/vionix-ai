import { useState } from "react";
import { apiFetch, pollJob } from "../lib/api";

export default function GenixDemo() {
  const [prompt, setPrompt] = useState("cyberpunk trooper, neon, cinematic");
  const [status, setStatus] = useState("");
  const [img, setImg] = useState("");

  async function generate() {
    setStatus("Submitting...");
    setImg("");

    const submit = await apiFetch("/api/tools/genix/generate", {
      method: "POST",
      body: { prompt },
    });

    setStatus("Generating...");
    const job = await pollJob(submit.job_id);

    if (job.status === "failed") {
      setStatus("Failed");
      return;
    }

    setImg(job.result.image_url);
    setStatus("Done");
  }

  return (
    <div className="p-4 max-w-xl">
      <textarea
        className="w-full p-2 border"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button onClick={generate} className="mt-2 px-4 py-2 bg-black text-white">
        Generate
      </button>
      <div className="mt-2">{status}</div>
      {img && <img src={img} className="mt-4 rounded" />}
    </div>
  );
}
