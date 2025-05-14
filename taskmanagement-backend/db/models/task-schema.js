const { Schema, model } = require("mongoose");

const taskSchema = Schema({
  title: { type: String },
  description: String,
  status: {
    type: String,
    enum: ["Todo", "Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["High", "Normal", "Low"],
  },
  members: Number,
  deadline: { type: Date },
});

const Task = model("tasks", taskSchema);
module.exports = Task;
