const TOKEN_KEY = "vionix_token";
const API_BASE = import.meta.env.VITE_API_BASE || "";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("vionix_token") || "";
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || data?.msg || "API error");
  return data;
}

export async function pollJob(jobId, { intervalMs = 500, timeoutMs = 600000, onTick } = {}) {
  const start = Date.now();

  while (true) {
    const data = await apiFetch(`/api/jobs/${jobId}`);
    const job = data.job;

    if (onTick) onTick(job);

    if (job.status === "succeeded" || job.status === "failed") {
      return job;
    }

    if (Date.now() - start > timeoutMs) {
      throw new Error("job_poll_timeout");
    }

    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

