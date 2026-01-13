from dataclasses import dataclass, asdict
from typing import Dict, List, Optional


@dataclass(frozen=True)
class Tool:
    id: str
    name: str
    description: str
    version: str
    status: str  # "online" | "maintenance" | "offline"
    category: str  # "faceswap" | "image-generation" | "video" | etc.
    endpoint: str  # base api endpoint for this tool
    capabilities: List[str]
    requires_auth: bool = False


# --- Central registry (single source of truth) ---
TOOLS: Dict[str, Tool] = {
    "genix": Tool(
        id="genix",
        name="GeniX",
        description="Text-to-image generation (foundation endpoint; model wiring comes later).",
        version="0.1.0",
        status="online",
        category="image-generation",
        endpoint="/api/tools/genix",
        capabilities=["text-to-image", "seed", "aspect-ratio", "style-presets"],
        requires_auth=False,
    ),
    "faceswap": Tool(
        id="faceswap",
        name="FaceSwap",
        description="Face swapping engine (registry only for now; pipeline wiring comes later).",
        version="0.1.0",
        status="online",
        category="faceswap",
        endpoint="/api/tools/faceswap",
        capabilities=["single-face", "multi-face", "blend", "enhance"],
        requires_auth=True,
    ),
}


def list_tools(category: Optional[str] = None, status: Optional[str] = None) -> List[dict]:
    tools = list(TOOLS.values())

    if category:
        tools = [t for t in tools if t.category == category]

    if status:
        tools = [t for t in tools if t.status == status]

    return [asdict(t) for t in tools]


def get_tool(tool_id: str) -> Optional[dict]:
    tool = TOOLS.get(tool_id)
    return asdict(tool) if tool else None
