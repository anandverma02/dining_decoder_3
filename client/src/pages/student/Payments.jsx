import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Payments() {
  const [amount, setAmount] = useState(2000);
  const [note, setNote] = useState("Monthly mess fee");
  const [payments, setPayments] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await api.get("/api/payment/mine");
    setPayments(res.data.payments || []);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function createPayment() {
    setErr("");
    setMsg("");
    try {
      const res = await api.post("/api/payment/create", { amount: Number(amount), note });
      if (res.data.provider === "stripe" && res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
        return;
      }
      setMsg("Mock payment created. Click confirm to mark it paid (dev mode).");
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Payment failed");
    }
  }

  async function confirmMock(paymentId) {
    setErr("");
    setMsg("");
    try {
      await api.post("/api/payment/mock/confirm", { paymentId });
      setMsg("Payment marked as PAID (mock).");
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Confirm failed");
    }
  }

  return (
    <div className="dd3-grid2">
      <div className="dd3-card">
        <div className="dd3-cardTitle">Payments</div>
        <div className="dd3-muted">Stripe-ready (env keys), with mock mode for local demo.</div>
        {err ? <div className="dd3-alert">{err}</div> : null}
        {msg ? <div className="dd3-success">{msg}</div> : null}
        <div className="dd3-form">
          <label className="dd3-label">
            Amount (INR)
            <input className="dd3-input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <label className="dd3-label">
            Note
            <input className="dd3-input" value={note} onChange={(e) => setNote(e.target.value)} />
          </label>
          <button className="dd3-btn dd3-btnPrimary" onClick={createPayment}>
            Pay Now
          </button>
        </div>
      </div>

      <div className="dd3-card">
        <div className="dd3-cardTitle">My Payments</div>
        <div className="dd3-list">
          {payments.map((p) => (
            <div key={p._id} className="dd3-listItem dd3-row dd3-rowBetween">
              <div>
                <div className="dd3-muted">
                  {p.provider.toUpperCase()} • {p.currency.toUpperCase()} {p.amount}
                </div>
                <div className="dd3-pill">{p.status}</div>
              </div>
              {p.provider === "mock" && p.status !== "paid" ? (
                <button className="dd3-btn dd3-btnGhost" onClick={() => confirmMock(p._id)}>
                  Confirm (mock)
                </button>
              ) : null}
            </div>
          ))}
          {!payments.length ? <div className="dd3-muted">No payments yet.</div> : null}
        </div>
      </div>
    </div>
  );
}

