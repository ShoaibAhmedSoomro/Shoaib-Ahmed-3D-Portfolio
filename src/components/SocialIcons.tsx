import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll<HTMLSpanElement>("span").forEach((elem) => {
      const link = elem.querySelector("a");
      if (!link) return;

      let rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let rafId = 0;
      let cancelled = false;

      const updatePosition = () => {
        if (cancelled) return;
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        (link as HTMLElement).style.setProperty("--siLeft", `${currentX}px`);
        (link as HTMLElement).style.setProperty("--siTop", `${currentY}px`);
        rafId = requestAnimationFrame(updatePosition);
      };

      const onMove = (e: MouseEvent) => {
        rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMove);
      rafId = requestAnimationFrame(updatePosition);
      cleanups.push(() => {
        cancelled = true;
        cancelAnimationFrame(rafId);
        document.removeEventListener("mousemove", onMove);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <div className="icons-section">
      <nav className="social-icons" data-cursor="icons" id="social" aria-label="Social links">
        <span>
          <a
            href="https://github.com/ShoaibAhmedSoomro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub aria-hidden="true" />
          </a>
        </span>
        <span>
          <a
            href="https://linkedin.com/in/shoaibaofficial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FaLinkedinIn aria-hidden="true" />
          </a>
        </span>
        <span>
          <a
            href="https://instagram.com/Shoaib_AhmedSoomro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
          >
            <FaInstagram aria-hidden="true" />
          </a>
        </span>
        <span>
          <a
            href="https://facebook.com/shoaibahmedsoomroofficial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook profile"
          >
            <FaFacebook aria-hidden="true" />
          </a>
        </span>
      </nav>
      <a
        className="resume-button"
        href="/resume/Shoaib_Ahmed.pdf"
        download="Shoaib_Ahmed_Resume.pdf"
        aria-label="Download résumé as PDF"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes aria-hidden="true" />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
