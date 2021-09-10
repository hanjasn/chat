const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const router = require('./router');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { addUser, removeUser, getUser } = require('./users');

const PORT = process.env.PORT || 5000;
const origin = PORT === 5000 ? 'http://localhost:3000' : process.env.ORIGIN;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: origin,
  },
});
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on('connection', (socket) => {
  socket.on('connected', (username) => {
    addUser(username, socket.id);
  });

  socket.on('join', (rooms) => {
    for (const { id } of rooms) {
      socket.join(id);
    }
  });

  socket.on('sendMessage', async ({ messageRoomID, username, text }) => {
    io.in(messageRoomID).emit('message', { messageRoomID, username, text });

    try {
      await client.connect();
      const rooms = client.db('database').collection('rooms');
      await rooms.updateOne(
        { id: messageRoomID },
        { $push: { messages: { username, text } } }
      );
    } finally {
    }
  });

  socket.on('invite', async ({ username, roomClickedID }, callback) => {
    try {
      await client.connect();
      // client
      const userSocket = getUser(username);
      if (userSocket) {
        const rooms = client.db('database').collection('rooms');
        const room = await rooms.findOne({ id: roomClickedID });
        delete room.messages;
        io.to(userSocket.socketid).emit('invited', room);
      }

      // database
      const users = client.db('database').collection('users');
      const user = await users.findOne({ username: username });
      if (!user) {
        callback('User does not exist');
        return;
      }

      const currentRoom = user.rooms.find((room) => room.id === roomClickedID);
      if (currentRoom) {
        callback('User is already in the room');
        return;
      }

      callback('');

      const invitedRoom = user.invitedRooms.find((room) => room.id === roomClickedID);
      if (invitedRoom) {
        return;
      }
      await users.updateOne(
        { username: username },
        { $push: { invitedRooms: { id: roomClickedID } } }
      );
    } finally {
    }
  });

  socket.on('userJoined', ({ username, invitedRoomID }) => {
    io.in(invitedRoomID).emit('addUserToRoom', { username, invitedRoomID });
  });

  socket.on('userLeft', ({ username, leftRoomID }) => {
    io.in(leftRoomID).emit('removeUserFromRoom', { username, leftRoomID });
  });

  socket.on('disconnected', (username) => {
    removeUser(username);
  });
});

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', origin);
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.use(express.static(path.join(__dirname, './client/build')));

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
