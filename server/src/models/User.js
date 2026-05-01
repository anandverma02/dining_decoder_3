const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["admin", "student"], required: true },
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    phone: { type: String, trim: true },
    rollNo: { type: String, trim: true, index: true },
    passwordHash: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// UserSchema.index({ email: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("User", UserSchema);
