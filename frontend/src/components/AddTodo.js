import { useState } from "react";

const AddTodo = (props) => {
  const [todoText, setTodoText] = useState("");
  const [todoImage, setTodoImage] = useState(null);
  const [erroMessage, setErrorMessage] = useState("");

  const addTodo = (event) => {
    // event default (aka page reload) verhindern!!!
    event.preventDefault();
    // Do Optimistic Re-Render...
    const placeHolderIdOptimisticReRender = "added_todo_optimisitic_rerender";
    props.setTodos([
      {
        _id: placeHolderIdOptimisticReRender,
        text: todoText,
        status: "open",
        createdAt: Date.now(),
      },
      ...props.todos,
    ]);

    const oldTodosArray = [...props.todos];

    const formDataBody = new FormData(); // multipart/form-data
    formDataBody.append("text", todoText);
    // formDataBody.append("deadline", todoDeadline);
    if (todoImage) {
      formDataBody.append("todoImage", todoImage, todoImage.name);
    } else {
      return setErrorMessage("Please choose a todo image :)");
    }

    fetch("http://localhost:45501/todos/new", {
      method: "POST",
      // headers: { "Content-Type": "application/json" }, // multipart/form-data
      body: formDataBody,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          console.log("Error:", data.err);
          // optimistic re-render failed...
          return props.setTodos(oldTodosArray);
        }

        // overwrite the todo placeholder with acutal todo in state (so everything else works too)
        const addedTodo = data;
        props.setTodos([addedTodo, ...oldTodosArray]);
        setTodoText(""); // empty todo text input
        setErrorMessage(""); // reset errorMessage
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error adding todo, try again later...");
      });
  };

  return (
    <div>
      <form className="add-todo-form">
        <h1>Add Todo</h1>
        <input
          type="text"
          onChange={(event) => setTodoText(event.target.value)}
          value={todoText}
          className="add-todo-input"
        />
        <input
          type="file"
          onChange={(event) => setTodoImage(event.target.files[0])}
          className="add-todo-input"
        />
        <button onClick={addTodo} className="add-todo-btn">
          Add Todo
        </button>
      </form>
      <p style={{ color: "red" }}>{erroMessage}</p>
    </div>
  );
};

export default AddTodo;
