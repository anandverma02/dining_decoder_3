import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBell, FaQuestionCircle, FaChevronDown, FaBars } from "react-icons/fa";
import logImg from "../assets/log_dd3.png"

export default function AppHeader({ titleRight, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(null);

  function toggleMenu(name) {
    setOpenMenu((prev) => (prev === name ? null : name));
  }

  return (
    <header className="dd3-header">
      <Link className="dd3-brand" to={user?.role === "admin" ? "/admin" : user?.role === "student" ? "/student" : "/"}>
        <img
          className="dd3-brandLogoImg"
          src= {logImg}
          alt="Dining Decoder Logo"
        />
        <div className="dd3-brandText">
          <div className="dd3-brandTop">GEC Gopalganj Boys Mess</div>
          <div className="dd3-brandBottom">Dining Decoder 3.0</div>
        </div>
      </Link>

      <div className="dd3-headerRight">
        {user ? (
          <button className="dd3-iconBtn dd3-mobileOnly" title="Menu" onClick={onToggleSidebar}>
            <FaBars />
          </button>
        ) : null}
        <div className="dd3-headerUtilities">
          <input className="dd3-headerSearch" placeholder="Search menu, feedback, payments..." />
          <button className="dd3-iconBtn" title="Notifications">
            <FaBell />
          </button>
          <button className="dd3-iconBtn" title="Help" onClick={() => toggleMenu("help")}>
            <FaQuestionCircle />
          </button>
          <button className="dd3-iconBtn" title="Links" onClick={() => toggleMenu("links")}>
            <FaChevronDown />
          </button>
          {openMenu === "help" ? (
            <div className="dd3-dropdown dd3-dropdownRight">
              <Link to="/help/faq" onClick={() => setOpenMenu(null)}>
                FAQ
              </Link>
              <a href="mailto:anandverma02@gmail.com" onClick={() => setOpenMenu(null)}>
                Email Support
              </a>
              <a href="tel:6204994208" onClick={() => setOpenMenu(null)}>
                Call Support
              </a>
            </div>
          ) : null}
          {openMenu === "links" ? (
            <div className="dd3-dropdown dd3-dropdownRight">
              <Link to="/legal/privacy" onClick={() => setOpenMenu(null)}>
                Privacy Policy
              </Link>
              <Link to="/legal/terms" onClick={() => setOpenMenu(null)}>
                Terms & Conditions
              </Link>
              <Link to={user?.role === "admin" ? "/admin" : "/student"} onClick={() => setOpenMenu(null)}>
                Dashboard
              </Link>
            </div>
          ) : null}
        </div>
        {titleRight ? <div className="dd3-headerHint">{titleRight}</div> : null}
        {user ? (
          <div className="dd3-userPill">
            <span className="dd3-userName">{user.name || user.email}</span>
            <span className="dd3-userRole">{user.role}</span>
            <button className="dd3-btn dd3-btnGhost" onClick={logout}>
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
