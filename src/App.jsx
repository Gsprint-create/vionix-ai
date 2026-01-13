// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Tools from "./pages/Tools";
import Genix from "./pages/tools/Genix";
import MorphAI from "./pages/tools/MorphAI";
import Influencer from "./pages/tools/Influencer";

export default function App() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<Layout />}>
        {/* Default */}
        <Route path="/" element={<Navigate to="/tools" replace />} />

        {/* Directory */}
        <Route path="/tools" element={<Tools />} />

        {/* Tool landing pages */}
        <Route path="/tools/genix" element={<Genix />} />
        <Route path="/tools/morphai-faceswap" element={<MorphAI />} />
        <Route path="/tools/influencer" element={<Influencer />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/tools" replace />} />
      </Route>
    </Routes>
  );
}
