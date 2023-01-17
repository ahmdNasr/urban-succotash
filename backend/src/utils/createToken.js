const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.log("JWT Secret env variable is a must for this app to run!");
  process.exit(1);
}

function createToken(user) {
  const initatedAt = Math.floor(Date.now() / 1000);
  const TEN_MINUTES = 10 * 60;
  const expiresAt = initatedAt + TEN_MINUTES;

  const tokenPayload = {
    sub: user._id.toString(),
    iat: initatedAt,
    exp: expiresAt,
    // payload ist frei erweiterbar
  };

  const jwtToken = jwt.sign(tokenPayload, jwtSecret);
  return jwtToken;
}

module.exports = {
  createToken,
};
