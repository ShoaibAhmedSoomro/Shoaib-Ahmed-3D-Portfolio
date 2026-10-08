import "../../styles/Extra.css";
import { MdArrowOutward } from "react-icons/md";

const Cta = () => (
  <section className="cta-section section-container" aria-labelledby="cta-title">
    <p className="cta-kicker">
      <span className="cta-dot" aria-hidden="true" /> Open to remote work and relocation
    </p>
    <h2 id="cta-title">
      Need help with servers, cloud or a <span>web app</span>?
    </h2>
    <a className="cta-button" href="mailto:soomro.shoaibahmed@gmail.com" data-cursor="disable">
      Email me <MdArrowOutward aria-hidden="true" />
    </a>
  </section>
);

export default Cta;
