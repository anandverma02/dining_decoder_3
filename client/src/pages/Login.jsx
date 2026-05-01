import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import WelcomeHero from "../components/WelcomeHero";
import MissionPlain from "../components/MissionPlain";
import AuthFlankLayout from "../components/AuthFlankLayout";

export default function Login() {
  const { kind } = useParams(); // student | admin
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.body.classList.remove("theme-student", "theme-admin");
    document.body.classList.add(kind === "admin" ? "theme-admin" : "theme-student");
  }, [kind]);

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") navigate("/admin", { replace: true });
    if (user.role === "student") navigate("/student", { replace: true });
  }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const u = await login(email, password);
      if (kind === "admin" && u.role !== "admin") throw new Error("Not an admin account");
      if (kind === "student" && u.role !== "student") throw new Error("Not a student account");
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  const headline =
    kind === "admin"
      ? "Administrator sign-in — menus, QR, students, and insights."
      : "Student sign-in — menu, skips, QR attendance, and mess wallet.";

  const flavor = kind === "admin" ? "admin" : "student";

  return (
    <div className="dd3-landingAuthBand">
      <WelcomeHero kicker="Welcome" headline={headline} />

      <AuthFlankLayout flavor={flavor}>
        <div className="dd3-authCard dd3-hubLoginCard">
          <div className="dd3-authTitle">{kind === "admin" ? "Admin Login" : "Student Login"}</div>
          <div className="dd3-authHint">Enter your email and password.</div>
          {err ? <div className="dd3-alert">{err}</div> : null}
          <form onSubmit={onSubmit} className="dd3-form">
            <label className="dd3-label">
              Email
              <input
                type="email"
                className="dd3-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
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
                autoComplete="current-password"
                required
              />
            </label>
            <button className="dd3-btn dd3-btnPrimary" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
            <div className="dd3-hubLoginLinks">
              {kind === "student" ? (
                <Link className="dd3-inlineLink" to="/register/student">
                  Student registration
                </Link>
              ) : null}
              {kind === "student" ? (
                <Link className="dd3-inlineLink" to="/login/admin">
                  Admin login instead
                </Link>
              ) : (
                <Link className="dd3-inlineLink" to="/login/student">
                  Student login instead
                </Link>
              )}
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
