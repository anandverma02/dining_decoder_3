/** Curated food-related quotes when the live API is unavailable. */
export const FOOD_QUOTES_FALLBACK = [
  { q: "One cannot think well, love well, sleep well, if one has not dined well.", a: "Virginia Woolf" },
  { q: "People who love to eat are always the best people.", a: "Julia Child" },
  { q: "Cooking is like love. It should be entered into with abandon or not at all.", a: "Harriet Van Horne" },
  { q: "Laughter is brightest where food is best.", a: "Irish proverb" },
  { q: "Food is our common ground, a universal experience.", a: "James Beard" },
  { q: "The only time to eat diet food is while you’re waiting for the steak to cook.", a: "Julia Child" },
  { q: "There is no sincerer love than the love of food.", a: "George Bernard Shaw" },
  { q: "First we eat, then we do everything else.", a: "M.F.K. Fisher" },
  { q: "Good food is the foundation of genuine happiness.", a: "Auguste Escoffier" },
  { q: "Life is uncertain. Eat dessert first.", a: "Ernestine Ulmer" },
  { q: "A recipe has no soul. You, as the cook, must bring soul to the recipe.", a: "Thomas Keller" },
  { q: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.", a: "J.R.R. Tolkien" },
  { q: "Cooking is at once child’s play and adult joy. And cooking done with care is an act of love.", a: "Craig Claiborne" },
  { q: "You don’t need a silver fork to eat good food.", a: "Paul Prudhomme" },
  { q: "Food brings people together on many different levels. It’s nourishment of the soul and body.", a: "Giada De Laurentiis" },
  { q: "The discovery of a new dish does more for the happiness of mankind than the discovery of a star.", a: "Jean Anthelme Brillat-Savarin" },
  { q: "Anything is good if it’s made of chocolate.", a: "Jo Brand" },
  { q: "He was a bold man that first ate an oyster.", a: "Jonathan Swift" },
  { q: "After a good dinner one can forgive anybody, even one’s own relations.", a: "Oscar Wilde" },
  { q: "Cooking is all about people. Food is maybe the only universal thing that really has the power to bring everyone together.", a: "Guy Fieri" },
  { q: "Food is symbolic of love when words are inadequate.", a: "Alan D. Wolfelt" },
  { q: "A balanced diet is a cookie in each hand.", a: "Barbara Johnson" },
];

export function dayOfYear(d = new Date()) {
  const start = Date.UTC(d.getFullYear(), 0, 0);
  const now = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor((now - start) / 86400000);
}
