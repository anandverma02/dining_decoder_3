const express = require("express");
const { z } = require("zod");

const User = require("../models/User");
const { verifyPassword, hashPassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const schema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      rollNo: z.string().min(1).optional(),
      phone: z.string().min(6).optional(),
    });
    const { name, email, password, rollNo, phone } = schema.parse(req.body);

    const passwordHash = await hashPassword(password);
    const student = await User.create({
      role: "student",
      name,
      email: email.toLowerCase(),
      passwordHash,
      rollNo: rollNo || "",
      phone: phone || "",
      isActive: true,
    });

    const token = signToken({ sub: student._id.toString(), role: student.role }, process.env.JWT_SECRET);
    res.status(201).json({
      token,
      user: { id: student._id, role: student.role, name: student.name, email: student.email },
    });
  } catch (err) {
    if (String(err && err.code) === "11000") {
      return res.status(409).json({ message: "Email already registered" });
    }
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });
    const { email, password } = schema.parse(req.body);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    if (!user.isActive) return res.status(403).json({ message: "Account disabled" });

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET);
    res.json({
      token,
      user: { id: user._id, role: user.role, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", requireAuth(), async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
