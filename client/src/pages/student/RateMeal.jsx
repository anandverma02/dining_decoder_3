import { useMemo, useState } from "react";
import dayjs from "dayjs";
import api from "../../lib/api";

const slangByStars = {
  5: "mess me mela lga hai",
  4: "maja aa gail",
  3: "thik-thak ba",
  2: "kuchh kami ba",
  1: "bahar kha lo",
};

export default function RateMeal() {
  const date = useMemo(() => dayjs().format("YYYY-MM-DD"), []);
  const [mealType, setMealType] = useState("breakfast");
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const slang = slangByStars[stars] || "thik-thak ba";

  async function submit() {
    setErr("");
    setMsg("");
    try {
      const res = await api.post("/api/student/rate", { date, mealType, stars, comment });
      setMsg(`Saved rating: ${res.data.rating.stars}★ — "${res.data.rating.slang}"`);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to rate");
    }
  }

  return (
    <div className="dd3-grid2">
      <div className="dd3-card">
        <div className="dd3-cardTitle">Meal Quality Rating</div>
        <div className="dd3-muted">Rate today’s meal from 1 to 5.</div>

        {err ? <div className="dd3-alert">{err}</div> : null}
        {msg ? <div className="dd3-success">{msg}</div> : null}

        <div className="dd3-form">
          <label className="dd3-label">
            Meal
            <select className="dd3-input" value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </label>
          <label className="dd3-label">
            Stars
            <input
              className="dd3-input"
              type="range"
              min="1"
              max="5"
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
            />
            <div className="dd3-row dd3-rowBetween">
              <div className="dd3-pill">{stars}★</div>
              <div className="dd3-pill dd3-pillAccent">{slang}</div>
            </div>
          </label>
          <label className="dd3-label">
            Comment (optional)
            <textarea
              className="dd3-input"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what felt good/bad..."
            />
          </label>
          <button className="dd3-btn dd3-btnPrimary" onClick={submit}>
            Submit Rating
          </button>
        </div>
      </div>

      <div className="dd3-card">
        <div className="dd3-cardTitle">Slangs Mapping</div>
        <div className="dd3-list">
          {Object.entries(slangByStars)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([k, v]) => (
              <div key={k} className="dd3-listItem">
                <span className="dd3-pill">{k}★</span> <span className="dd3-muted">{v}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

