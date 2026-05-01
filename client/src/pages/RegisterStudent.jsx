import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import WelcomeHero from "../components/WelcomeHero";
import MissionPlain from "../components/MissionPlain";
import AuthFlankLayout from "../components/AuthFlankLayout";

export default function RegisterStudent() {
  const navigate = useNavigate();
  const { user, registerStudent } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.body.classList.remove("theme-admin");
    document.body.classList.add("theme-student");
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role === "student") navigate("/student", { replace: true });
    if (user.role === "admin") navigate("/admin", { replace: true });
  }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await registerStudent({
        name,
        email,
        password,
        rollNo: rollNo.trim() || undefined,
        phone: phone.trim() || undefined,
      });
      navigate("/student", { replace: true });
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="dd3-landingAuthBand">
      <WelcomeHero
        kicker="Welcome"
        headline="Create your student account for the mess portal."
      />

      <AuthFlankLayout flavor="register">
        <div className="dd3-authCard dd3-hubLoginCard">
          <div className="dd3-authTitle">Student registration</div>
          <div className="dd3-authHint">Use your institute email and a password you’ll remember.</div>
          {err ? <div className="dd3-alert">{err}</div> : null}
          <form onSubmit={onSubmit} className="dd3-form">
            <label className="dd3-label">
              Full name
              <input
                className="dd3-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                minLength={2}
              />
            </label>
            <label className="dd3-label">
              Email
              <input
                type="email"
                className="dd3-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label className="dd3-label">
              Password
              <input
                type="password"
                className="dd3-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                minLength={6}
              />
            </label>
            <label className="dd3-label">
              Roll number <span className="dd3-optional">(optional)</span>
              <input
                className="dd3-input"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                autoComplete="off"
              />
            </label>
            <label className="dd3-label">
              Phone <span className="dd3-optional">(optional)</span>
              <input
                type="tel"
                className="dd3-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </label>
            <button className="dd3-btn dd3-btnPrimary" disabled={busy}>
              {busy ? "Creating account…" : "Register"}
            </button>
            <div className="dd3-hubLoginLinks">
              <Link className="dd3-inlineLink" to="/login/student">
                Already registered? Student login
              </Link>
              <Link className="dd3-inlineLink" to="/">
                Back to home
              </Link>
            </div>
          </form>
        </div>
      </AuthFlankLayout>

      <div className="dd3-missionBand">
        <MissionPlain />
      </div>
    </div>
  );
}
