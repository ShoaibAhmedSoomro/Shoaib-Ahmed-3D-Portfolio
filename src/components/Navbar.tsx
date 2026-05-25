import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { setSmoother, getSmoother } from "./utils/smootherRegistry";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    setSmoother(smoother);

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    const linkBindings: Array<{ el: HTMLAnchorElement; fn: EventListener }> = [];
    links.forEach((element) => {
      const fn: EventListener = (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          const s = getSmoother();
          if (section && s) s.scrollTo(section, true, "top top");
        }
      };
      element.addEventListener("click", fn);
      linkBindings.push({ el: element, fn });
    });

    const onResize = () => ScrollSmoother.refresh(true);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      linkBindings.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      smoother.kill();
      setSmoother(null);
    };
  }, []);
  return (
    <>
      <header className="header" role="banner">
        <a
          href="/#"
          className="navbar-title"
          data-cursor="disable"
          aria-label="Shoaib Ahmed — home"
        >
          <img src="/images/logo.webp" alt="Shoaib Ahmed logo" className="navbar-logo" />
        </a>
        <a
          href="mailto:soomro.shoaibahmed@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
          aria-label="Email Shoaib Ahmed"
        >
          soomro.shoaibahmed@gmail.com
        </a>
        <nav aria-label="Primary">
          <ul>
            <li>
              <a data-href="#about" href="#about" aria-label="Go to About section">
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a data-href="#work" href="#work" aria-label="Go to Work section">
                <HoverLinks text="WORK" />
              </a>
            </li>
            <li>
              <a data-href="#contact" href="#contact" aria-label="Go to Contact section">
                <HoverLinks text="CONTACT" />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
