const db = require("../db");
const bcrypt = require("bcrypt");

const createUser = async ({ email, password, name }) => {
  const hash = await bcrypt.hash(password, 10);
  const [user] = await db("users")
    .insert({ email, password_hash: hash, name })
    .returning(["id", "email", "name"]);
  return user;
};

const findUserByEmail = async (email) => {
  return db("users").where({ email }).first();
};

module.exports = {
  createUser,
  findUserByEmail,
};
