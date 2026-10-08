import "../../styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Full-stack developer with 13+ years of experience shipping web products end-to-end (frontend, backend, cloud deployment).
          Strong in React, Node.js, and Python; experienced integrating AI features and building reliable, maintainable systems.
          Focused on clean architecture, performance, and measurable business impact.
        </p>
        <ul className="about-facts" aria-label="Quick facts">
          <li><strong>13+</strong> years</li>
          <li><strong>IT Infra</strong> @ Asico</li>
          <li><strong>BS CS</strong> Univ. of Sindh</li>
          <li><strong>ISO 27001</strong> Associate</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
