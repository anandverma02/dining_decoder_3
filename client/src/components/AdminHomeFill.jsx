import { Link } from "react-router-dom";
import {
  FaBook,
  FaChartLine,
  FaCommentDots,
  FaInfoCircle,
  FaQrcode,
  FaUsersCog,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";

export default function AdminHomeFill() {
  return (
    <div className="dd3-dashFill">
      <div className="dd3-dashFillGrid">
        <section className="dd3-card dd3-dashCard">
          <h2 className="dd3-dashCardTitlePlain">Today’s operations checklist</h2>
          <ul className="dd3-dashChecklist">
            <li>Confirm today’s menu is published for all three meals.</li>
            <li>Verify QR payload matches date + meal type before printing or displaying.</li>
            <li>Glance at skips vs attendance — large gaps may mean QR or timing issues.</li>
            <li>Skim vault themes (not individuals) for recurring quality notes.</li>
          </ul>
        </section>

        <section className="dd3-card dd3-dashCard">
          <h2 className="dd3-dashCardTitlePlain">Data quality tips</h2>
          <p className="dd3-dashText">
            Prediction and sentiment work best when students skip honestly and rate soon after meals.
            Deactivate duplicate student accounts instead of deleting history when possible.
          </p>
          <p className="dd3-dashNote">
            Export or screenshot weekly summaries for mess committee meetings — the dashboard date picker
            is your single source of truth.
          </p>
        </section>

        <section className="dd3-card dd3-dashCard">
          <h2 className="dd3-dashCardTitlePlain">All tools</h2>
          <div className="dd3-dashToolGrid">
            <Link className="dd3-dashTool" to="/admin/menu">
              <FaUtensils aria-hidden /> Menu
            </Link>
            <Link className="dd3-dashTool" to="/admin/qr">
              <FaQrcode aria-hidden /> QR
            </Link>
            <Link className="dd3-dashTool" to="/admin/students">
              <FaUsersCog aria-hidden /> Students
            </Link>
            <Link className="dd3-dashTool" to="/admin/prediction">
              <FaChartLine aria-hidden /> Prediction
            </Link>
            <Link className="dd3-dashTool" to="/admin/payments">
              <FaWallet aria-hidden /> Payments
            </Link>
            <Link className="dd3-dashTool" to="/admin/feedbacks">
              <FaCommentDots aria-hidden /> Vault
            </Link>
          </div>
        </section>
      </div>

      <section className="dd3-card dd3-dashWide">
        <h2 className="dd3-dashWideTitle">Resources</h2>
        <div className="dd3-dashWideRow">
          <Link className="dd3-dashPill" to="/help/faq">
            <FaBook aria-hidden /> FAQ
          </Link>
          <Link className="dd3-dashPill" to="/about">
            <FaInfoCircle aria-hidden /> About us
          </Link>
          <Link className="dd3-dashPill" to="/legal/privacy">
            Privacy policy
          </Link>
        </div>
        <p className="dd3-dashFoot">
          Admin actions affect every resident. When in doubt, align with the mess committee before bulk
          changes to menus or student access.
        </p>
      </section>
    </div>
  );
}
