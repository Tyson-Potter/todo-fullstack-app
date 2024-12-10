const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  todos: [
    {
      task: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("List", listSchema);
