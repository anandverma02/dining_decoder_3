const mongoose = require("mongoose");

const AnonymousFeedbackSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["mess", "menu", "hygiene", "staff", "payment", "other"],
      default: "other",
    },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    sentiment: {
      score: { type: Number, default: 0 },
      comparative: { type: Number, default: 0 },
      label: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
    },
    fingerprintHash: { type: String, index: true }, // not reversible; helps rate-limiting
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnonymousFeedback", AnonymousFeedbackSchema);
