const User = require("../models/User");
const { hashPassword } = require("./password");

async function seedDefaultAdmin() {
  const existing = await User.findOne({ role: "admin" });
  if (existing) return { created: false, email: existing.email };

  const email = (process.env.DEFAULT_ADMIN_EMAIL || "anandverma02@gmail.com").toLowerCase();
  const password = process.env.DEFAULT_ADMIN_PASSWORD || "@Anand103";
  const passwordHash = await hashPassword(password);

  const admin = await User.create({
    role: "admin",
    name: "Admin",
    email,
    passwordHash,
    isActive: true,
  });

  return { created: true, email: admin.email };
}

module.exports = { seedDefaultAdmin };
