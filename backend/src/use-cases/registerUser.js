const { UsersDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { createHash } = require("../utils/createHash");

function registerUser({ name, email, password }) {
  return UsersDAO.findByEmail(email)
    .then((foundUser) => {
      if (foundUser) {
        throw new Error("User with this email already registered");
      }
      // create the user with hashed password
      const passwordHash = createHash(password);
      return makeUser({ name, email, passwordHash });
    })
    .then((newUser) => UsersDAO.insertOne(newUser))
    .then((insertedUser) => {
      console.log(insertedUser);
      // password hash nicht verstecken
      const registerdUser = makeUser(insertedUser);
      return {
        _id: registerdUser._id,
        name: registerdUser.name,
        email: registerdUser.email,
        registeredAt: registerdUser.registeredAt,
      };
    });
}

module.exports = {
  registerUser,
};
