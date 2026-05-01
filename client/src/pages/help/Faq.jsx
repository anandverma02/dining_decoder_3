export default function Faq() {
  return (
    <div className="dd3-card">
      <div className="dd3-pageTitle">FAQ</div>
      <div className="dd3-list">
        <div className="dd3-listItem">
          <b>How to mark attendance?</b>
          <div className="dd3-muted">Open QR Attendance page and scan the meal QR shown in mess.</div>
        </div>
        <div className="dd3-listItem">
          <b>Can I cancel skipped meal?</b>
          <div className="dd3-muted">Yes, use Undo Skip from Menu + Skip page.</div>
        </div>
        <div className="dd3-listItem">
          <b>Are anonymous feedbacks really anonymous?</b>
          <div className="dd3-muted">Yes, the admin view does not include student identity.</div>
        </div>
        <div className="dd3-listItem">
          <b>How does prediction work?</b>
          <div className="dd3-muted">It combines current skips with historical attendance trends.</div>
        </div>
      </div>
    </div>
  );
}

