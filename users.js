// { username, socketid }
const users = [];

const addUser = (username, socketid) => {
  const user = { username, socketid };
  // If user exists, then user probably refreshed which changes socket.id, so update it
  // If user leaves the page and comes back, socket.id will match what's in the server so no need to update it
  const index = users.findIndex((user) => user.username === username);
  if (index === -1) {
    users.push(user);
  } else {
    users[index] = user;
  }
  return user;
};

const removeUser = username => {
  const index = users.findIndex(user => user.username === username);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = username => users.find(user => user.username === username);

module.exports = { addUser, removeUser, getUser };