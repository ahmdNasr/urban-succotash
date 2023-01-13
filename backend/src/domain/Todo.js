function makeTodo({ _id, text, status, image, createdAt }) {
  if (!text || typeof text !== "string" || text.length === 0) {
    throw new Error("Todo text must be set");
  }

  const allowedStatuses = ["open", "completed"];
  const isInvalidStatus = !allowedStatuses.includes(status);
  if (isInvalidStatus) {
    throw new Error("Todo status is invalid");
  }

  return {
    _id,
    text,
    status: status || "open",
    image,
    createdAt: createdAt || Date.now(),
  };
}

module.exports = {
  makeTodo,
};
