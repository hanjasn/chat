// { username, socketid }
const users = [];

const addUser = (username, socketid) => {
  if (getUser(username)) return { username: '', socketid: '' };

  const user = { username, socketid };
  users.push(user);
  return user;
};

const removeUser = username => {
  const index = users.findIndex(user => user.username === username);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = username => users.find(user => user.username === username);

module.exports = { addUser, removeUser, getUser };