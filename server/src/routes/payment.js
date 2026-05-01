const express = require("express");
const { z } = require("zod");
const Stripe = require("stripe");

const { requireAuth, requireRole } = require("../middleware/auth");
const Payment = require("../models/Payment");

const router = express.Router();

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

router.post("/create", requireAuth(), requireRole("student"), async (req, res, next) => {
  try {
    const schema = z.object({
      amount: z.number().positive(),
      currency: z.string().optional(),
      note: z.string().max(200).optional(),
    });
    const { amount, currency, note } = schema.parse(req.body);

    const stripe = getStripe();
    if (!stripe) {
      const payment = await Payment.create({
        student: req.user._id,
        amount,
        currency: (currency || "inr").toLowerCase(),
        status: "created",
        provider: "mock",
        note: note || "",
      });
      return res.json({ provider: "mock", paymentId: payment._id, message: "Mock payment created" });
    }

    const payment = await Payment.create({
      student: req.user._id,
      amount,
      currency: (currency || "inr").toLowerCase(),
      status: "created",
      provider: "stripe",
      note: note || "",
    });

    const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/student/payment/success?paymentId=${payment._id}`,
      cancel_url: `${origin}/student/payment/cancel?paymentId=${payment._id}`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: (currency || "inr").toLowerCase(),
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: "Mess Fee Payment (Dining Decoder 3.0)",
            },
          },
        },
      ],
      metadata: { paymentId: payment._id.toString(), studentId: req.user._id.toString() },
    });

    payment.providerRef = session.id;
    await payment.save();

    res.json({ provider: "stripe", paymentId: payment._id, checkoutUrl: session.url });
  } catch (err) {
    next(err);
  }
});

router.post("/mock/confirm", requireAuth(), requireRole("student"), async (req, res, next) => {
  try {
    const schema = z.object({ paymentId: z.string().min(10) });
    const { paymentId } = schema.parse(req.body);
    const payment = await Payment.findOne({ _id: paymentId, student: req.user._id });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    payment.status = "paid";
    await payment.save();
    res.json({ ok: true, payment });
  } catch (err) {
    next(err);
  }
});

router.get("/mine", requireAuth(), requireRole("student"), async (req, res, next) => {
  try {
    const payments = await Payment.find({ student: req.user._id }).sort({ createdAt: -1 }).limit(50);
    res.json({ payments });
  } catch (err) {
    next(err);
  }
});

router.get("/all", requireAuth(), requireRole("admin"), async (req, res, next) => {
  try {
    const payments = await Payment.find({})
      .populate("student", "name email rollNo")
      .sort({ createdAt: -1 })
      .limit(200);
    res.json({ payments });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
