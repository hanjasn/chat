const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const router = require('./router');
const { MongoClient } = require('mongodb');
const { mongoUsername, mongoPassword } = require('./keys');

const PORT = process.env.PORT || 5000;
const origin =
  PORT === 5000 ? 'http://localhost:3000' : 'https://jh-chat.herokuapp.com';

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: origin,
  },
});
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@database.po52g.mongodb.net/database?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on('connection', (socket) => {
  socket.on('join', (rooms) => {
    for (const { id } of rooms) {
      socket.join(id);
    }
  });

  socket.on('sendMessage', async ({ currentRoomID, username, text }) => {
    io.to(currentRoomID).emit('message', { currentRoomID, username, text });

    try {
      await client.connect();
      const rooms = client.db('database').collection('rooms');
      await rooms.updateOne(
        { id: currentRoomID },
        { $push: { messages: { username, text } } }
      );
    } finally {
      await client.close();
    }
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

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(router);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
