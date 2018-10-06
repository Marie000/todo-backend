const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

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
    type: String
  },
  completed_at: {
    type: Date
  }
});

TodoItemSchema.set('timestamps', true);
const TodoItem = mongoose.model('TodoItem', TodoItemSchema);

module.exports = TodoItem;
