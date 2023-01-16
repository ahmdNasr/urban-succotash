function decodeBase64(base64String) {
  return Buffer.from(base64String, "base64").toString("utf-8");
}

module.exports = {
  decodeBase64,
};
