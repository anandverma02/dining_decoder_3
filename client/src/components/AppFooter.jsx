import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <footer className="dd3-footer">
      <div className="dd3-footerGrid">
        <div>
          <div className="dd3-footerTitle">Dining Decoder 3.0</div>
          <div className="dd3-footerText">
            Smart mess management & food waste reduction for GEC Gopalganj Boys Mess.
          </div>
          <div className="dd3-footerText">Open Hours: Breakfast 8–10, Lunch 1–3, Dinner 8–10</div>
        </div>
        <div>
          <div className="dd3-footerTitle">Contact Us</div>
          <div className="dd3-footerText">
            Email: <a href="mailto:anandverma02@gmail.com">anandverma02@gmail.com</a>
          </div>
          <div className="dd3-footerText">Phone: 6204994208</div>
          <div className="dd3-footerText">Address: GEC Gopalganj Boys Hostel Mess</div>
        </div>
        <div>
          <div className="dd3-footerTitle">Quick Links</div>
          <Link className="dd3-footerText dd3-footerLink" to="/legal/privacy">
            Privacy Policy
          </Link>
          <Link className="dd3-footerText dd3-footerLink" to="/legal/terms">
            Terms & Conditions
          </Link>
          <Link className="dd3-footerText dd3-footerLink" to="/help/faq">
            Help Center
          </Link>
          <Link className="dd3-footerText dd3-footerLink" to="/help/faq">
            FAQ
          </Link>
          <Link className="dd3-footerText dd3-footerLink" to="/about">
            About us
          </Link>
        </div>
        <div>
          <div className="dd3-footerTitle">Stay Updated</div>
          <div className="dd3-footerText">Get new menu and payment updates.</div>
          <div className="dd3-footerNewsletter">
            <input className="dd3-input" placeholder="Enter your email" />
            <button className="dd3-btn dd3-btnPrimary">Subscribe</button>
          </div>
          <div className="dd3-footerText">Follow: Facebook • Instagram • YouTube</div>
        </div>
      </div>

      <div className="dd3-footerBottom">
        Design and developed by Anand Verma, Krishna Kumar Thakur, Harsh Kumar, and Pratyush Kumar.
      </div>
    </footer>
  );
}

