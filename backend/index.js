require('dotenv').config(); // Add this line at the top of your file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
app.get('/', async (req, res) => {
    res.json("hii everyone");
});

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

app.put('/api/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
  res.json(updatedTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
