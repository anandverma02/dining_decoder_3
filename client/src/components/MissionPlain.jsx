export default function MissionPlain() {
  return (
    <div className="dd3-missionPlain">
      <h2 className="dd3-missionH">Why we built it</h2>
      <p>
        Hostel kitchens lose food and time when no one knows who is eating and when. Dining Decoder 3.0
        brings menus, meal skips, QR attendance, and feedback together so portions match real demand,
        queues stay shorter, and residents can reach the mess committee without losing messages in endless
        group chats.
      </p>
      <h2 className="dd3-missionH">What it took to build it</h2>
      <p>
        Months of talking with the mess committee and residents, then wiring a secure stack end to end: a
        MongoDB database, a Node and Express API with role-based access, JWT sign-in, this React portal, QR
        tokens for meals, payment hooks, and simple sentiment on feedback so patterns show up without
        exposing names. Each piece was tested against real breakfast, lunch, and dinner windows—not slide
        decks—until the flow felt obvious on a phone in line at the counter.
      </p>
    </div>
  );
}
