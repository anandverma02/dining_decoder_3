const mongoose = require("mongoose");

const MealRatingSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    slang: { type: String, trim: true },
    comment: { type: String, trim: true },
    sentiment: {
      score: { type: Number, default: 0 },
      comparative: { type: Number, default: 0 },
      label: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
    },
  },
  { timestamps: true }
);

MealRatingSchema.index({ student: 1, date: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model("MealRating", MealRatingSchema);
