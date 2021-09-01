const express = require('express');
const { MongoClient } = require('mongodb');
const { mongoUsername, mongoPassword } = require('./keys');

const router = express.Router();
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@database.po52g.mongodb.net/database?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.use(express.json()); // parses JSON data
// router.use(express.urlencoded({ extended: false })); // parses form data

// router.get('/user/:username', async (req, res) => {
//   const { username } = req.params;

//   try {
//     await client.connect();
//     const users = client.db('database').collection('users');
//     const user = await users.findOne({ username: username });
//     res.json({ user });
//   } finally {
//     await client.close();
//   }
// });

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();
    const users = client.db('database').collection('users');
    const user = await users.findOne({ username: username });
    if (!user) {
      res.json({ user: null, message: 'User does not exist' });
    } else if (password !== user.password) {
      res.json({ user: null, message: 'Password is incorrect' });
    } else {
      delete user.password;
      res.json({ user, message: '' });
    }
  } finally {
    await client.close();
  }
});

// TODO: define structure of database
router.post('/signup', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    await client.connect();
    const users = client.db('database').collection('users');
    let user = await users.findOne({ username: username });
    if (user) {
      res.json({ user: null, message: 'User already exists' });
    } else if (password.length < 8) {
      res.json({ user: null, message: 'Password is too short' });
    } else if (password !== confirmPassword) {
      res.json({ user: null, message: 'Passwords do not match' });
    } else {
      user = { username, password, rooms: {} };
      await users.insertOne(user);
      delete user.password;
      res.json({ user, message: '' });
    }
  } finally {
    await client.close();
  }
});

module.exports = router;