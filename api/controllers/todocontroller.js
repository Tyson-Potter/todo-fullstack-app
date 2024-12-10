const List = require("../models/List");

// Add a new todo to a list
exports.createTodo = async (req, res) => {
  const { listId } = req.params;
  const { task } = req.body;
  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    const completed = "false";
    const todo = { task, completed };
    list.todos.push(todo);
    await list.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a todo in a list
exports.patchTodo = async (req, res) => {
  try {
    const { listId, todoId } = req.params;
    const { field, newState } = req.body;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    const todo = list.todos.id(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (field != "task" && field != "completed") {
      return res.status(422).json({ message: "No valid field" });
    } else if (field === "completed") {
      todo.completed = newState;
      await list.save();
      res.status(200).json(todo);
    } else if (field === "task") {
      todo.task = newState;
      await list.save();
      res.status(200).json(todo);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a todo from a list
exports.deleteTodo = async (req, res) => {
  const { listId, todoId } = req.params;

  try {
    // Find the list by ID
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Check if the todo exists within the list
    const todoIndex = list.todos.findIndex(
      (todo) => todo._id.toString() === todoId
    );
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Remove the todo from the todos array
    list.todos.splice(todoIndex, 1);

    // Save the updated list
    await list.save();

    res.status(200).json({ message: `Todo with ID: ${todoId} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
