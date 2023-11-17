const express = require('express');
const db = require('./db/db');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', () => {
  console.log('connected to socket.io');
});

app.use(express.json());

const isValid = (body) => {
  if (body !== null && body.username && body.title && body.text) {
    return true;
  }
  return false;
};

// ----- ROUTES -----
app.get('/posts', async (req, res) => {
  try {
    const posts = await db('posts').orderBy('date', 'desc');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.post('/posts', async (req, res) => {
  try {
    const newPostData = req.body;
    if (isValid(newPostData)) {
      const insertedIds = await db('posts').insert(newPostData);
      const createdPost = await db('posts').where({ id: insertedIds[0] }).first();
      io.emit('recieved_new_post');
      res.status(200).json(createdPost);
    } else {
      res.status(400).json({ message: 'Error creating a new post. Data is not valid.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating new post' });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db('posts').where({ id }).first();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting the post' });
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (isValid(updatedData)) {
      const updatedId = await db('posts').where({ id }).update(updatedData);
      const updatedPost = await db('posts').where({ id: updatedId }).first();
      io.emit('edited_post');
      res.status(200).json(updatedPost);
    } else {
      res.status(400).json({ message: 'Error upddating the post. Data is not valid.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating the post' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db('posts').where({ id }).del();
    res.status(200).json({ message: `Post with id: ${id} successfully deleted` });
    io.emit('deleted_post');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the post' });
  }
});

// ------------------------------------------//

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

server.listen(process.env.PORT, () => {
  if (!process.env.HOST) {
    throw new Error('DB is not connected. ENV variable HOST not found');
  }
  console.log(`Listening at ${process.env.PORT}`);
});
