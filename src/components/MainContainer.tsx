import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./sections/About";
import Career from "./sections/Career";
import Contact from "./sections/Contact";
import Cursor from "./ui/Cursor";
import Landing from "./sections/Landing";
import Navbar from "./ui/Navbar";
import SocialIcons from "./ui/SocialIcons";
import WhatIDo from "./sections/WhatIDo";
import Work from "./sections/Work";
import Process from "./sections/Process";
import Credentials from "./sections/Credentials";
import Cta from "./sections/Cta";
import setSplitText from "../utils/splitText";

const TechStack = lazy(() => import("./sections/TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Process />
            <Credentials />
            <Work />
            <Suspense fallback={<div>Loading....</div>}>
              <TechStack />
            </Suspense>
            <Cta />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
