const SLANG_BY_STARS = {
  5: "mess me mela lga hai",
  4: "maja aa gail",
  3: "thik-thak ba",
  2: "kuchh kami ba",
  1: "bahar kha lo",
};

function slangForStars(stars) {
  return SLANG_BY_STARS[stars] || "thik-thak ba";
}

module.exports = { SLANG_BY_STARS, slangForStars };
