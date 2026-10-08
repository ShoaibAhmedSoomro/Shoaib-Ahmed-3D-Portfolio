import "../../styles/Extra.css";
import { LuCompass, LuHammer, LuPencilRuler, LuRadar } from "react-icons/lu";

const steps = [
  {
    Icon: LuCompass,
    title: "Understand",
    text: "I ask the awkward questions early, so nobody has to answer them at 2 a.m. later.",
  },
  {
    Icon: LuPencilRuler,
    title: "Shape",
    text: "Sketch the architecture, pick boring tech where it counts, and keep the clever bits for where users can feel them.",
  },
  {
    Icon: LuHammer,
    title: "Build",
    text: "Small, reviewable steps: typed code, sane APIs and components I would be happy to inherit.",
  },
  {
    Icon: LuRadar,
    title: "Keep it alive",
    text: "Deploy, watch, tune. Shipping is the starting line; logs, uptime and fast fixes are the real finish.",
  },
];

const Process = () => (
  <section className="extra-section section-container" id="process" aria-labelledby="process-title">
    <h2 id="process-title" className="extra-title">
      How I <span>work</span>
    </h2>
    <ol className="process-grid">
      {steps.map(({ Icon, title, text }, i) => (
        <li key={title} className="process-card">
          <span className="process-num">0{i + 1}</span>
          <Icon aria-hidden="true" className="process-icon" />
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default Process;
