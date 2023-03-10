const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const { TodoService, UserService } = require("./use-cases");
const { doAuth } = require("./middleware/doAuth");

const PORT = process.env.PORT || 45501;
const app = express();

app.use(cors()); // cors policy middleware
app.use(morgan("dev")); // logging middleware
app.use(express.json()); // body parser middleware -- NUR json!
app.use(express.static("app-data/todo-images"));

app.post("/users/login", async (req, res) => {
  try {
    const loginCredentials = {
      email: req.body.email,
      password: req.body.password,
    };
    const loginResult = await UserService.loginUser(loginCredentials);
    res.json(loginResult);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

app.post("/users/register", (req, res) => {
  const userInfo = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  UserService.registerUser(userInfo)
    .then((registerdUser) => res.json(registerdUser))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

// alle todos fetchen
app.get("/todos/all", doAuth, (_, res) => {
  TodoService.getAllTodos()
    .then((todos) => res.json(todos))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

// einzelnes todo per id fetchen
app.get("/todos/:id", doAuth, (req, res) => {
  const todoId = req.params.id;
  TodoService.getTodo({ todoId })
    .then((todo) => res.json(todo || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

const upload = multer({ dest: "./app-data/todo-images" });
const uploadMiddleware = upload.single("todoImage");

// todo anlegen
app.post("/todos/new", doAuth, uploadMiddleware, (req, res) => {
  TodoService.addTodo({
    text: req.body.text,
    image: req.file.filename,
  })
    .then((addedTodo) => res.json(addedTodo))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

// todo bearbeiten (zb status ??ndern)
app.put("/todos/update", doAuth, (req, res) => {
  const todoId = req.body.todoId; // welche todo soll ge-updated werden?
  const newStatus = req.body.status;

  TodoService.changeTodoStatus({ todoId, newStatus })
    .then((newTodosArray) => res.json(newTodosArray))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

// todo l??schen
app.delete("/todos/delete", doAuth, (req, res) => {
  const todoId = req.body.todoId; // welche todo soll gel??scht werden ?
  TodoService.removeTodo({ todoId })
    .then((newTodosArray) => res.json(newTodosArray))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

app.listen(PORT, () => console.log("Server listening on port", PORT));

/*
Plan

Todo-App FERN Stack

useful functions:
* readJsonFile(filename): Promise<JSONObject>
* writeJsonFile(filename, dataObj): Promise<dataObj>

Express Routes:
GET    "/todos/all"
POST   "/todos/new"
PUT    "/todos/update"
DELETE "/todos/delete"

CRUD = Create Read Update Delete
        POST  GET   PUT   DELETE

"Sind die CRUD routes f??r die users schon fertig ?"
    - Generischer Projektmanager, 2023
"Ja."
    - Du, 2023
*/
