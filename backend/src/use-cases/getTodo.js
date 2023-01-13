const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

function getTodo({ todoId }) {
  return TodosDAO.findById(todoId).then((foundTodo) => {
    if (!foundTodo) {
      throw new Error(`Todo with id ${todoId} not found`);
    }
    const todo = makeTodo(foundTodo);
    return todo;
  });
}

module.exports = {
  getTodo,
};
