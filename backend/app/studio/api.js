const API_BASE = import.meta.env.VITE_API_BASE || "";

async function jfetch(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || data?.msg || "api_error");
  return data;
}

export async function genixGenerate(payload) {
  return jfetch("/api/tools/genix/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getJob(jobId) {
  return jfetch(`/api/jobs/${jobId}`);
}
