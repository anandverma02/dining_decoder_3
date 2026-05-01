import { Link } from "react-router-dom";
import { FaCheckCircle, FaClock, FaLock, FaQrcode, FaStar, FaUtensils } from "react-icons/fa";
import DailyFoodQuote from "./DailyFoodQuote";

function SideLeft({ flavor }) {
  const isAdmin = flavor === "admin";
  return (
    <aside className="dd3-authSide dd3-authSideLeft" aria-label="Why use this portal">
      <div className="dd3-authSideBadge">
        <FaLock aria-hidden />
        <span>Official GEC Gopalganj Boys Mess portal</span>
      </div>
      <h2 className="dd3-authSideTitle">Built for real meal windows</h2>
      <ul className="dd3-authSideList">
        <li>
          <FaClock className="dd3-authSideIcon" aria-hidden />
          <div>
            <strong>Breakfast 8–10 · Lunch 1–3 · Dinner 8–10</strong>
            <span>Menus and QR tokens follow the same clock the kitchen uses.</span>
          </div>
        </li>
        <li>
          <FaUtensils className="dd3-authSideIcon" aria-hidden />
          <div>
            <strong>Skip early, eat on time</strong>
            <span>One-tap skips help portions match who actually shows up.</span>
          </div>
        </li>
        <li>
          <FaLock className="dd3-authSideIcon" aria-hidden />
          <div>
            <strong>Role-based access</strong>
            <span>
              {isAdmin
                ? "Admin tools stay separate from student accounts."
                : "Students and admins each see only what they need."}
            </span>
          </div>
        </li>
      </ul>
      <div className="dd3-authSideTrust">
        <FaCheckCircle aria-hidden />
        <span>Sign-in is encrypted in transit. Use only your mess email on file.</span>
      </div>
    </aside>
  );
}

function SideRight({ flavor }) {
  const isAdmin = flavor === "admin";
  const isRegister = flavor === "register";
  return (
    <aside className="dd3-authSide dd3-authSideRight" aria-label="Tips and links">
      <h2 className="dd3-authSideTitle">{isAdmin ? "Admin quick wins" : "Get the most from the app"}</h2>
      <ol className="dd3-authSideSteps">
        {isAdmin ? (
          <>
            <li>Publish menus before each meal window so skips stay meaningful.</li>
            <li>Regenerate QR when the date or meal type changes.</li>
            <li>Scan vault feedback weekly — patterns beat single angry messages.</li>
          </>
        ) : isRegister ? (
          <>
            <li>Use the email you want on mess records; you’ll sign in with it daily.</li>
            <li>Pick a strong password — payments and attendance tie to this account.</li>
            <li>Add roll number when you have it; admins can still verify in person.</li>
          </>
        ) : (
          <>
            <li>
              <FaQrcode className="dd3-authSideStepIcon" aria-hidden /> Scan QR at the counter during the
              right meal — not from your room.
            </li>
            <li>
              <FaStar className="dd3-authSideStepIcon" aria-hidden /> Rate after eating; it trains
              sentiment without exposing your name in vault mode.
            </li>
            <li>Skip before the kitchen starts prep when you can — that saves the most food.</li>
          </>
        )}
      </ol>
      <DailyFoodQuote />
      <nav className="dd3-authSideLinks" aria-label="Related pages">
        <Link to="/about">About us</Link>
        <Link to="/help/faq">FAQ</Link>
        <Link to="/legal/privacy">Privacy</Link>
        <Link to="/">Home</Link>
      </nav>
    </aside>
  );
}

/** flavor: landing | student | admin | register */
export default function AuthFlankLayout({ children, flavor = "landing" }) {
  return (
    <div className="dd3-authHeroRow">
      <SideLeft flavor={flavor} />
      <div className="dd3-authCenter">{children}</div>
      <SideRight flavor={flavor} />
    </div>
  );
}
