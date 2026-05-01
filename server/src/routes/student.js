const crypto = require("crypto");
const express = require("express");
const dayjs = require("dayjs");
const { z } = require("zod");

const { requireAuth, requireRole } = require("../middleware/auth");
const MealSkip = require("../models/MealSkip");
const MealRating = require("../models/MealRating");
const Attendance = require("../models/Attendance");
const AnonymousFeedback = require("../models/AnonymousFeedback");
const { slangForStars } = require("../utils/ratingSlang");
const { analyze } = require("../utils/sentiment");
const { verifyToken } = require("../utils/jwt");

const router = express.Router();

router.use(requireAuth(), requireRole("student"));

router.get("/my", async (req, res) => {
  res.json({ user: req.user });
});

router.post("/skip", async (req, res, next) => {
  try {
    const schema = z.object({
      date: z.string().min(8).optional(),
      mealType: z.enum(["breakfast", "lunch", "dinner"]),
      reason: z.string().max(200).optional(),
    });
    const { date, mealType, reason } = schema.parse(req.body);
    const d = date || dayjs().format("YYYY-MM-DD");

    const doc = await MealSkip.findOneAndUpdate(
      { student: req.user._id, date: d, mealType },
      { $set: { student: req.user._id, date: d, mealType, reason: reason || "" } },
      { upsert: true, new: true }
    );
    res.json({ skipped: true, skip: doc });
  } catch (err) {
    next(err);
  }
});

router.delete("/skip", async (req, res, next) => {
  try {
    const schema = z.object({
      date: z.string().min(8).optional(),
      mealType: z.enum(["breakfast", "lunch", "dinner"]),
    });
    const { date, mealType } = schema.parse(req.body);
    const d = date || dayjs().format("YYYY-MM-DD");

    await MealSkip.deleteOne({ student: req.user._id, date: d, mealType });
    res.json({ skipped: false });
  } catch (err) {
    next(err);
  }
});

router.get("/skips", async (req, res, next) => {
  try {
    const date = String(req.query.date || dayjs().format("YYYY-MM-DD"));
    const skips = await MealSkip.find({ student: req.user._id, date });
    res.json({ date, skips });
  } catch (err) {
    next(err);
  }
});

router.post("/rate", async (req, res, next) => {
  try {
    const schema = z.object({
      date: z.string().min(8).optional(),
      mealType: z.enum(["breakfast", "lunch", "dinner"]),
      stars: z.number().int().min(1).max(5),
      comment: z.string().max(500).optional(),
    });
    const { date, mealType, stars, comment } = schema.parse(req.body);
    const d = date || dayjs().format("YYYY-MM-DD");

    const slang = slangForStars(stars);
    const sent = analyze(`${slang}. ${comment || ""}`);

    const doc = await MealRating.findOneAndUpdate(
      { student: req.user._id, date: d, mealType },
      {
        $set: {
          student: req.user._id,
          date: d,
          mealType,
          stars,
          slang,
          comment: comment || "",
          sentiment: sent,
        },
      },
      { upsert: true, new: true }
    );
    res.json({ rating: doc });
  } catch (err) {
    next(err);
  }
});

router.post("/feedback/anonymous", async (req, res, next) => {
  try {
    const schema = z.object({
      category: z.enum(["mess", "menu", "hygiene", "staff", "payment", "other"]).optional(),
      message: z.string().min(3).max(2000),
    });
    const { category, message } = schema.parse(req.body);

    const secret = process.env.JWT_SECRET;
    const today = dayjs().format("YYYY-MM-DD");
    const fingerprintHash = crypto
      .createHash("sha256")
      .update(`${req.user._id.toString()}|${today}|${secret}`)
      .digest("hex");

    const sent = analyze(message);
    const doc = await AnonymousFeedback.create({
      category: category || "other",
      message,
      sentiment: sent,
      fingerprintHash,
    });
    res.json({ ok: true, feedbackId: doc._id });
  } catch (err) {
    next(err);
  }
});

router.post("/attendance/scan", async (req, res, next) => {
  try {
    const schema = z.object({
      qrToken: z.string().min(10),
    });
    const { qrToken } = schema.parse(req.body);

    const payload = verifyToken(qrToken, process.env.JWT_SECRET);
    if (payload.typ !== "MEAL_QR") return res.status(400).json({ message: "Invalid QR" });
    const { date, mealType } = payload;
    if (!date || !mealType) return res.status(400).json({ message: "Invalid QR" });

    const doc = await Attendance.findOneAndUpdate(
      { student: req.user._id, date, mealType },
      { $set: { student: req.user._id, date, mealType, method: "qr" } },
      { upsert: true, new: true }
    );
    res.json({ ok: true, attendance: doc });
  } catch (err) {
    return res.status(400).json({ message: "QR expired/invalid" });
  }
});

module.exports = router;
