import { useLayoutEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useLayoutEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        onEnter: () => {
          document.querySelector(".work-section")?.classList.add("work-pinned");
        },
        onLeave: () => {
          document.querySelector(".work-section")?.classList.remove("work-pinned");
        },
        onEnterBack: () => {
          document.querySelector(".work-section")?.classList.add("work-pinned");
        },
        onLeaveBack: () => {
          document.querySelector(".work-section")?.classList.remove("work-pinned");
        },
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up on unmount
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {/* Project 1: ASICO WhatsApp Bot */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>ASICO WhatsApp Bot</h4>
                  <p>CRM & Automation</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Node.js, Express, MySQL, Socket.IO, WhatsApp API</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="ASICO WhatsApp Bot" link="https://github.com/ShoaibAhmedSoomro" />
          </div>

          {/* Project 2: Interactive Resume */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Interactive Resume NextGen</h4>
                  <p>Portfolio & Resume</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React 19, GSAP, Framer Motion, Three.js, Tailwind</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Interactive Resume" link="https://github.com/ShoaibAhmedSoomro" />
          </div>

          {/* Project 3: High-Performance Portfolio */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>High-Performance Portfolio</h4>
                  <p>Web Development</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Next.js, TypeScript, React, Tailwind, Three.js</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Portfolio" link="https://github.com/ShoaibAhmedSoomro" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
