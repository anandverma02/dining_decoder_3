const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");
const paymentRoutes = require("./routes/payment");

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
  app.use(
    cors({
      origin,
      credentials: true,
    })
  );

  app.get("/api/health", (req, res) => {
    res.json({ ok: true, name: "Dining Decoder 3.0 API" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/menu", menuRoutes);
  app.use("/api/student", studentRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/payment", paymentRoutes);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message || "Server error" });
  });

  return app;
}

module.exports = { createApp };
