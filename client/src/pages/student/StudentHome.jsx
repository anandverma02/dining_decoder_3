import { Link } from "react-router-dom";
import DailyJokeCard from "../../components/DailyJokeCard";
import StudentHomeFill from "../../components/StudentHomeFill";

export default function StudentHome() {
  return (
    <div className="dd3-dashPage">
      <div className="dd3-grid2">
        <div className="dd3-card dd3-heroCard">
          <div className="dd3-cardTitle">Today at the Mess</div>
          <div className="dd3-cardText">
            Check time-wise menu (Breakfast 7-10 AM, Lunch 12-3 PM, Dinner 7-10 PM), skip a meal in
            one tap, rate the meal with Bhojpuri slangs, and mark attendance via QR.
          </div>
          <div className="dd3-row">
            <Link className="dd3-btn dd3-btnPrimary" to="/student/menu">
              Open Menu
            </Link>
            <Link className="dd3-btn dd3-btnGhost" to="/student/qr-scan">
              Scan QR Attendance
            </Link>
          </div>
        </div>

        <div className="dd3-card">
          <div className="dd3-cardTitle">Quick Actions</div>
          <div className="dd3-list">
            <Link className="dd3-listItem" to="/student/rate">
              Rate today’s meal (1–5 stars + slang)
            </Link>
            <Link className="dd3-listItem" to="/student/vault">
              Anonymous Vault feedback (admin can’t see your name)
            </Link>
            <Link className="dd3-listItem" to="/student/payments">
              Pay mess fees
            </Link>
          </div>
        </div>
      </div>

      <DailyJokeCard />

      <StudentHomeFill />
    </div>
  );
}
