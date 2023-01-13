const fs = require("fs");

function deleteFile(path) {
  return new Promise((resolve, reject) => {
    fs.rm(path, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function deleteTodoImage(todoImage) {
  const path = __dirname + "/app-data/todo-images/" + todoImage;
  return deleteFile(path);
}

module.exports = {
  deleteTodoImage,
};
