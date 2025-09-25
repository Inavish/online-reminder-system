const jwt = require("jsonwebtoken");
const { JWT_EXPIRY_TIME } = require("./constants");

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRY_TIME,
  });
}

module.exports = { generateToken };
