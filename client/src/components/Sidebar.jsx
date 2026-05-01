import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaQrcode,
  FaStar,
  FaWallet,
  FaCommentDots,
  FaUsersCog,
  FaChartLine,
  FaUtensils,
  FaPhoneAlt,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function Item({ to, icon, label, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => (isActive ? "dd3-navItem active" : "dd3-navItem")}
      onClick={onClick}
    >
      <span className="dd3-navIcon">{icon}</span>
      <span className="dd3-navLabel">{label}</span>
    </NavLink>
  );
}

export default function Sidebar({ mobileOpen = false, onClose }) {
  const { user } = useAuth();

  return (
    <aside className={`dd3-sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="dd3-navGroup">
        <div className="dd3-navTitle">Navigation</div>
        <Item to={user?.role === "admin" ? "/admin" : "/student"} icon={<FaHome />} label="Home" end onClick={onClose} />
      </div>

      {user?.role === "student" ? (
        <>
          <div className="dd3-navGroup">
            <div className="dd3-navTitle">Student</div>
            <Item to="/student/menu" icon={<FaUtensils />} label="Menu + Skip" onClick={onClose} />
            <Item to="/student/qr-scan" icon={<FaQrcode />} label="QR Attendance" onClick={onClose} />
            <Item to="/student/rate" icon={<FaStar />} label="Rate Meal" onClick={onClose} />
            <Item to="/student/payments" icon={<FaWallet />} label="Payments" onClick={onClose} />
            <Item to="/student/vault" icon={<FaCommentDots />} label="Anonymous Vault" onClick={onClose} />
          </div>
        </>
      ) : null}

      {user?.role === "admin" ? (
        <>
          <div className="dd3-navGroup">
            <div className="dd3-navTitle">Admin</div>
            <Item to="/admin/menu" icon={<FaUtensils />} label="Menu Manager" onClick={onClose} />
            <Item to="/admin/qr" icon={<FaQrcode />} label="QR Generator" onClick={onClose} />
            <Item to="/admin/students" icon={<FaUsersCog />} label="Students" onClick={onClose} />
            <Item to="/admin/prediction" icon={<FaChartLine />} label="Prediction + Sentiment" onClick={onClose} />
            <Item to="/admin/payments" icon={<FaWallet />} label="Payments" onClick={onClose} />
            <Item to="/admin/feedbacks" icon={<FaCommentDots />} label="Vault Feedbacks" onClick={onClose} />
          </div>
        </>
      ) : null}

      <div className="dd3-navGroup">
        <div className="dd3-navTitle">More</div>
        <a className="dd3-navItem" href="tel:6204994208" onClick={onClose}>
          <span className="dd3-navIcon">
            <FaPhoneAlt />
          </span>
          <span className="dd3-navLabel">Contact Support</span>
        </a>
        <Item to="/about" icon={<FaInfoCircle />} label="About us" onClick={onClose} />
        <Item to="/legal/privacy" icon={<FaShieldAlt />} label="Privacy & security" onClick={onClose} />
      </div>

      <div className="dd3-sidePromo">
        <div className="dd3-sidePromoTitle">Dining Decoder Pro Tips</div>
        <div className="dd3-sidePromoText">
          Check menu early, skip on time, and rate meals daily to improve prediction accuracy.
        </div>
      </div>
    </aside>
  );
}

