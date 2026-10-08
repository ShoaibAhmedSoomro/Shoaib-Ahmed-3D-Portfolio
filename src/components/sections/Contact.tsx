import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "../../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Say hello</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:soomro.shoaibahmed@gmail.com" data-cursor="disable">
                soomro.shoaibahmed@gmail.com
              </a>
            </p>
            <h4>Location</h4>
            <p>Sindh, Pakistan. Remote-first, and happy to pack a bag for the right team.</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/ShoaibAhmedSoomro"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <FaGithub aria-hidden="true" /> Github <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/shoaibaofficial"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <FaLinkedinIn aria-hidden="true" /> Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://instagram.com/Shoaib_AhmedSoomro"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <FaInstagram aria-hidden="true" /> Instagram <MdArrowOutward />
            </a>
            <a
              href="https://facebook.com/shoaibahmedsoomroofficial"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <FaFacebook aria-hidden="true" /> Facebook <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Shoaib Ahmed</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
            <nav className="contact-legal" aria-label="Legal">
              <a href="/privacy" data-cursor="disable">Privacy</a>
              <a href="/terms" data-cursor="disable">Terms</a>
              <a href="/disclaimer" data-cursor="disable">Disclaimer</a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
