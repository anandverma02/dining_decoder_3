import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import api from "../../lib/api";

function caloriesOf(items) {
  return (items || []).reduce((a, x) => a + (Number(x.calories) || 0), 0);
}

function MealCard({ date, menu, skipped, onSkipToggle }) {
  const totalCal = useMemo(() => caloriesOf(menu?.items), [menu]);
  return (
    <div className="dd3-card dd3-mealCard">
      <div className="dd3-mealHead">
        <div>
          <div className="dd3-cardTitle" style={{ marginBottom: 2 }}>
            {menu.mealType.toUpperCase()}
          </div>
          <div className="dd3-muted">{date} • Total Calories: {totalCal}</div>
        </div>
        <button
          className={skipped ? "dd3-btn dd3-btnDanger" : "dd3-btn dd3-btnPrimary"}
          onClick={() => onSkipToggle(menu.mealType, skipped)}
        >
          {skipped ? "Undo Skip" : "One-tap Skip"}
        </button>
      </div>

      <div className="dd3-menuGrid">
        {(menu.items || []).map((it, idx) => (
          <div key={idx} className="dd3-menuItem">
            <div
              className="dd3-menuImg"
              style={{
                backgroundImage: `url(${it.imageUrl || "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=60"})`,
              }}
            />
            <div className="dd3-menuInfo">
              <div className="dd3-menuName">{it.name}</div>
              <div className="dd3-muted">{Number(it.calories) || 0} kcal</div>
            </div>
          </div>
        ))}
        {!menu.items?.length ? <div className="dd3-muted">No items set for this meal yet.</div> : null}
      </div>
    </div>
  );
}

export default function MenuSkip() {
  const [date] = useState(() => dayjs().format("YYYY-MM-DD"));
  const [menus, setMenus] = useState([]);
  const [skips, setSkips] = useState([]);
  const [err, setErr] = useState("");

  const skippedSet = useMemo(() => new Set(skips.map((s) => `${s.date}:${s.mealType}`)), [skips]);

  async function load() {
    setErr("");
    const [m, s] = await Promise.all([
      api.get("/api/menu/today"),
      api.get("/api/student/skips", { params: { date } }),
    ]);
    setMenus(m.data.menus || []);
    setSkips(s.data.skips || []);
  }

  useEffect(() => {
    load().catch((e) => setErr(e?.response?.data?.message || e.message || "Failed to load"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSkipToggle(mealType, currentlySkipped) {
    try {
      if (currentlySkipped) {
        await api.delete("/api/student/skip", { data: { date, mealType } });
      } else {
        await api.post("/api/student/skip", { date, mealType });
      }
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Action failed");
    }
  }

  const byType = useMemo(() => {
    const map = new Map();
    for (const m of menus) map.set(m.mealType, m);
    return map;
  }, [menus]);

  const mealTypes = ["breakfast", "lunch", "dinner"];

  return (
    <div>
      <div className="dd3-pageTitle">Menu (Time-wise) + Meal Skip</div>
      <div className="dd3-pageHint">Breakfast 7–10 AM • Lunch 12–3 PM • Dinner 7–10 PM</div>
      {err ? <div className="dd3-alert">{err}</div> : null}

      <div className="dd3-stack">
        {mealTypes.map((mt) => (
          <MealCard
            key={mt}
            date={date}
            menu={byType.get(mt) || { mealType: mt, items: [] }}
            skipped={skippedSet.has(`${date}:${mt}`)}
            onSkipToggle={onSkipToggle}
          />
        ))}
      </div>
    </div>
  );
}

