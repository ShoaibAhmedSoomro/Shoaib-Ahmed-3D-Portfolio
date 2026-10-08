import "../../styles/About.css";
import { yearsOfExperience } from "../../data/profile";

const About = () => {
  const years = yearsOfExperience();
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am an IT infrastructure engineer with {years} years in IT. I keep servers and cloud systems running on
          Google Cloud and Linux, manage Microsoft 365 security settings, and build the Node.js, React and Python web
          apps that run on them.
        </p>
        <ul className="about-facts" aria-label="Quick facts">
          <li><strong>{years} years</strong> of experience</li>
          <li><strong>IT Infrastructure</strong> at Asico</li>
          <li><strong>BS</strong> Computer Science</li>
          <li><strong>ISO 27001</strong> Associate</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
