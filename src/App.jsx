import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";


import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Success from "./pages/Success";


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
		<Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  );
}
