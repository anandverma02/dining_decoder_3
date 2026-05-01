import { Link } from "react-router-dom";
import { FaUtensils, FaQrcode, FaShieldAlt, FaLeaf, FaClock, FaMobileAlt } from "react-icons/fa";

export default function HomeExtras() {
  return (
    <div className="dd3-homeExtras">
      <section className="dd3-homeSection" aria-labelledby="features-heading">
        <h2 id="features-heading" className="dd3-homeSectionTitle">
          What you can do here
        </h2>
        <p className="dd3-homeSectionIntro">
          Everything is built around one mess day: see the menu, decide early, pay on time, and let the
          kitchen plan with real numbers.
        </p>
        <ul className="dd3-featureGrid">
          <li className="dd3-featureCard">
            <span className="dd3-featureIcon" aria-hidden>
              <FaUtensils />
            </span>
            <h3 className="dd3-featureTitle">Live menus &amp; skips</h3>
            <p className="dd3-featureText">
              Breakfast, lunch, and dinner windows with one-tap skips so portions stay closer to who is
              actually eating.
            </p>
          </li>
          <li className="dd3-featureCard">
            <span className="dd3-featureIcon" aria-hidden>
              <FaQrcode />
            </span>
            <h3 className="dd3-featureTitle">QR attendance</h3>
            <p className="dd3-featureText">
              Scan at the counter to log attendance without paper lists — faster lines, cleaner records.
            </p>
          </li>
          <li className="dd3-featureCard">
            <span className="dd3-featureIcon" aria-hidden>
              <FaShieldAlt />
            </span>
            <h3 className="dd3-featureTitle">Secure sign-in</h3>
            <p className="dd3-featureText">
              Role-based access for students and admins; your mess fees and feedback stay tied to your
              account.
            </p>
          </li>
          <li className="dd3-featureCard">
            <span className="dd3-featureIcon" aria-hidden>
              <FaLeaf />
            </span>
            <h3 className="dd3-featureTitle">Less waste</h3>
            <p className="dd3-featureText">
              Skips and ratings feed simple predictions so the committee can trim surplus without
              guessing.
            </p>
          </li>
        </ul>
      </section>

      <section className="dd3-homeSection dd3-homeSectionTint" aria-labelledby="how-heading">
        <h2 id="how-heading" className="dd3-homeSectionTitle">
          How it works
        </h2>
        <ol className="dd3-steps">
          <li className="dd3-step">
            <span className="dd3-stepIcon" aria-hidden>
              <FaMobileAlt />
            </span>
            <div>
              <strong className="dd3-stepTitle">Sign in or register</strong>
              <p>Use your institute email. Students self-register; admins are provisioned by the committee.</p>
            </div>
          </li>
          <li className="dd3-step">
            <span className="dd3-stepIcon" aria-hidden>
              <FaClock />
            </span>
            <div>
              <strong className="dd3-stepTitle">Plan your meals</strong>
              <p>Check the menu, skip what you will miss, and optionally pay fees from the same portal.</p>
            </div>
          </li>
          <li className="dd3-step">
            <span className="dd3-stepIcon" aria-hidden>
              <FaQrcode />
            </span>
            <div>
              <strong className="dd3-stepTitle">At the mess</strong>
              <p>Scan the meal QR, rate the plate if you like, and use the vault for anonymous suggestions.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="dd3-homeSection" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="dd3-homeSectionTitle">
          Built for the hostel, not a brochure
        </h2>
        <p className="dd3-homeTrust">
          Official channel for <strong>GEC Gopalganj Boys Mess</strong>. No ads, no data resale — just mess
          operations, payments, and feedback in one place. Questions? Use{" "}
          <a className="dd3-inlineLink" href="mailto:anandverma02@gmail.com">
            the contact email
          </a>{" "}
          or read our{" "}
          <Link className="dd3-inlineLink" to="/legal/privacy">
            privacy policy
          </Link>
          .
        </p>
        <p className="dd3-homeCta">
          <Link className="dd3-btn dd3-btnGhost" to="/about">
            Meet the team — About us
          </Link>
          <Link className="dd3-btn dd3-btnPrimary" to="/help/faq">
            Help &amp; FAQ
          </Link>
        </p>
      </section>
    </div>
  );
}
