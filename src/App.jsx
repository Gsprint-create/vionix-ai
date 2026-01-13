import { useMemo, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { apiFetch, pollJob } from "./lib/api";

function cls(...a) {
  return a.filter(Boolean).join(" ");
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-white/60">{subtitle}</p>}
    </div>
  );
}

export default function App() {
  const { user, ready, login, register, logout } = useAuth();

  // UI state
  const [tab, setTab] = useState("genix"); // genix | faceswap
  const [toast, setToast] = useState("");

  // auth form
  const [email, setEmail] = useState("george@test.com");
  const [password, setPassword] = useState("123456");
  const [authBusy, setAuthBusy] = useState(false);

  // genix
  const [prompt, setPrompt] = useState("cinematic portrait, realistic, soft rim light");
  const [aspect, setAspect] = useState("1:1");
  const [steps, setSteps] = useState(25);
  const [genBusy, setGenBusy] = useState(false);
  const [genStatus, setGenStatus] = useState("");
  const [genImg, setGenImg] = useState("");

  // faceswap (still mock)
  const [swapBusy, setSwapBusy] = useState(false);
  const [swapStatus, setSwapStatus] = useState("");
  const [swapImg, setSwapImg] = useState("");

  const signedIn = !!user;

  const headerSubtitle = useMemo(() => {
    return "Create images with GeniX, then swap faces with Morph-style tools. Platform-first, GPU-ready.";
  }, []);

  async function onLogin() {
    setToast("");
    setAuthBusy(true);
    try {
      await login(email, password);
      setToast("Signed in ✅");
    } catch (e) {
      setToast(`Login failed: ${e.message}`);
    } finally {
      setAuthBusy(false);
    }
  }

  async function onRegister() {
    setToast("");
    setAuthBusy(true);
    try {
      await register(email, password);
      setToast("Account created ✅");
    } catch (e) {
      setToast(`Register failed: ${e.message}`);
    } finally {
      setAuthBusy(false);
    }
  }

  async function runGenix() {
    setGenBusy(true);
    setGenImg("");
    setGenStatus("Submitting job…");

    try {
      const submit = await apiFetch("/api/tools/genix/generate", {
        method: "POST",
        body: { prompt, aspect_ratio: aspect, steps },
      });

      setGenStatus("Generating…");

      // poll and update progress text occasionally
      const job = await pollJob(submit.job_id, {
        onTick: (j) => {
          if (j?.progress != null) setGenStatus(`Generating… ${j.progress}%`);
        },
      });

      if (job.status === "failed") {
        setGenStatus(`Failed: ${job.error || "unknown error"}`);
        return;
      }

      setGenStatus("Done ✅");
      setGenImg(job.result?.image_url || "");
    } catch (e) {
      setGenStatus(`Error: ${e.message}`);
    } finally {
      setGenBusy(false);
    }
  }

  async function runFaceSwap() {
    setSwapBusy(true);
    setSwapImg("");
    setSwapStatus("Submitting job…");

    try {
      const submit = await apiFetch("/api/tools/faceswap/swap", {
        method: "POST",
        body: { source_image: "mock_source", target_image: "mock_target", options: {} },
      });

      setSwapStatus("Swapping…");

      const job = await pollJob(submit.job_id, {
        onTick: (j) => {
          if (j?.progress != null) setSwapStatus(`Swapping… ${j.progress}%`);
        },
      });

      if (job.status === "failed") {
        setSwapStatus(`Failed: ${job.error || "unknown error"}`);
        return;
      }

      setSwapStatus("Done ✅");
      setSwapImg(job.result?.output_url || "");
    } catch (e) {
      setSwapStatus(`Error: ${e.message}`);
    } finally {
      setSwapBusy(false);
    }
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#070A12] text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-white/70">Loading Vionix…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* NAV */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center font-bold">
              V
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">Vionix AI</div>
              <div className="text-xs text-white/60">Studio</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {signedIn ? (
              <>
                <Badge>{user.email}</Badge>
                <button
                  onClick={logout}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <Badge>Not signed in</Badge>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Generate. Swap. Publish.</h1>
              <p className="mt-1 text-sm text-white/60">{headerSubtitle}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Jobs + Queue</Badge>
                <Badge>JWT Auth</Badge>
                <Badge>Tool Registry</Badge>
                <Badge>ComfyUI GPU</Badge>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 md:mt-0">
              <button
                onClick={() => setTab("genix")}
                className={cls(
                  "rounded-xl px-4 py-2 text-sm font-medium",
                  tab === "genix" ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
                )}
              >
                GeniX
              </button>
              <button
                onClick={() => setTab("faceswap")}
                className={cls(
                  "rounded-xl px-4 py-2 text-sm font-medium",
                  tab === "faceswap" ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
                )}
              >
                FaceSwap
              </button>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column: Auth + info */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <SectionTitle
                title="Account"
                subtitle="Sign in to access protected tools like FaceSwap."
              />

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-white/60">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                    placeholder="you@domain.com"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/60">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                    placeholder="••••••"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onLogin}
                    disabled={authBusy}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-60"
                  >
                    {authBusy ? <Spinner /> : null}
                    Login
                  </button>
                  <button
                    onClick={onRegister}
                    disabled={authBusy}
                    className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-60"
                  >
                    Register
                  </button>
                </div>

                {toast ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                    {toast}
                  </div>
                ) : null}

                <div className="text-xs text-white/60">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    GeniX is public
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    FaceSwap requires login
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <SectionTitle title="Next" subtitle="Upgrade this UI into a real Studio." />
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Add negative prompt, CFG, sampler</li>
                <li>• Save history per user</li>
                <li>• Add upload-based FaceSwap</li>
                <li>• Credits + Stripe checkout</li>
              </ul>
            </div>
          </div>

          {/* Right column: Tool panels */}
          <div className="lg:col-span-2">
            {tab === "genix" ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <SectionTitle
                  title="GeniX"
                  subtitle="Text → Image generation powered by your ComfyUI GPU worker."
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <label className="text-xs text-white/60">Prompt</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="mt-1 min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm outline-none focus:border-white/20"
                      placeholder="Describe what you want..."
                    />
                  </div>

                  <div className="md:col-span-1 space-y-3">
                    <div>
                      <label className="text-xs text-white/60">Aspect</label>
                      <select
                        value={aspect}
                        onChange={(e) => setAspect(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                      >
                        <option value="1:1">1:1</option>
                        <option value="16:9">16:9</option>
                        <option value="9:16">9:16</option>
                        <option value="4:3">4:3</option>
                        <option value="3:4">3:4</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-white/60">Steps</label>
                      <input
                        type="number"
                        min={10}
                        max={60}
                        value={steps}
                        onChange={(e) => setSteps(parseInt(e.target.value || "25", 10))}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                      />
                    </div>

                    <button
                      onClick={runGenix}
                      disabled={genBusy || !prompt.trim()}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-60"
                    >
                      {genBusy ? <Spinner /> : null}
                      Generate
                    </button>

                    {genStatus ? (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                        {genStatus}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs text-white/60 mb-2">Preview</div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    {genImg ? (
                      <img
                        src={genImg}
                        alt="genix"
                        className="w-full max-h-[520px] object-contain rounded-xl"
                      />
                    ) : (
                      <div className="flex h-[280px] items-center justify-center text-sm text-white/50">
                        Your generated image will appear here.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <SectionTitle
                  title="FaceSwap"
                  subtitle="Protected tool. Next step: real uploads + InsightFace in the worker."
                />

                {!signedIn ? (
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
                    Please sign in to use FaceSwap.
                  </div>
                ) : (
                  <>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                      This is still in <b>mock mode</b>. Next we’ll add uploads:
                      <div className="mt-2 text-white/60">
                        • Upload source face image<br />
                        • Upload target image<br />
                        • Worker runs InsightFace and returns output URL
                      </div>
                    </div>

                    <button
                      onClick={runFaceSwap}
                      disabled={swapBusy}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-60"
                    >
                      {swapBusy ? <Spinner /> : null}
                      Run FaceSwap (mock)
                    </button>

                    {swapStatus ? (
                      <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                        {swapStatus}
                      </div>
                    ) : null}

                    <div className="mt-6">
                      <div className="text-xs text-white/60 mb-2">Preview</div>
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        {swapImg ? (
                          <img
                            src={swapImg}
                            alt="faceswap"
                            className="w-full max-h-[520px] object-contain rounded-xl"
                          />
                        ) : (
                          <div className="flex h-[280px] items-center justify-center text-sm text-white/50">
                            Your swapped image will appear here.
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="mt-10 pb-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Vionix AI • Studio build
        </footer>
      </div>
    </div>
  );
}
