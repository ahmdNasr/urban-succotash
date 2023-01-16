const { UsersDAO } = require("../db-access");
const { decodeBase64 } = require("../utils/base64");
const { createHash } = require("../utils/createHash");

function doBasicAuth(req, res, next) {
  const AuthHeader = req.headers.authorization; // "Basic <credentials>";
  if (!AuthHeader) {
    return res.status(401).json({ err: "Auth required" });
  }

  const [authScheme, credentialsBase64] = AuthHeader.split(" ");
  if (!authScheme || !credentialsBase64 || authScheme !== "Basic") {
    return res.status(401).json({ err: "Unsupported auth scheme" });
  }

  const credentials = decodeBase64(credentialsBase64); // "email:password"
  const [email, password] = credentials.split(":");

  if (!email || !password) {
    return res.status(401).json({ err: "Invalid credentials" });
  }

  UsersDAO.findByEmail(email).then((foundUser) => {
    if (!foundUser) {
      return res.status(401).json({ err: "User with this email not found" });
    }

    const passwordHash = createHash(password);
    const isValidPassword = foundUser.passwordHash === passwordHash;
    if (!isValidPassword) {
      return res.status(401).json({ err: "Password incorrect" });
    }
    // VALID USER + PASSWORD combo
    req.authenticatedUserId = foundUser._id.toString();
    next();
  });
}

module.exports = {
  doBasicAuth,
};
