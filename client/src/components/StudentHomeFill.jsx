import { Link } from "react-router-dom";
import { FaBook, FaEnvelope, FaHeart, FaInfoCircle, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";

export default function StudentHomeFill() {
  return (
    <div className="dd3-dashFill">
      <div className="dd3-dashFillGrid">
        <section className="dd3-card dd3-dashCard">
          <div className="dd3-dashCardHead">
            <FaInfoCircle className="dd3-dashCardIcon" aria-hidden />
            <h2 className="dd3-dashCardTitle">Mess hours &amp; rhythm</h2>
          </div>
          <ul className="dd3-dashList">
            <li>
              <strong>Breakfast</strong> 7:00 AM – 10:00 AM
            </li>
            <li>
              <strong>Lunch</strong> 12:00 PM – 3:00 PM
            </li>
            <li>
              <strong>Dinner</strong> 7:00 PM – 10:00 PM
            </li>
          </ul>
          <p className="dd3-dashNote">QR codes are meal-specific — scan during the correct window.</p>
        </section>

        <section className="dd3-card dd3-dashCard">
          <div className="dd3-dashCardHead">
            <FaHeart className="dd3-dashCardIcon" aria-hidden />
            <h2 className="dd3-dashCardTitle">Habits that help everyone</h2>
          </div>
          <ul className="dd3-dashChecklist">
            <li>Check the menu before you queue — fewer surprises at the counter.</li>
            <li>Skip as soon as you know you’ll miss a meal.</li>
            <li>Rate after eating; slang ratings still feed useful trends.</li>
            <li>Use Vault for sensitive feedback; it stays anonymous to admins.</li>
          </ul>
        </section>

        <section className="dd3-card dd3-dashCard">
          <div className="dd3-dashCardHead">
            <FaShieldAlt className="dd3-dashCardIcon" aria-hidden />
            <h2 className="dd3-dashCardTitle">Account &amp; payments</h2>
          </div>
          <p className="dd3-dashText">
            Keep one account per resident. Mess fees and attendance history stay under your login. If you
            change phones, sign in again — your data is on the server, not the device.
          </p>
          <Link className="dd3-btn dd3-btnGhost dd3-dashBtn" to="/student/payments">
            Go to payments
          </Link>
        </section>
      </div>

      <section className="dd3-card dd3-dashWide">
        <h2 className="dd3-dashWideTitle">Help &amp; community</h2>
        <div className="dd3-dashWideRow">
          <Link className="dd3-dashPill" to="/help/faq">
            <FaBook aria-hidden /> FAQ &amp; guides
          </Link>
          <Link className="dd3-dashPill" to="/about">
            <FaInfoCircle aria-hidden /> About the team
          </Link>
          <a className="dd3-dashPill" href="mailto:anandverma02@gmail.com">
            <FaEnvelope aria-hidden /> Email support
          </a>
          <a className="dd3-dashPill" href="tel:6204994208">
            <FaPhoneAlt aria-hidden /> Call mess desk
          </a>
        </div>
        <p className="dd3-dashFoot">
          Dining Decoder 3.0 is for <strong>GEC Gopalganj Boys Mess</strong> residents. Report bugs or
          billing issues through email with your roll number and meal date.
        </p>
      </section>
    </div>
  );
}
