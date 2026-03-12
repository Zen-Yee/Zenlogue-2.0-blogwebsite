import db from "../config/pool.js";
import bcrypt from "bcrypt";

export const createUser = async (eMail, passWord) => {
  const hashed = await bcrypt.hash(passWord, 10);

  const result = await db.query(
    "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role",
    [eMail, hashed, "user"]
  );

  return result.rows[0];
};

export const loginUser = async (eMail, passWord) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid password");
  }

  return user;
};
