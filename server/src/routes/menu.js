const express = require("express");
const dayjs = require("dayjs");
const { z } = require("zod");

const Menu = require("../models/Menu");
const { requireAuth, requireRole } = require("../middleware/auth");
const { getMealWindows } = require("../utils/mealWindow");

const router = express.Router();

router.get("/windows", (req, res) => {
  res.json({ windows: getMealWindows() });
});

router.get("/today", async (req, res, next) => {
  try {
    const date = dayjs().format("YYYY-MM-DD");
    const menus = await Menu.find({ date }).sort({ mealType: 1 });
    res.json({ date, menus });
  } catch (err) {
    next(err);
  }
});

router.get("/:date", async (req, res, next) => {
  try {
    const date = String(req.params.date);
    const menus = await Menu.find({ date }).sort({ mealType: 1 });
    res.json({ date, menus });
  } catch (err) {
    next(err);
  }
});

router.put("/:date/:mealType", requireAuth(), requireRole("admin"), async (req, res, next) => {
  try {
    const schema = z.object({
      items: z
        .array(
          z.object({
            name: z.string().min(1),
            calories: z.number().nonnegative().optional().default(0),
            imageUrl: z.string().url().optional(),
          })
        )
        .default([]),
      notes: z.string().optional(),
    });
    const { items, notes } = schema.parse(req.body);

    const { date, mealType } = req.params;
    if (!["breakfast", "lunch", "dinner"].includes(mealType)) {
      return res.status(400).json({ message: "Invalid mealType" });
    }

    const doc = await Menu.findOneAndUpdate(
      { date, mealType },
      { $set: { date, mealType, items, notes: notes || "" } },
      { upsert: true, new: true }
    );
    res.json({ menu: doc });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
