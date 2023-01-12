// re-render hat in wirklichkeit 2 Trigger
// 1. state update

import { Link } from "react-router-dom";

// 2. prop changes
const Todos = (props) => {
  const updateTodoStatus = (todoId, newStatus) => {
    fetch("http://localhost:45501/todos/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId, status: newStatus }),
    })
      .then((res) => res.json())
      .then((newTodosArray) => props.setTodos(newTodosArray));
  };
  const deleteTodo = (todoId) => {
    fetch("http://localhost:45501/todos/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId }),
    })
      .then((res) => res.json())
      .then((newTodosArray) => props.setTodos(newTodosArray));
  };
  return (
    <ul>
      {props.todos.map(
        (
          todo // todo-item-open & todo-item-completed
        ) => (
          <li key={todo._id} className={`todo-item todo-item-${todo.status}`}>
            <div
              className="todo-item-inner"
              onClick={() =>
                updateTodoStatus(
                  todo._id,
                  todo.status !== "open" ? "open" : "completed"
                )
              }
            >
              <p>{todo.text}</p>
            </div>
            <div className="delete-todo-x" onClick={() => deleteTodo(todo._id)}>
              ❌
            </div>
            <div className="todo-more-link">
              {todo._id === "added_todo_optimisitic_rerender" ? (
                <span>Details Loading...</span>
              ) : (
                <Link to={"" ? "#" : `/todo/${todo._id}`}>More...</Link>
              )}
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default Todos;
