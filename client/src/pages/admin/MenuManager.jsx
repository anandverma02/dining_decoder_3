import { useEffect, useState } from "react";
import dayjs from "dayjs";
import api from "../../lib/api";

function emptyItem() {
  return { name: "", calories: 0, imageUrl: "" };
}

export default function MenuManager() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [mealType, setMealType] = useState("breakfast");
  const [items, setItems] = useState([emptyItem()]);
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    setErr("");
    setMsg("");
    const res = await api.get(`/api/menu/${date}`);
    const found = (res.data.menus || []).find((m) => m.mealType === mealType);
    setItems(found?.items?.length ? found.items : [emptyItem()]);
    setNotes(found?.notes || "");
  }

  useEffect(() => {
    load().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, mealType]);

  function updateItem(i, patch) {
    setItems((prev) => prev.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  }

  function addItem() {
    setItems((p) => [...p, emptyItem()]);
  }

  function removeItem(i) {
    setItems((p) => p.filter((_, idx) => idx !== i));
  }

  async function save() {
    setErr("");
    setMsg("");
    try {
      const cleaned = items
        .map((x) => ({
          name: String(x.name || "").trim(),
          calories: Number(x.calories) || 0,
          imageUrl: String(x.imageUrl || "").trim() || undefined,
        }))
        .filter((x) => x.name);

      await api.put(`/api/menu/${date}/${mealType}`, { items: cleaned, notes });
      setMsg("Menu saved.");
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Save failed");
    }
  }

  return (
    <div>
      <div className="dd3-pageTitle">Menu Manager</div>
      <div className="dd3-row dd3-rowBetween dd3-wrap">
        <div className="dd3-row dd3-wrap">
          <input className="dd3-input dd3-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <select className="dd3-input" value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <button className="dd3-btn dd3-btnPrimary" onClick={save}>
          Save Menu
        </button>
      </div>

      {err ? <div className="dd3-alert">{err}</div> : null}
      {msg ? <div className="dd3-success">{msg}</div> : null}

      <div className="dd3-card">
        <div className="dd3-cardTitle">Items</div>
        <div className="dd3-muted">Add food name, calories and an image URL.</div>
        <div className="dd3-stack" style={{ marginTop: 12 }}>
          {items.map((it, i) => (
            <div key={i} className="dd3-row dd3-wrap dd3-itemRow">
              <input
                className="dd3-input"
                placeholder="Food name"
                value={it.name}
                onChange={(e) => updateItem(i, { name: e.target.value })}
              />
              <input
                className="dd3-input dd3-num"
                type="number"
                placeholder="Calories"
                value={it.calories}
                onChange={(e) => updateItem(i, { calories: e.target.value })}
              />
              <input
                className="dd3-input"
                placeholder="Image URL (optional)"
                value={it.imageUrl || ""}
                onChange={(e) => updateItem(i, { imageUrl: e.target.value })}
              />
              <button className="dd3-btn dd3-btnGhost" onClick={() => removeItem(i)}>
                Remove
              </button>
            </div>
          ))}
          <button className="dd3-btn dd3-btnGhost" onClick={addItem}>
            + Add Item
          </button>
        </div>

        <div className="dd3-form" style={{ marginTop: 16 }}>
          <label className="dd3-label">
            Notes (optional)
            <textarea className="dd3-input" rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
        </div>
      </div>
    </div>
  );
}

