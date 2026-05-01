const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    method: { type: String, enum: ["qr", "manual"], default: "qr" },
  },
  { timestamps: true }
);

AttendanceSchema.index({ student: 1, date: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
