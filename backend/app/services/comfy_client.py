import time
import requests

def _post(url, json=None, timeout=60):
    r = requests.post(url, json=json, timeout=timeout)
    r.raise_for_status()
    return r.json()

def _get(url, timeout=60):
    r = requests.get(url, timeout=timeout)
    r.raise_for_status()
    return r.json()

def comfyui_prompt(comfy_url: str, prompt_graph: dict) -> str:
    """
    Submit a prompt graph to ComfyUI.
    Returns prompt_id.
    """
    data = _post(f"{comfy_url}/prompt", json={"prompt": prompt_graph})
    return data["prompt_id"]

def comfyui_wait(comfy_url: str, prompt_id: str, poll_sec: float = 0.6, timeout_sec: int = 300):
    """
    Wait until prompt finishes. Returns history JSON.
    """
    t0 = time.time()
    while True:
        hist = _get(f"{comfy_url}/history/{prompt_id}")
        if prompt_id in hist:
            return hist[prompt_id]
        if time.time() - t0 > timeout_sec:
            raise TimeoutError("ComfyUI timed out waiting for history.")
        time.sleep(poll_sec)

def comfyui_pick_first_image(history: dict) -> str:
    """
    From history, find the first image filename in outputs.
    Returns filename, e.g. '00001_.png'
    """
    outputs = history.get("outputs") or {}
    for _, out in outputs.items():
        images = out.get("images") or []
        if images:
            return images[0]["filename"]
    raise RuntimeError("No image found in ComfyUI history outputs.")

def comfyui_view_url(comfy_url: str, filename: str, subfolder: str = "", folder_type: str = "output") -> str:
    # ComfyUI image endpoint
    # /view?filename=...&subfolder=...&type=output
    return f"{comfy_url}/view?filename={filename}&subfolder={subfolder}&type={folder_type}"
