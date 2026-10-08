import "../../styles/Extra.css";
import type { IconType } from "react-icons";
import { SiGooglecloud, SiPython } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa6";
import { LuGraduationCap, LuShieldCheck } from "react-icons/lu";

const credentials: { Icon: IconType; title: string; meta: string }[] = [
  { Icon: LuGraduationCap, title: "BS, Computer Science", meta: "University of Sindh · 2020 to 2023" },
  { Icon: SiGooglecloud, title: "Implement Load Balancing on Compute Engine", meta: "Google Cloud Skill Badge" },
  { Icon: LuShieldCheck, title: "Information Security Associate", meta: "ISO/IEC 27001" },
  { Icon: FaMicrosoft, title: "Microsoft 365 compliance training", meta: "MS-102 learning path" },
  { Icon: FaMicrosoft, title: "Defend Against Threats with Microsoft 365", meta: "Microsoft training" },
  { Icon: SiPython, title: "Python Essentials 1", meta: "Python" },
];

const Credentials = () => (
  <section className="extra-section section-container" id="credentials" aria-labelledby="cred-title">
    <h2 id="cred-title" className="extra-title">
      Education and <span>certifications</span>
    </h2>
    <ul className="cred-grid">
      {credentials.map(({ Icon, title, meta }) => (
        <li key={title} className="cred-card">
          <Icon aria-hidden="true" className="cred-icon" />
          <div>
            <h3>{title}</h3>
            <p>{meta}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default Credentials;
