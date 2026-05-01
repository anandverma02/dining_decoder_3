import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function PaymentsAdmin() {
  const [payments, setPayments] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      const res = await api.get("/api/payment/all");
      setPayments(res.data.payments || []);
    }
    load().catch((e) => setErr(e?.response?.data?.message || e.message || "Failed"));
  }, []);

  return (
    <div className="dd3-card">
      <div className="dd3-cardTitle">All Payments</div>
      {err ? <div className="dd3-alert">{err}</div> : null}
      <div className="dd3-list" style={{ marginTop: 12 }}>
        {payments.map((p) => (
          <div key={p._id} className="dd3-listItem dd3-row dd3-rowBetween dd3-wrap">
            <div>
              <div className="dd3-pill dd3-pillAccent">{p.student?.name || "Student"}</div>
              <div className="dd3-muted">{p.student?.email}</div>
            </div>
            <div className="dd3-row dd3-wrap">
              <div className="dd3-pill">{p.provider}</div>
              <div className="dd3-pill">{p.status}</div>
              <div className="dd3-pill">
                {p.currency.toUpperCase()} {p.amount}
              </div>
            </div>
          </div>
        ))}
        {!payments.length ? <div className="dd3-muted">No payments yet.</div> : null}
      </div>
    </div>
  );
}

