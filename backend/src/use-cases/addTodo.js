const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

function addTodo({ text, image }) {
  const newTodo = makeTodo({ text, image }); // noch keine _id zb
  return TodosDAO.insertOne(newTodo).then((addedTodo) => {
    if (!addedTodo) {
      throw new Error("Could not add todo");
    }

    return makeTodo(addedTodo);
  });
}

module.exports = {
  addTodo,
};
