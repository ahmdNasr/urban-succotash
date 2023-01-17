const { UsersDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { createHash } = require("../utils/createHash");
const { createToken } = require("../utils/createToken");

function loginUser({ email, password }) {
  return UsersDAO.findByEmail(email).then((foundUser) => {
    if (!foundUser) {
      throw new Error(`User with this email ${email} not found`);
    }

    const user = makeUser(foundUser);
    const passwordHash = createHash(password);
    const isValidLogin = user.passwordHash === passwordHash;
    if (!isValidLogin) {
      throw new Error("Failed to login");
    }

    const token = createToken(user);
    return { token };
  });
}

module.exports = {
  loginUser,
};
