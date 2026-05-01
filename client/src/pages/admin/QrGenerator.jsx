import { useState } from "react";
import dayjs from "dayjs";
import api from "../../lib/api";

export default function QrGenerator() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [mealType, setMealType] = useState("breakfast");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [err, setErr] = useState("");

  async function generate() {
    setErr("");
    setQrDataUrl("");
    try {
      const res = await api.get(`/api/admin/qr/${date}/${mealType}`);
      setQrDataUrl(res.data.qrDataUrl);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed");
    }
  }

  return (
    <div className="dd3-grid2">
      <div className="dd3-card">
        <div className="dd3-cardTitle">Meal QR Generator</div>
        <div className="dd3-muted">Display this QR in the mess for students to scan.</div>
        {err ? <div className="dd3-alert">{err}</div> : null}
        <div className="dd3-row dd3-wrap">
          <input className="dd3-input dd3-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <select className="dd3-input" value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <button className="dd3-btn dd3-btnPrimary" onClick={generate}>
            Generate
          </button>
        </div>
      </div>

      <div className="dd3-card">
        <div className="dd3-cardTitle">QR Preview</div>
        {qrDataUrl ? <img className="dd3-qrImg" src={qrDataUrl} alt="Meal QR" /> : <div className="dd3-muted">Generate to preview.</div>}
      </div>
    </div>
  );
}

