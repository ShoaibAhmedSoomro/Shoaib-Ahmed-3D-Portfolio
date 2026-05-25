import { useLayoutEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useLayoutEffect(() => {
    // Only enable horizontal scroll animation on desktop (> 1024px)
    if (window.innerWidth <= 1024) {
      return; // Skip horizontal scroll on mobile
    }

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
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
          {projects.map((p) => (
            <div key={p.id} className="work-box">
              <div className="work-info">
                <div className="work-title">
                  <h3>{p.id}</h3>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{p.tools}</p>
              </div>
              <WorkImage image={p.image} alt={p.alt} link={p.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
