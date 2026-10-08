import "../../styles/Extra.css";
import { LuCompass, LuHammer, LuPencilRuler, LuRadar } from "react-icons/lu";

const steps = [
  {
    Icon: LuCompass,
    title: "Understand",
    text: "Find out what the real problem is, who will use it and what must never break.",
  },
  {
    Icon: LuPencilRuler,
    title: "Plan",
    text: "Choose simple, proven tools and agree on the steps before writing any code.",
  },
  {
    Icon: LuHammer,
    title: "Build",
    text: "Write clear code in small steps that are easy to review.",
  },
  {
    Icon: LuRadar,
    title: "Maintain",
    text: "Deploy, watch the logs and fix problems quickly after launch.",
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
