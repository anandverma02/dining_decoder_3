import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import api from "../../lib/api";
import AdminHomeFill from "../../components/AdminHomeFill";

export default function AdminHome() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [summary, setSummary] = useState(null);
  const [err, setErr] = useState("");

  async function load() {
    const res = await api.get("/api/admin/stats/summary", { params: { date } });
    setSummary(res.data);
  }

  useEffect(() => {
    load().catch((e) => setErr(e?.response?.data?.message || e.message || "Failed"));
  }, [date]);

  return (
    <div className="dd3-dashPage">
      <div className="dd3-pageTitle">Admin Dashboard</div>
      <div className="dd3-row dd3-rowBetween">
        <div className="dd3-muted">Daily summary + waste-reduction insights.</div>
        <input className="dd3-input dd3-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {err ? <div className="dd3-alert">{err}</div> : null}

      <div className="dd3-grid3">
        <div className="dd3-card">
          <div className="dd3-cardTitle">Active Students</div>
          <div className="dd3-big">{summary?.activeStudents ?? "—"}</div>
        </div>
        <div className="dd3-card">
          <div className="dd3-cardTitle">Skips</div>
          <div className="dd3-big">{summary?.skips ?? "—"}</div>
        </div>
        <div className="dd3-card">
          <div className="dd3-cardTitle">Attendance</div>
          <div className="dd3-big">{summary?.attendance ?? "—"}</div>
        </div>
      </div>

      <div className="dd3-grid2">
        <div className="dd3-card">
          <div className="dd3-cardTitle">Meal Rating</div>
          <div className="dd3-muted">Average stars + sentiment distribution</div>
          <div className="dd3-row dd3-rowBetween" style={{ marginTop: 10 }}>
            <div className="dd3-pill dd3-pillAccent">
              Avg: {summary?.ratings?.avgStars ? `${summary.ratings.avgStars}★` : "—"}
            </div>
            <div className="dd3-pill">Count: {summary?.ratings?.count ?? "—"}</div>
          </div>
          <div className="dd3-list" style={{ marginTop: 12 }}>
            <div className="dd3-listItem">
              Positive: <b>{summary?.ratings?.sentimentDist?.positive ?? "—"}</b>
            </div>
            <div className="dd3-listItem">
              Neutral: <b>{summary?.ratings?.sentimentDist?.neutral ?? "—"}</b>
            </div>
            <div className="dd3-listItem">
              Negative: <b>{summary?.ratings?.sentimentDist?.negative ?? "—"}</b>
            </div>
          </div>
        </div>

        <div className="dd3-card dd3-heroCard">
          <div className="dd3-cardTitle">Mess Prediction</div>
          <div className="dd3-cardText">
            Attendance prediction uses meal skips + last-week show-up rate to estimate demand and
            reduce food waste.
          </div>
          <div className="dd3-row">
            <Link className="dd3-btn dd3-btnPrimary" to="/admin/prediction">
              Open Prediction
            </Link>
            <Link className="dd3-btn dd3-btnGhost" to="/admin/qr">
              Generate QR
            </Link>
          </div>
        </div>
      </div>

      <AdminHomeFill />
    </div>
  );
}
