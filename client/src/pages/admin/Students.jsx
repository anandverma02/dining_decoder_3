import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", rollNo: "", phone: "" });
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await api.get("/api/admin/students");
    setStudents(res.data.students || []);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function create() {
    setErr("");
    setMsg("");
    try {
      await api.post("/api/admin/students", form);
      setMsg("Student created.");
      setForm({ name: "", email: "", password: "", rollNo: "", phone: "" });
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed");
    }
  }

  return (
    <div className="dd3-grid2">
      <div className="dd3-card">
        <div className="dd3-cardTitle">Create Student</div>
        {err ? <div className="dd3-alert">{err}</div> : null}
        {msg ? <div className="dd3-success">{msg}</div> : null}
        <div className="dd3-form">
          <label className="dd3-label">
            Name
            <input className="dd3-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="dd3-label">
            Email
            <input className="dd3-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="dd3-label">
            Password
            <input type="password" className="dd3-input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          <label className="dd3-label">
            Roll No (optional)
            <input className="dd3-input" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} />
          </label>
          <label className="dd3-label">
            Phone (optional)
            <input className="dd3-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <button className="dd3-btn dd3-btnPrimary" onClick={create}>
            Create Student
          </button>
        </div>
      </div>

      <div className="dd3-card">
        <div className="dd3-cardTitle">Students</div>
        <div className="dd3-list">
          {students.map((s) => (
            <div key={s._id} className="dd3-listItem">
              <div className="dd3-row dd3-rowBetween">
                <div>
                  <div className="dd3-pill dd3-pillAccent">{s.name}</div>
                  <div className="dd3-muted">{s.email}</div>
                </div>
                <div className="dd3-pill">{s.isActive ? "active" : "disabled"}</div>
              </div>
            </div>
          ))}
          {!students.length ? <div className="dd3-muted">No students yet.</div> : null}
        </div>
      </div>
    </div>
  );
}

