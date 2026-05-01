const Sentiment = require("sentiment");

const sentiment = new Sentiment();

function labelFromScore(score) {
  if (score >= 2) return "positive";
  if (score <= -2) return "negative";
  return "neutral";
}

function analyze(text) {
  const r = sentiment.analyze(String(text || ""));
  return {
    score: r.score || 0,
    comparative: r.comparative || 0,
    label: labelFromScore(r.score || 0),
  };
}

module.exports = { analyze };
