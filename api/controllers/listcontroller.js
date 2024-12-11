const List = require("../models/List");


exports.getLists = async (req, res) => {


  const lists = await List.find();
  console.log(lists);
  res.status(200).json(lists);

};


exports.deleteList = async (req, res) => {
  const { listId } = req.params;

  const deletedList = await List.findByIdAndDelete(listId);

  if (!deletedList) {
    return res.status(404).json({ message: "List not found" });
  }

  res.status(200).json({ message: `List with ID: ${listId} deleted` });

};


exports.createList = async (req, res) => {
  const { name } = req.body;

  const newList = await List.create({ name });
  res.status(201).json(newList);
};
