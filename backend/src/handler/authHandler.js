const db = require("../db");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "email and password required" });
  const existing = await db("users").where({ email }).first();
  if (existing)
    return res.status(400).json({ error: "email already registered" });
  const hash = await bcrypt.hash(password, 10);
  const [user] = await db("users")
    .insert({ email, password_hash: hash, name })
    .returning(["id", "email", "name"]);
  res.json({ user });
};

module.exports = { signUp };
