const bcrypt = require("bcrypt");
const { generateToken } = require("../utils");
const { findUserByEmail, createUser } = require("../models/auth.model");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "email and password required" });
  const existing = await findUserByEmail(email);
  if (existing)
    return res.status(400).json({ error: "email already registered" });
  const user = await createUser({ email, password, name });
  res.json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ error: "invalid credentials" });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: "invalid credentials" });
  res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token: generateToken(user),
  });
};

module.exports = { signUp, login };
