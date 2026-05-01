import { useEffect, useState } from "react";
import { FOOD_QUOTES_FALLBACK, dayOfYear } from "../lib/foodQuotesFallback";

const FOODISH = /\b(food|eat|meal|cook|kitchen|bread|hunger|dinner|lunch|breakfast|taste|recipe|chef|dining|feast|plate|stomach)\b/i;

export default function DailyFoodQuote() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    let cancelled = false;
    const applyFallback = () => {
      const i = dayOfYear() % FOOD_QUOTES_FALLBACK.length;
      const { q, a } = FOOD_QUOTES_FALLBACK[i];
      setText(q);
      setAuthor(a);
      setSource("Curated archive");
    };

    (async () => {
      const queries = ["food", "eat", "cooking", "meal", "kitchen", "bread"];
      const q = queries[dayOfYear() % queries.length];
      try {
        const res = await fetch(
          `https://api.quotable.io/search/quotes?query=${encodeURIComponent(q)}&limit=30&fields=content,author`
        );
        if (!res.ok) throw new Error("bad status");
        const data = await res.json();
        const results = Array.isArray(data.results) ? data.results : [];
        const pool = results.filter((r) => r.content && FOODISH.test(r.content));
        const usePool = pool.length ? pool : results.filter((r) => r.content);
        if (cancelled) return;
        if (usePool.length) {
          const pick = usePool[dayOfYear() % usePool.length];
          setText(pick.content);
          setAuthor(pick.author || "Unknown");
          setSource("Quotable.io");
          return;
        }
      } catch {
        /* use fallback */
      }
      if (!cancelled) applyFallback();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="dd3-foodQuote">
      <p className="dd3-foodQuoteKicker">Today’s food for thought</p>
      {!text ? (
        <p className="dd3-foodQuoteLoading">Loading a quote…</p>
      ) : (
        <>
          <blockquote className="dd3-foodQuoteText">&ldquo;{text}&rdquo;</blockquote>
          <cite className="dd3-foodQuoteAuthor">— {author}</cite>
          <p className="dd3-foodQuoteSrc">{source}</p>
        </>
      )}
    </div>
  );
}
