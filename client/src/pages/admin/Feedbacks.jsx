import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      const res = await api.get("/api/admin/feedback/anonymous");
      setFeedbacks(res.data.feedbacks || []);
    }
    load().catch((e) => setErr(e?.response?.data?.message || e.message || "Failed"));
  }, []);

  return (
    <div className="dd3-card">
      <div className="dd3-cardTitle">Anonymous Vault Feedbacks</div>
      <div className="dd3-muted">No student identity is stored with these messages.</div>
      {err ? <div className="dd3-alert">{err}</div> : null}
      <div className="dd3-list" style={{ marginTop: 12 }}>
        {feedbacks.map((f) => (
          <div key={f._id} className="dd3-listItem">
            <div className="dd3-row dd3-rowBetween dd3-wrap">
              <div className="dd3-pill dd3-pillAccent">{f.category}</div>
              <div className="dd3-pill">{f.sentiment?.label || "neutral"}</div>
            </div>
            <div style={{ marginTop: 8 }}>{f.message}</div>
          </div>
        ))}
        {!feedbacks.length ? <div className="dd3-muted">No feedback yet.</div> : null}
      </div>
    </div>
  );
}

