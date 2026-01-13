import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Tools from "./pages/Tools";
import Genix from "./pages/tools/Genix";
import MorphAI from "./pages/tools/MorphAI";
import Influencer from "./pages/tools/Influencer";

// ✅ Studio
import StudioLayout from "./studio/StudioLayout";
import GenixStudio from "./studio/GenixStudio";
import FaceSwapStudio from "./studio/FaceSwapStudio";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/tools" replace />} />

        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/genix" element={<Genix />} />
        <Route path="/tools/morphai-faceswap" element={<MorphAI />} />
        <Route path="/tools/influencer" element={<Influencer />} />

        {/* ✅ Studio */}
        <Route path="/studio" element={<StudioLayout />}>
          <Route index element={<Navigate to="/studio/genix" replace />} />
          <Route path="genix" element={<GenixStudio />} />
          <Route path="faceswap" element={<FaceSwapStudio />} />
        </Route>

        <Route path="*" element={<Navigate to="/tools" replace />} />
      </Route>
    </Routes>
  );
}
