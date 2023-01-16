const crypto = require("crypto"); // built in wie fs, http, ...

function createHash(input) {
  return crypto.createHash("sha512").update(input, "utf-8").digest("hex");
}

module.exports = {
  createHash,
};
