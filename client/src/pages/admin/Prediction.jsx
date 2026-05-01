import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import api from "../../lib/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Prediction() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [pred, setPred] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      setErr("");
      const res = await api.get("/api/admin/prediction", { params: { date } });
      setPred(res.data);
    }
    load().catch((e) => setErr(e?.response?.data?.message || e.message || "Failed"));
  }, [date]);

  const chart = useMemo(() => {
    const labels = (pred?.predictions || []).map((p) => p.mealType.toUpperCase());
    const eligible = (pred?.predictions || []).map((p) => p.eligible);
    const predicted = (pred?.predictions || []).map((p) => p.predicted);
    return {
      labels,
      datasets: [
        { label: "Eligible (Active - Skips)", data: eligible, backgroundColor: "rgba(255,255,255,0.22)" },
        { label: "Predicted Attendance", data: predicted, backgroundColor: "rgba(0,0,0,0.0)", borderColor: "var(--accent)", borderWidth: 2 },
      ],
    };
  }, [pred]);

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "rgba(255,255,255,0.85)" } },
      title: { display: true, text: "Attendance Prediction", color: "rgba(255,255,255,0.9)" },
    },
    scales: {
      x: { ticks: { color: "rgba(255,255,255,0.85)" }, grid: { color: "rgba(255,255,255,0.08)" } },
      y: { ticks: { color: "rgba(255,255,255,0.85)" }, grid: { color: "rgba(255,255,255,0.08)" } },
    },
  };

  return (
    <div>
      <div className="dd3-pageTitle">Prediction + Sentiment</div>
      <div className="dd3-row dd3-rowBetween">
        <div className="dd3-muted">Predicted attendance per meal using skips + last-week trends.</div>
        <input className="dd3-input dd3-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {err ? <div className="dd3-alert">{err}</div> : null}

      <div className="dd3-card dd3-chartCard">{pred ? <Bar data={chart} options={options} /> : <div className="dd3-muted">Loading...</div>}</div>

      <div className="dd3-grid3">
        {(pred?.predictions || []).map((p) => (
          <div key={p.mealType} className="dd3-card">
            <div className="dd3-cardTitle">{p.mealType.toUpperCase()}</div>
            <div className="dd3-list">
              <div className="dd3-listItem">Skips: <b>{p.skipCount}</b></div>
              <div className="dd3-listItem">Eligible: <b>{p.eligible}</b></div>
              <div className="dd3-listItem">Avg rate: <b>{p.avgRate}</b></div>
              <div className="dd3-listItem">Predicted: <b>{p.predicted}</b></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

