import { useState } from "react";
import api from "../../lib/api";

export default function Vault() {
  const [category, setCategory] = useState("mess");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    setErr("");
    setMsg("");
    try {
      await api.post("/api/student/feedback/anonymous", { category, message });
      setMsg("Feedback sent anonymously. Admin can’t see your name.");
      setMessage("");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed");
    }
  }

  return (
    <div className="dd3-grid2">
      <div className="dd3-card">
        <div className="dd3-cardTitle">Anonymous Vault</div>
        <div className="dd3-muted">Your identity is not stored with this feedback.</div>
        {err ? <div className="dd3-alert">{err}</div> : null}
        {msg ? <div className="dd3-success">{msg}</div> : null}
        <div className="dd3-form">
          <label className="dd3-label">
            Category
            <select className="dd3-input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="mess">Mess</option>
              <option value="menu">Menu</option>
              <option value="hygiene">Hygiene</option>
              <option value="staff">Staff</option>
              <option value="payment">Payment</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="dd3-label">
            Message
            <textarea
              className="dd3-input"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your feedback..."
            />
          </label>
          <button className="dd3-btn dd3-btnPrimary" onClick={submit} disabled={message.trim().length < 3}>
            Send Anonymously
          </button>
        </div>
      </div>

      <div className="dd3-card">
        <div className="dd3-cardTitle">Safety</div>
        <div className="dd3-cardText">
          We store only the message and its sentiment score for analysis. Your user ID/name is not
          attached to the vault entry.
        </div>
      </div>
    </div>
  );
}

