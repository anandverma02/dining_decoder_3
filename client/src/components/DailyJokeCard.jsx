import { useEffect, useState } from "react";

function cacheKey() {
  return `dd3_dadjoke_${new Date().toISOString().slice(0, 10)}`;
}

export default function DailyJokeCard() {
  const [joke, setJoke] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const key = cacheKey();
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        setJoke(cached);
        setStatus("ok");
        return;
      }
    } catch {
      /* ignore */
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("joke fetch failed");
        const data = await res.json();
        const line = data.joke || "";
        if (cancelled) return;
        setJoke(line);
        setStatus("ok");
        try {
          sessionStorage.setItem(key, line);
        } catch {
          /* ignore */
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="dd3-card dd3-jokeCard" aria-labelledby="daily-joke-heading">
      <h2 id="daily-joke-heading" className="dd3-jokeCardTitle">
        Today’s joke
      </h2>
      <p className="dd3-jokeCardHint">A new one each day (cached on this browser).</p>
      {status === "loading" ? <p className="dd3-jokeBody dd3-muted">Loading…</p> : null}
      {status === "error" ? (
        <p className="dd3-jokeBody dd3-muted">
          Could not reach the joke service. Check your connection and try again later.
        </p>
      ) : null}
      {status === "ok" && joke ? <p className="dd3-jokeBody">{joke}</p> : null}
      <p className="dd3-jokeCredit">
        Source:{" "}
        <a href="https://icanhazdadjoke.com/" target="_blank" rel="noopener noreferrer" className="dd3-inlineLink">
          icanhazdadjoke.com
        </a>
      </p>
    </section>
  );
}
