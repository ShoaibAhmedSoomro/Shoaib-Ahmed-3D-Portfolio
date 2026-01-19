import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer</h4>
                <h5>Asico Real Estate LLC — Dubai (Remote)</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Build and maintain internal and customer-facing web applications;
              integrate AI-assisted experiences while focusing on maintainability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer</h4>
                <h5>Pak Affairs — Islamabad</h5>
              </div>
              <h3>2023-24</h3>
            </div>
            <p>
              Delivered web features end-to-end and supported production
              troubleshooting; improved stability via refactoring and bug fixes.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Remote Monitoring & Control Specialist</h4>
                <h5>ACT Group (Wind Power Plant)</h5>
              </div>
              <h3>2020-22</h3>
            </div>
            <p>
              Monitored real-time turbine operations, analyzed trends, and
              coordinated maintenance actions in a high-reliability environment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern — Cyber Crime Wing</h4>
                <h5>Federal Investigation Agency (FIA), NR3C</h5>
              </div>
              <h3>2019</h3>
            </div>
            <p>
              Assisted with web application security testing and minor incident
              triage; gained exposure to threat research and malware analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
