import React, { useEffect, useState } from "react";

import useIsMobile from "../hooks/useIsMobileHook.js";
import useLazyLoading from "../hooks/useLazyLoading.js";
import useScrollAnimation from "../hooks/useScrollAnimation.js";
import useSmoothScroll from "../hooks/useSmoothScroll.js";
import useTailwindLayout from "../hooks/useTailwindLayout.js";

import Bottom from "../components/Bottom";
import NeonCursor from "../components/custom-cursor/NeonCursor.js";
import Departments from "../components/Departments.jsx";
import LandingPage from "../components/LandingPage";
import Main from "../components/Main";
import MissionVision from "../components/MissionVision";
import Responsibilities from "../components/Responsibilities";

import "../css/about.css";

const setMetaDescription = (description) => {
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }
};

const About = () => {
  const [isCursorEnabled, setIsCursorEnabled] = useState(false);
  const isMobile = useIsMobile();

  useTailwindLayout();
  useSmoothScroll();
  useLazyLoading();
  useScrollAnimation();

  useEffect(() => {
    document.title = "About MSL Philippines - Moonton Student Leaders";
    setMetaDescription(
      "Learn about Moonton Student Leaders Philippines, a community for student gamers passionate about Mobile Legends: Bang Bang. Discover our mission, vision, and departments."
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="About">
    <div className="min-h-screen bg-black transition-all">
      <div className="fixed bottom-4 right-4 md:hidden z-[99]">
        <button
          onClick={scrollToTop}
          className="bg-black/50 backdrop-blur-sm p-3 rounded-full border border-white/20"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {!isMobile && isCursorEnabled && <NeonCursor />}

      {!isMobile && (
        <div className="fixed bottom-4 right-4 z-[999]">
          <button
            onClick={() => setIsCursorEnabled(!isCursorEnabled)}
            className="bg-transparent backdrop-blur-sm rounded-full px-4 py-2 border-2 border-white text-white"
            aria-label="Toggle Cursor"
          >
            {isCursorEnabled ? "Disable cursor trail" : "Enable cursor trail"}
          </button>
        </div>
      )}

      <LandingPage />
      <Main />
      <MissionVision />
      <Responsibilities />
      <Departments />
      <Bottom />
    </div>
    </div>
  );
};

export default About;
