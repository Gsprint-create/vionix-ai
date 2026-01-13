import os
import time
import json
import requests
from typing import Dict, Any, Optional

def submit_prompt(comfy_url: str, workflow: Dict[str, Any]) -> str:
    r = requests.post(f"{comfy_url}/prompt", json={"prompt": workflow}, timeout=60)
    r.raise_for_status()
    data = r.json()
    return data["prompt_id"]

def get_history(comfy_url: str, prompt_id: str) -> Dict[str, Any]:
    r = requests.get(f"{comfy_url}/history/{prompt_id}", timeout=60)
    r.raise_for_status()
    return r.json()

def wait_for_completion(
    comfy_url: str,
    prompt_id: str,
    set_progress,
    poll_interval: float = 0.6,
    timeout_s: float = 120.0,
) -> Dict[str, Any]:
    start = time.time()
    pct = 5
    set_progress(pct)

    while True:
        if time.time() - start > timeout_s:
            raise TimeoutError("comfy_timeout")

        hist = get_history(comfy_url, prompt_id)

        # When finished, history has an entry for prompt_id
        item = hist.get(prompt_id)
        if item:
            set_progress(95)
            return item

        pct = min(90, pct + 3)
        set_progress(pct)
        time.sleep(poll_interval)

def extract_first_image_from_history_item(history_item: Dict[str, Any]) -> Optional[Dict[str, str]]:
    """
    Returns {filename, subfolder, type} from Comfy history, or None.
    """
    outputs = history_item.get("outputs", {})
    for node_id, out in outputs.items():
        imgs = out.get("images")
        if imgs and isinstance(imgs, list) and len(imgs) > 0:
            img = imgs[0]
            return {
                "filename": img.get("filename", ""),
                "subfolder": img.get("subfolder", ""),
                "type": img.get("type", "output"),
            }
    return None

def download_image(comfy_url: str, image_meta: Dict[str, str], save_path: str) -> None:
    params = {
        "filename": image_meta["filename"],
        "subfolder": image_meta.get("subfolder", ""),
        "type": image_meta.get("type", "output"),
    }
    r = requests.get(f"{comfy_url}/view", params=params, timeout=120)
    r.raise_for_status()
    with open(save_path, "wb") as f:
        f.write(r.content)
