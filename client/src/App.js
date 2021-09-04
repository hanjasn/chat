import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <Route path="/">
        <Header user={user} setUser={setUser} />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <SignIn user={user} setUser={setUser} />
      </Route>
      <Route path="/chat">
        <Chat user={user} setUser={setUser} />
      </Route>
    </Router>
  );
};

export default App;
