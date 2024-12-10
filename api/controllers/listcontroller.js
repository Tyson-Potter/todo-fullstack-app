const List = require("../models/List");

// Get all lists
exports.getLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a list
exports.deleteList = async (req, res) => {
  const { listId } = req.params;
  try {
    const deletedList = await List.findByIdAndDelete(listId);
    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: `List with ID: ${listId} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new list
exports.createList = async (req, res) => {
  const { name } = req.body;
  try {
    const newList = await List.create({ name });
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
