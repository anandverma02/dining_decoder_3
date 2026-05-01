import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import WelcomeHero from "../components/WelcomeHero";
import HomeExtras from "../components/HomeExtras";
import AuthFlankLayout from "../components/AuthFlankLayout";

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function signInAs(role) {
    setErr("");
    if (!email.trim() || !password) {
      setErr("Enter your email and password.");
      return;
    }
    setBusy(true);
    try {
      const u = await login(email, password);
      if (role === "student" && u.role !== "student") throw new Error("This account is not a student login.");
      if (role === "admin" && u.role !== "admin") throw new Error("This account is not an admin login.");
      navigate(role === "admin" ? "/admin" : "/student", { replace: true });
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="dd3-landingPage">
      <div className="dd3-landingAuthBand">
        <WelcomeHero headline="You’re at the GEC Gopalganj Boys Mess portal — Dining Decoder 3.0.">
          <p className="dd3-welcomeSub">
            Menus, skips, QR attendance, ratings, anonymous feedback, and mess payments — centered on less
            waste and a calmer dining hall.
          </p>
        </WelcomeHero>

        <AuthFlankLayout flavor="landing">
          <div className="dd3-authCard dd3-hubLoginCard">
            <div className="dd3-authTitle">Sign in</div>
            <div className="dd3-authHint">Use your mess account email and password.</div>
            {err ? <div className="dd3-alert">{err}</div> : null}
            <div className="dd3-form">
              <label className="dd3-label">
                Email
                <input
                  type="email"
                  className="dd3-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
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
                />
              </label>
              <button
                type="button"
                className="dd3-btn dd3-btnStudent"
                disabled={busy}
                onClick={() => signInAs("student")}
              >
                {busy ? "Signing in…" : "Student login"}
              </button>
              <Link className="dd3-btn dd3-btnGhost dd3-hubBtnLink" to="/register/student">
                Student registration
              </Link>
              <button
                type="button"
                className="dd3-btn dd3-btnAdmin"
                disabled={busy}
                onClick={() => signInAs("admin")}
              >
                {busy ? "Signing in…" : "Admin login"}
              </button>
            </div>
          </div>
        </AuthFlankLayout>
      </div>

      <HomeExtras />
    </div>
  );
}
