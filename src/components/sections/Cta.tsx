import "../../styles/Extra.css";
import { MdArrowOutward } from "react-icons/md";

const Cta = () => (
  <section className="cta-section section-container" aria-labelledby="cta-title">
    <p className="cta-kicker">
      <span className="cta-dot" aria-hidden="true" /> Open to remote &amp; relocation
    </p>
    <h2 id="cta-title">
      Got a system to ship, scale or <span>untangle</span>?
    </h2>
    <a className="cta-button" href="mailto:soomro.shoaibahmed@gmail.com" data-cursor="disable">
      Let&rsquo;s talk <MdArrowOutward aria-hidden="true" />
    </a>
  </section>
);

export default Cta;
