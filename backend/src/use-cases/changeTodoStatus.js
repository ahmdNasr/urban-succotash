const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

async function changeTodoStatus({ todoId, newStatus }) {
  // FIXME: make update return only one document + adjust in frontend
  // unser frontend ist beim update noch auf dem alten stand, dass alle todos (nach dem update) returned werden !s
  await TodosDAO.updateStatus(todoId, newStatus);
  const todos = await TodosDAO.findAll();
  return todos.map((todo) => makeTodo(todo));
}

module.exports = {
  changeTodoStatus,
};
