const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.log("JWT Secret env variable is a must for this app to run!");
  process.exit(1);
}

function doAuth(req, res, next) {
  const _authFailed = () =>
    res.status(401).json({ err: "Invalid auth, please login first" });

  const AuthHeader = req.headers.authorization; // "Bearer <token>";
  if (!AuthHeader) {
    return _authFailed();
  }

  console.log(AuthHeader);

  const [authSchema, token] = AuthHeader.split(" ");
  if (authSchema !== "Bearer" || !token) {
    return _authFailed();
  }

  try {
    console.log(token);
    const tokenPayload = jwt.verify(token, jwtSecret);
    req.userClaims = tokenPayload; // req.userClaims.sub ist dann die userId vom authorisierten user
    next();
  } catch (error) {
    console.log(error);
    return _authFailed();
  }
}

module.exports = {
  doAuth,
};
