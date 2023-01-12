import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TodoDetailPage = () => {
  const { id: todoId } = useParams();
  const [todo, setTodo] = useState();

  useEffect(() => {
    fetch(`http://localhost:45501/todos/${todoId}`)
      .then((res) => res.json())
      .then((todoResult) => setTodo(todoResult));
  }, [todoId]);

  if (todo && todo._id)
    return (
      <div>
        <h1>{todo.text}</h1>
        <p>Status: {todo.status}</p>
        <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
        <h2>Image</h2>
        <img
          src={`http://localhost:45501/${todo.image}`}
          width="600"
          alt="Todo Attachment"
        />
        <p>
          <Link to="/">&lt; All Todos</Link>
        </p>
      </div>
    );
  else
    return (
      <div>
        <h1>Todo Not Found</h1>
      </div>
    );
};

export default TodoDetailPage;
