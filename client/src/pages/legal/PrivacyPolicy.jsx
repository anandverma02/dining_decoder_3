export default function PrivacyPolicy() {
  return (
    <div className="dd3-card">
      <div className="dd3-pageTitle">Privacy Policy</div>
      <div className="dd3-cardText">
        Dining Decoder 3.0 collects only required information for mess operations: login details,
        meal actions, attendance, ratings, and payment records.
      </div>
      <div className="dd3-list">
        <div className="dd3-listItem">Anonymous vault feedback does not expose student identity to admin.</div>
        <div className="dd3-listItem">Attendance QR tokens are short-lived and only valid for meal windows.</div>
        <div className="dd3-listItem">Payment data is handled by configured provider (Stripe/mock).</div>
        <div className="dd3-listItem">For support: anandverma02@gmail.com | 6204994208</div>
      </div>
    </div>
  );
}

