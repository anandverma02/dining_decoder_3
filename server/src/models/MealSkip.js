const mongoose = require("mongoose");

const MealSkipSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    reason: { type: String, trim: true },
  },
  { timestamps: true }
);

MealSkipSchema.index({ student: 1, date: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model("MealSkip", MealSkipSchema);
