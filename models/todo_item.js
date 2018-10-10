const mongoose = require('mongoose');

const TodoItemSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["pending", "in process", "done", "archived"],
    default: "pending"
  },
  dateDue: {
    type: Date
  },
  completedAt: {
    type: Date
  }
});

TodoItemSchema.set('timestamps', true);
const TodoItem = mongoose.model('TodoItem', TodoItemSchema);

module.exports = TodoItem;
