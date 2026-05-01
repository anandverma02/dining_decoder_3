const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Bearer") return null;
  return token || null;
}

function requireAuth() {
  return async (req, res, next) => {
    try {
      const token = getBearerToken(req);
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const payload = verifyToken(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.sub).select("-passwordHash");
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      if (!user.isActive) return res.status(403).json({ message: "Account disabled" });

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { requireAuth, requireRole };
