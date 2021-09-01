const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path')
const router = require('./router');

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

io.on('connection', (socket) => {});

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
