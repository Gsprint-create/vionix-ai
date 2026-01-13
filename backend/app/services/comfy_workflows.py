def genix_txt2img_workflow(prompt: str, seed: int = 0, steps: int = 25, cfg: float = 7.0, width: int = 512, height: int = 512):
    """
    Minimal ComfyUI workflow for SD1.5:
    - CheckpointLoaderSimple -> CLIPTextEncode (pos/neg)
    - EmptyLatentImage -> KSampler -> VAEDecode -> SaveImage
    Requires model name set in CheckpointLoaderSimple.ckpt_name
    """
    return {
        "1": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {
                "ckpt_name": "Realistic_Vision_V3.0.safetensors"
            }
        },
        "2": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "text": prompt,
                "clip": ["1", 1]
            }
        },
        "3": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "text": "worst quality, low quality, blurry, artifacts",
                "clip": ["1", 1]
            }
        },
        "4": {
            "class_type": "EmptyLatentImage",
            "inputs": {
                "width": width,
                "height": height,
                "batch_size": 1
            }
        },
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
                "seed": seed,
                "steps": steps,
                "cfg": cfg,
                "sampler_name": "euler",
                "scheduler": "normal",
                "denoise": 1.0
            }
        },
        "6": {
            "class_type": "VAEDecode",
            "inputs": {
                "samples": ["5", 0],
                "vae": ["1", 2]
            }
        },
        "7": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": "vionix_genix",
                "images": ["6", 0]
            }
        }
    }
