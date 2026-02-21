const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;
const DATA_FILE = "./tasks.json";

app.use(cors());
app.use(express.json());

function readTasks() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

/* GET ALL */
app.get("/tasks", (req, res) => {
  res.json(readTasks());
});

/* CREATE */
app.post("/tasks", (req, res) => {
  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

/* UPDATE TITLE */
app.put("/tasks/:id", (req, res) => {
  let tasks = readTasks();

  tasks = tasks.map(task =>
    task.id === parseInt(req.params.id)
      ? { ...task, title: req.body.title }
      : task
  );

  writeTasks(tasks);
  res.json({ message: "Task updated" });
});

/* TOGGLE STATUS */
app.patch("/tasks/:id", (req, res) => {
  let tasks = readTasks();

  tasks = tasks.map(task =>
    task.id === parseInt(req.params.id)
      ? { ...task, completed: !task.completed }
      : task
  );

  writeTasks(tasks);
  res.json({ message: "Status updated" });
});

/* DELETE */
app.delete("/tasks/:id", (req, res) => {
  let tasks = readTasks();
  tasks = tasks.filter(task => task.id !== parseInt(req.params.id));

  writeTasks(tasks);
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`TaskNest API running at http://localhost:${PORT}`);
});
