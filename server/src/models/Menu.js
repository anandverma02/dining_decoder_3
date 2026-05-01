const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    calories: { type: Number, default: 0, min: 0 },
    imageUrl: { type: String, trim: true },
  },
  { _id: false }
);

const MenuSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    items: { type: [MenuItemSchema], default: [] },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

MenuSchema.index({ date: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model("Menu", MenuSchema);
