import subodhPhoto from '../assets/subodh_sir.jpg';
import anandPhoto from '../assets/anand.jpg';
import krishnaPhoto from '../assets/krishna.jpg';
import harshPhoto from '../assets/harsh.jpg';
import pratyushPhoto from '../assets/pratyush.jpg';

const TEAM = [
  {
    role: "Instructor & mentor",
    name: "Mr. Subodh Kumar",
    photo:
      subodhPhoto,
    quote:
      "Dining Decoder started as a simple question in class: what if the mess knew how many plates it really needed? I pushed the team to stay grounded in the hostel’s real timetable—breakfast rush, late arrivals, committee meetings—not in buzzwords. Week after week they brought working pieces: QR tokens, skip counts, honest feedback. I guided scope, challenged assumptions, and reminded them that software here is a service to cooks and residents first. I am proud of how Anand, Krishna, Harsh, and Pratyush argued respectfully, split ownership, and still shipped something the mess can actually run.",
    contribution: null,
  },
  {
    role: "Student — lead developer",
    name: "Anand Verma",
    photo:
      anandPhoto,
    quote:
      "I wanted residents to feel the mess was listening, not guessing. Building this meant living in both worlds: the dining hall line and the database schema. Our instructor kept asking ‘who benefits tomorrow?’—that kept us honest.",
    contribution:
      "Owned the Node/Express API, JWT auth, student registration, and payment flow; coordinated requirements with the mess committee and wired the client to production-ready endpoints.",
  },
  {
    role: "Student — frontend & QR",
    name: "Krishna Kumar Thakur",
    photo:
      krishnaPhoto,
    quote:
      "If a student cannot skip a meal in ten seconds on a cheap phone, we failed. I focused on clear screens, fast QR scan, and language that matches how we actually talk in the hostel.",
    contribution:
      "Built the React portal (landing, dashboards, student flows), QR attendance UX, and responsive layout; polished accessibility and error states for daily use.",
  },
  {
    role: "Student — data & analytics",
    name: "Harsh Kumar",
    photo:
      harshPhoto,
    quote:
      "Waste drops when predictions are boring and reliable. I cared about clean data models so skips, attendance, and ratings could feed the admin dashboard without surprises.",
    contribution:
      "Designed MongoDB schemas, admin stats and prediction views, and export-friendly summaries for the mess committee.",
  },
  {
    role: "Student — quality & feedback",
    name: "Pratyush Kaushik",
    photo:
      pratyushPhoto,
    quote:
      "Anonymous vault only works if students trust it. I tested edge cases, tightened privacy copy, and made sure sentiment labels help admins without exposing individuals.",
    contribution:
      "Led testing passes, anonymous feedback vault, sentiment presentation for admins, and handover docs so the next batch can maintain the system.",
  },
];

export default function AboutUs() {
  return (
    <div className="dd3-aboutPage">
      <div className="dd3-aboutPageHeader">
        <h1 className="dd3-aboutPageTitle">About us</h1>
        <p className="dd3-aboutPageLead">
          Dining Decoder 3.0 is a hostel mess project from GEC Gopalganj — built with faculty guidance and
          a student team that mixed rigor with empathy for everyone in the queue.
        </p>
      </div>

      <div className="dd3-teamGrid">
        {TEAM.map((person) => (
          <article key={person.name} className={`dd3-teamCard${person.contribution ? "" : " dd3-teamCardInstructor"}`}>
            <div className="dd3-teamCardTop">
              <img
                className="dd3-teamPhoto"
                src={person.photo}
                alt={`${person.name}`}
                width={400}
                height={400}
                loading="lazy"
              />
              <div className="dd3-teamMeta">
                <p className="dd3-teamRole">{person.role}</p>
                <h2 className="dd3-teamName">{person.name}</h2>
              </div>
            </div>
            <blockquote className="dd3-teamQuote">&ldquo;{person.quote}&rdquo;</blockquote>
            {person.contribution ? (
              <div className="dd3-teamContrib">
                <span className="dd3-teamContribLabel">Contribution</span>
                <p>{person.contribution}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
