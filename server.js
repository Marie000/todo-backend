const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const TodoItem = require('./models/todo_item');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// get all todo items
// NOTE: might eventually need pagination and/or filtering
app.get('/todo-items', (req, res) => {
  TodoItem.find()
  .then((list) => {
    if (!list) res.status(404).send('no items found');
    res.json(list);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
});

// create a todo item
app.post('/todo-items', (req, res) => {
  const item = new TodoItem(req.body);
  item.save()
  .then((savedItem) => {
    res.send(savedItem);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
});

// update a todo item
app.patch('/todo-items/:id', (req, res) => {

  if (req.body.status === 'done') {
    req.body.completedAt = Date.now();
  }

  TodoItem.findByIdAndUpdate(req.params.id, {$set:req.body}, {safe:true, new:true})
  .then((item) => {
    if(!item) {res.status(404).send('item not found');}
    res.json(item);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
});

mongoose.connect(process.env.MONGODB_URI, () => {
  app.listen(3000, () => {
    console.log('server listening on port 3000');
  });
});