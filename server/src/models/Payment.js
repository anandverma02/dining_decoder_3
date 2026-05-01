const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "inr" },
    status: { type: String, enum: ["created", "paid", "failed", "cancelled"], default: "created" },
    provider: { type: String, enum: ["stripe", "mock"], default: "mock" },
    providerRef: { type: String, trim: true },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
