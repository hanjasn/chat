const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const router = express.Router();
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.use(express.json()); // parses JSON data
// router.use(express.urlencoded({ extended: false })); // parses form data

router.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    await client.connect();
    const users = client.db('database').collection('users');
    const user = await users.findOne({ username: username });
    delete user.password;
    res.json({ user });
  } finally {
  }
});

router.get('/rooms/:username', async (req, res) => {
  const { username } = req.params;

  try {
    await client.connect();
    const dbUsers = client.db('database').collection('users');
    const dbRooms = client.db('database').collection('rooms');
    const { rooms: roomIDs } = await dbUsers.findOne({ username: username });

    let rooms = [];
    for (const { id } of roomIDs) {
      rooms.push(await dbRooms.findOne({ id: id }));
    }
    res.json({ rooms });
  } finally {
  }
});

router.get('/invitedRooms/:username', async (req, res) => {
  const { username } = req.params;

  try {
    await client.connect();
    const dbUsers = client.db('database').collection('users');
    const dbRooms = client.db('database').collection('rooms');
    const { invitedRooms: invitedRoomIDs } = await dbUsers.findOne({
      username: username,
    });

    let invitedRooms = [];
    for (const { id } of invitedRoomIDs) {
      const invitedRoom = await dbRooms.findOne({ id: id });
      delete invitedRoom.messages;
      invitedRooms.push(invitedRoom);
    }
    res.json({ invitedRooms });
  } finally {
  }
});

router.post('/createRoom', async (req, res) => {
  const { username, roomName } = req.body;

  try {
    await client.connect();
    const lastRoomID = client.db('database').collection('lastRoomID');
    const id = (await lastRoomID.findOne({ key: 'id' })).id + 1;
    const room = {
      id,
      name: roomName,
      users: [{ username }],
      messages: [],
    };
    res.json({ room });
    await lastRoomID.updateOne({ key: 'id' }, { $inc: { id: 1 } });

    const users = client.db('database').collection('users');
    const rooms = client.db('database').collection('rooms');
    await users.updateOne({ username: username }, { $push: { rooms: { id: id } } });
    await rooms.insertOne(room);
  } finally {
  }
});

router.post('/invitation/accept', async (req, res) => {
  const { username, roomID } = req.body;

  try {
    await client.connect();
    const users = client.db('database').collection('users');
    const rooms = client.db('database').collection('rooms');
    await users.updateOne(
      { username: username },
      { $pull: { invitedRooms: { id: roomID } } }
    );
    await users.updateOne({ username: username }, { $push: { rooms: { id: roomID } } });
    await rooms.updateOne({ id: roomID }, { $push: { users: { username: username } } });
  } finally {
    res.end();
  }
});

router.post('/invitation/decline', async (req, res) => {
  const { username, roomID } = req.body;

  try {
    await client.connect();
    const users = client.db('database').collection('users');
    await users.updateOne(
      { username: username },
      { $pull: { invitedRooms: { id: roomID } } }
    );
  } finally {
    res.end();
  }
});

router.post('/leaveRoom', async (req, res) => {
  const { username, roomID } = req.body;

  try {
    await client.connect();
    const users = client.db('database').collection('users');
    const rooms = client.db('database').collection('rooms');
    await users.updateOne({ username: username }, { $pull: { rooms: { id: roomID } } });
    await rooms.updateOne({ id: roomID }, { $pull: { users: { username: username } } });
  } finally {
    res.end();
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin') {
    res.json({ user: null, message: 'Reserved account' });
    return;
  }

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
  }
});

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
      user = { username, password, rooms: [], invitedRooms: [] };
      await users.insertOne(user);
      delete user.password;
      res.json({ user, message: '' });
    }
  } finally {
  }
});

module.exports = router;
