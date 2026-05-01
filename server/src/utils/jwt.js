const jwt = require("jsonwebtoken");

function signToken(payload, secret, opts = {}) {
  return jwt.sign(payload, secret, { expiresIn: "7d", ...opts });
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
