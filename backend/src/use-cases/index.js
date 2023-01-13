const { addTodo } = require("./addTodo");
const { changeTodoStatus } = require("./changeTodoStatus");
const { getAllTodos } = require("./getAllTodos");
const { getTodo } = require("./getTodo");
const { removeTodo } = require("./removeTodo");

const TodoService = {
  getAllTodos,
  getTodo,
  addTodo,
  changeTodoStatus,
  removeTodo,
};

//   const UserService = {
//     registerUser,
//     loginUser,
//     ...
//   };

module.exports = {
  TodoService,
};
