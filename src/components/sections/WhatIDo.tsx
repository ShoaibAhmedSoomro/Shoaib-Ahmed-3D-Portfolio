import { useEffect, useRef } from "react";
import "../../styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import {
  SiGithubactions,
  SiGooglecloud,
  SiGreensock,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa6";
import { LuCode, LuPlug, LuSmartphone, LuSparkles } from "react-icons/lu";

type Tag = [string, IconType];

const frontendTags: Tag[] = [
  ["JavaScript", SiJavascript],
  ["TypeScript", SiTypescript],
  ["React", SiReact],
  ["Next.js", SiNextdotjs],
  ["Three.js", SiThreedotjs],
  ["GSAP", SiGreensock],
  ["Tailwind CSS", SiTailwindcss],
  ["Responsive UI", LuSmartphone],
];

const backendTags: Tag[] = [
  ["Node.js", SiNodedotjs],
  ["Express.js", SiExpress],
  ["Python", SiPython],
  ["REST APIs", LuPlug],
  ["MySQL", SiMysql],
  ["Google Cloud", SiGooglecloud],
  ["Socket.IO", SiSocketdotio],
  ["AI Integration", LuSparkles],
  ["Linux", SiLinux],
  ["CI/CD", SiGithubactions],
  ["Microsoft 365", FaMicrosoft],
  ["Clean code", LuCode],
];

const Tags = ({ items }: { items: Tag[] }) => (
  <>
    {items.map(([label, Icon]) => (
      <div className="what-tags" key={label}>
        <Icon aria-hidden="true" /> {label}
      </div>
    ))}
  </>
);

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (!ScrollTrigger.isTouch) return;
    const bindings: { el: HTMLDivElement; handler: () => void }[] = [];
    containerRef.current.forEach((container) => {
      if (!container) return;
      container.classList.remove("what-noTouch");
      const handler = () => handleClick(container);
      container.addEventListener("click", handler);
      bindings.push({ el: container, handler });
    });
    return () => {
      bindings.forEach(({ el, handler }) => el.removeEventListener("click", handler));
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>FRONTEND</h3>
              <h4>The pitch</h4>
              <p>
                Interfaces that load fast, look sharp and get out of the
                user's way, with just enough motion to be remembered.
              </p>
              <h5>Tools of the trade</h5>
              <div className="what-content-flex">
                <Tags items={frontendTags} />
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>BACKEND & CLOUD</h3>
              <h4>The pitch</h4>
              <p>
                The engine room: APIs that answer, servers that stay up,
                and AI features that actually earn their place.
              </p>
              <h5>Tools of the trade</h5>
              <div className="what-content-flex">
                <Tags items={backendTags} />
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
