const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const { getDB } = require("./getDB");
const { ObjectId } = require("mongodb");
const { deleteTodoImage } = require("./utils");

const PORT = 45501;
const app = express();

app.use(cors()); // cors policy middleware
app.use(morgan("dev")); // logging middleware
app.use(express.json()); // body parser middleware -- NUR json!
app.use(express.static("app-data/todo-images"));

// alle todos fetchen
app.get("/todos/all", (_, res) => {
  getDB()
    .then((db) =>
      db.collection("todos").find().sort({ createdAt: -1 }).toArray()
    )
    .then((todos) => res.json(todos))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// einzelnes todo per id fetchen
app.get("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  getDB()
    .then((db) => db.collection("todos").findOne({ _id: ObjectId(todoId) }))
    .then((todo) => res.json(todo || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

const upload = multer({ dest: "./app-data/todo-images" });
const uploadMiddleware = upload.single("todoImage");

// todo anlegen
app.post("/todos/new", uploadMiddleware, (req, res) => {
  const newTodoObj = {
    text: req.body.text,
    status: "open", // status ist immer open bei einem neune Todo
    deadline: req.body.deadline,
    image: req.file.filename,
    createdAt: Date.now(),
  };

  getDB()
    .then((db) => db.collection("todos").insertOne(newTodoObj))
    .then(getDB)
    .then((db) =>
      db.collection("todos").find().sort({ createdAt: -1 }).toArray()
    )
    .then((newTodosArray) => res.json(newTodosArray))
    .catch((err) => {
      // handle failed insert --> delete uploaded file!!!!!
      console.log(err);
      res.status(500).json({ err });
    });
});

// todo bearbeiten (zb status ändern)
app.put("/todos/update", (req, res) => {
  // FIXME: consider "Todo not found error, if id is wrong"
  const todoId = req.body.todoId; // welche todo soll ge-updated werden?
  //   const newTitle = req.body.title;
  //   const newDeadline = req.body.deadline;
  const newStatus = req.body.status;

  getDB()
    .then((db) =>
      db
        .collection("todos")
        .updateOne(
          { _id: ObjectId(todoId) },
          { $set: { status: newStatus, lastUpdated: Date.now() } }
        )
    )
    .then(getDB)
    .then((db) =>
      db.collection("todos").find().sort({ createdAt: -1 }).toArray()
    )
    .then((newTodosArray) => res.json(newTodosArray))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// todo löschen
app.delete("/todos/delete", (req, res) => {
  const todoId = req.body.todoId; // welche todo soll gelöscht werden ?
  getDB()
    .then(getDB)
    .then((db) =>
      db.collection("todos").findOneAndDelete({ _id: ObjectId(todoId) })
    )
    .then((result) => {
      const deletedTodo = result.value;
      console.log({ deletedTodo });
      return deleteTodoImage(deletedTodo.image);
    })
    .then(getDB)
    .then((db) =>
      db.collection("todos").find().sort({ createdAt: -1 }).toArray()
    )
    .then((newTodosArray) => res.json(newTodosArray))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
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

"Sind die CRUD routes für die users schon fertig ?"
    - Generischer Projektmanager, 2023
"Ja."
    - Du, 2023
*/
