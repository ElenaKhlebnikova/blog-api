const express = require('express');
const db = require('./db/db');

const app = express();

app.use(express.json());

// 1. Add eslint
// 2. return the data created/updated
// 3. validate provided data by user

// function to check if the data provided by the user is valid

const isValid = (body) => {
  if (body.username && body.title && body.text) {
    return true;
  }
  return false;
};

// ----- ROUTES -----
app.get('/posts', async (req, res) => {
  try {
    const posts = await db('posts');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/posts', async (req, res) => {
  try {
    const newPostData = req.body;
    if (isValid(newPostData)) {
      await db('posts').insert(newPostData);
      res.status(200).json({ message: 'Success', body: newPostData });
    } else {
      res.status(400).json({ message: 'Error creating a new post. Data is not valid.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating new post', error: err });
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (isValid(updatedData)) {
      await db('posts').where({ id }).update(updatedData);
      res.status(200).json({ message: 'Post is updated!', body: updatedData });
    } else {
      res.status(400).json({ message: 'Error upddating the post. Data is not valid.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating the post', error: err });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db('posts').select('id').where('id', id).del();
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the post', error: err });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});
