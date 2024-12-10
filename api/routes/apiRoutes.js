const express = require("express");
const listController = require("../controllers/listController");
const todoController = require("../controllers/todoController");

const router = express.Router();

// List Routes
router.get("/lists", listController.getLists);
router.delete("/lists/:listId", listController.deleteList);
router.post("/lists/", listController.createList);

// Todo Routes
router.patch("/lists/:listId/todos/:todoId", todoController.patchTodo);
router.delete("/lists/:listId/todos/:todoId", todoController.deleteTodo);
router.post("/lists/:listId/todos", todoController.createTodo);

module.exports = router;
