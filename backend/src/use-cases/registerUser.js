const { UsersDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { createHash } = require("../utils/createHash");

async function registerUser({ name, email, password }) {
  const foundUser = await UsersDAO.findByEmail(email);
  if (foundUser) {
    throw new Error("User with this email already registered");
  }

  // create the user with hashed password
  const passwordHash = createHash(password);
  const newUser = makeUser({ name, email, passwordHash });

  const insertedUser = await UsersDAO.insertOne(newUser);
  console.log(insertedUser);

  // password hash nicht herzeigen -> 'verstecken'
  const registerdUser = makeUser(insertedUser);
  return {
    _id: registerdUser._id,
    name: registerdUser.name,
    email: registerdUser.email,
    registeredAt: registerdUser.registeredAt,
  };
}

module.exports = {
  registerUser,
};
