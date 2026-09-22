import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowItWorksPage from "./pages/HowItWorksPage";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";
import AppPage from "./pages/AppPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/app" element={<AppPage />} />
    </Routes>
  );
}