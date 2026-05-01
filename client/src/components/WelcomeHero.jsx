export default function WelcomeHero({ kicker = "Welcome", headline, children }) {
  return (
    <header className="dd3-welcomeHero dd3-welcomeHeroPlain">
      <p className="dd3-welcomeKicker">{kicker}</p>
      <h1 className="dd3-welcomeTitle">{headline}</h1>
      {children}
    </header>
  );
}
