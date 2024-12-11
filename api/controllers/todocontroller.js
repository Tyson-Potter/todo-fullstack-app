const List = require("../models/List");


exports.createTodo = async (req, res) => {
  const { listId } = req.params;
  const { task } = req.body;

  if (typeof (task) !== "string") {
    return res.status(422).json({ message: "Task must be a non-empty string" });
  }

  if (!task) {
    return res.status(422).json({ message: "Task field is required" });
  }

  const list = await List.findById(listId);

  if (!list) {
    return res.status(404).json({ message: "List not found" });
  }

  const completed = false;
  const todo = { task, completed };
  list.todos.push(todo);
  await list.save();
  res.status(201).json(todo);
};


exports.patchTodo = async (req, res) => {
  const { listId, todoId } = req.params;
  const attributes = {};

  if (Object.keys(req.body).includes("task")) {
    attributes.task = req.body.task;
  }

  if (Object.keys(req.body).includes("completed")) {
    attributes.completed = req.body.completed;
  }

  if (Object.keys(attributes).length === 0) {
    return res.status(422).json({ message: "No valid fields passed in" });
  }

  const list = await List.findById(listId);

  if (!list) {
    return res.status(404).json({ message: "List not found" });
  }

  const todo = list.todos.id(todoId);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (attributes.task) {
    todo.task = attributes.task;
  }

  if (Object.keys(attributes).includes('completed')) {
    todo.completed = attributes.completed;
  }

  await list.save();
  res.status(200).json({ todo });
};


exports.deleteTodo = async (req, res) => {
  const { listId, todoId } = req.params;

  const list = await List.findById(listId);
  if (!list) {
    return res.status(404).json({ message: "List not found" });
  }


  const todoIndex = list.todos.findIndex(
    (todo) => todo._id.toString() === todoId
  );
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  list.todos.splice(todoIndex, 1);

  await list.save();

  res.status(200).json({ message: `Todo with ID: ${todoId} deleted` });

};
