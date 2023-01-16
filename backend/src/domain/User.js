function makeUser({ _id, name, email, passwordHash, registeredAt }) {
  if (isInvalidOrEmptyString(name)) {
    throw new Error("User must have a name");
  }

  if (isInvalidOrEmptyString(email)) {
    throw new Error("User must have a valid email");
  }

  return {
    _id,
    name,
    email,
    passwordHash,
    registeredAt: registeredAt || Date.now(),
  };
}

function isInvalidOrEmptyString(str) {
  return !str || typeof str !== "string" || str.length === 0;
}

module.exports = {
  makeUser,
};
