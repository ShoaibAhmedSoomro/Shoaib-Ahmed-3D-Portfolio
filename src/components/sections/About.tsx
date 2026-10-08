import "../../styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I build what you see and what keeps it standing: React on the front, Node and Python behind it, Linux and cloud
          underneath, with a little AI where it earns its keep. 13+ years in, I still care about the same thing: software
          that is a joy to use and boring to run.
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
