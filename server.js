const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const TodoItem = require('./models/todo_item');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/', (req,res) => {
  res.send('hello server!');

});

// get all todo items
// NOTE: might eventually need pagination and/or filtering
app.get('/todo-items', (req, res) => {
  const items = TodoItem.find()
  .then((list) => {
    res.json(list);
  })
  .catch((error) => {
    res.status(404).send(error);
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

mongoose.connect(process.env.MONGODB_URI, () => {
  app.listen(3000, function() {
    console.log('server listening on port 3000');
  });
});