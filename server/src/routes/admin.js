const express = require("express");
const dayjs = require("dayjs");
const QRCode = require("qrcode");
const { z } = require("zod");

const { requireAuth, requireRole } = require("../middleware/auth");
const User = require("../models/User");
const MealSkip = require("../models/MealSkip");
const MealRating = require("../models/MealRating");
const Attendance = require("../models/Attendance");
const AnonymousFeedback = require("../models/AnonymousFeedback");
const { hashPassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");

const router = express.Router();
router.use(requireAuth(), requireRole("admin"));

router.post("/students", async (req, res, next) => {
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
    res.status(201).json({ student: { id: student._id, name: student.name, email: student.email } });
  } catch (err) {
    if (String(err && err.code) === "11000") {
      return res.status(409).json({ message: "Email already exists" });
    }
    next(err);
  }
});

router.get("/students", async (req, res, next) => {
  try {
    const students = await User.find({ role: "student" })
      .select("name email rollNo phone isActive createdAt")
      .sort({ createdAt: -1 });
    res.json({ students });
  } catch (err) {
    next(err);
  }
});

router.get("/feedback/anonymous", async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const feedbacks = await AnonymousFeedback.find({})
      .select("category message sentiment createdAt")
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json({ feedbacks });
  } catch (err) {
    next(err);
  }
});

router.get("/qr/:date/:mealType", async (req, res, next) => {
  try {
    const { date, mealType } = req.params;
    if (!["breakfast", "lunch", "dinner"].includes(mealType)) {
      return res.status(400).json({ message: "Invalid mealType" });
    }

    const qrToken = signToken(
      { typ: "MEAL_QR", date, mealType },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    const qrDataUrl = await QRCode.toDataURL(qrToken, { margin: 2, width: 420 });
    res.json({ qrToken, qrDataUrl, date, mealType });
  } catch (err) {
    next(err);
  }
});

router.get("/stats/summary", async (req, res, next) => {
  try {
    const date = String(req.query.date || dayjs().format("YYYY-MM-DD"));
    const mealType = req.query.mealType ? String(req.query.mealType) : null;
    const mtFilter =
      mealType && ["breakfast", "lunch", "dinner"].includes(mealType) ? { mealType } : {};

    const [activeStudents, skips, attendance, ratings] = await Promise.all([
      User.countDocuments({ role: "student", isActive: true }),
      MealSkip.countDocuments({ date, ...mtFilter }),
      Attendance.countDocuments({ date, ...mtFilter }),
      MealRating.find({ date, ...mtFilter }).select("stars sentiment"),
    ]);

    const ratingCount = ratings.length;
    const avgStars = ratingCount ? ratings.reduce((a, r) => a + r.stars, 0) / ratingCount : 0;
    const sentimentDist = ratings.reduce(
      (acc, r) => {
        acc[r.sentiment?.label || "neutral"] += 1;
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 }
    );

    res.json({
      date,
      scope: mealType ? { mealType } : { mealType: "all" },
      activeStudents,
      skips,
      attendance,
      ratings: { count: ratingCount, avgStars: Number(avgStars.toFixed(2)), sentimentDist },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/prediction", async (req, res, next) => {
  try {
    const date = String(req.query.date || dayjs().format("YYYY-MM-DD"));
    const activeStudents = await User.countDocuments({ role: "student", isActive: true });
    const mealTypes = ["breakfast", "lunch", "dinner"];

    async function predictFor(mealType) {
      const skipCount = await MealSkip.countDocuments({ date, mealType });
      const eligible = Math.max(activeStudents - skipCount, 0);

      // Historical show-up rate: last 7 same-meal days
      const lastDates = Array.from({ length: 7 }).map((_, i) =>
        dayjs(date).subtract(i + 1, "day").format("YYYY-MM-DD")
      );
      const [histAtt, histSkips] = await Promise.all([
        Attendance.aggregate([
          { $match: { date: { $in: lastDates }, mealType } },
          { $group: { _id: "$date", count: { $sum: 1 } } },
        ]),
        MealSkip.aggregate([
          { $match: { date: { $in: lastDates }, mealType } },
          { $group: { _id: "$date", count: { $sum: 1 } } },
        ]),
      ]);

      const attByDate = new Map(histAtt.map((x) => [x._id, x.count]));
      const skipByDate = new Map(histSkips.map((x) => [x._id, x.count]));

      const rates = lastDates
        .map((d) => {
          const att = attByDate.get(d) || 0;
          const sk = skipByDate.get(d) || 0;
          const elig = Math.max(activeStudents - sk, 0);
          if (!elig) return null;
          return att / elig;
        })
        .filter((x) => typeof x === "number");

      const avgRate = rates.length ? rates.reduce((a, b) => a + b, 0) / rates.length : 0.85;
      const predicted = Math.round(eligible * avgRate);
      return { mealType, activeStudents, skipCount, eligible, avgRate: Number(avgRate.toFixed(2)), predicted };
    }

    const predictions = [];
    for (const mt of mealTypes) {
      // eslint-disable-next-line no-await-in-loop
      predictions.push(await predictFor(mt));
    }

    res.json({ date, predictions });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
