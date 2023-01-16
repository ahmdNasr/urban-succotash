const { addTodo } = require("./addTodo");
const { changeTodoStatus } = require("./changeTodoStatus");
const { getAllTodos } = require("./getAllTodos");
const { getTodo } = require("./getTodo");
const { registerUser } = require("./registerUser");
const { removeTodo } = require("./removeTodo");

const TodoService = {
  getAllTodos,
  getTodo,
  addTodo,
  changeTodoStatus,
  removeTodo,
};

const UserService = {
  registerUser,
};

//   const UserService = {
//     registerUser,
//     loginUser,
//     ...
//   };

module.exports = {
  TodoService,
  UserService,
};
