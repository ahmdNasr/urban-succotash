import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoDetailPage from "./components/TodoDetailPage";
import Todos from "./components/Todos";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:45501/todos/all")
      .then((res) => res.json())
      .then((todos) => setTodos(todos));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <AddTodo todos={todos} setTodos={setTodos} />
                <Todos todos={todos} setTodos={setTodos} />
              </div>
            }
          />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
