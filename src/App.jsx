import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Check from "./pages/Check.jsx";
import Results from "./pages/Results.jsx";
import ChecklistPage from "./pages/Checklist.jsx";
import Safety from "./pages/Safety.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import { loadProfile } from "./utils/storage.js";

const DEFAULT_LANG = "en";

export default function App() {
  const [lang, setLang] = useState(DEFAULT_LANG);
  const [profile, setProfile] = useState(loadProfile());
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const memoLang = useMemo(() => lang, [lang]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937] flex flex-col font-sans">
      <Navbar lang={memoLang} setLang={setLang} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home lang={memoLang} setLang={setLang} />} />
          <Route
            path="/check"
            element={<Check lang={memoLang} setProfile={setProfile} />}
          />
          <Route
            path="/results"
            element={
              <Results
                lang={memoLang}
                profile={profile}
                onUpdateMatched={setMatchedSchemes}
              />
            }
          />
          <Route
            path="/checklist"
            element={<ChecklistPage lang={memoLang} matchedSchemes={matchedSchemes} />}
          />
          <Route
            path="/safety"
            element={<Safety lang={memoLang} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard lang={memoLang} />}
          />
          <Route
            path="/about"
            element={<About lang={memoLang} />}
          />
        </Routes>
      </div>
      <Footer lang={memoLang} setLang={setLang} />
    </div>
  );
}
