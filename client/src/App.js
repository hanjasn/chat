import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';

// TODO: persist login status by saving information in localStorage
const App = () => {
  const [user, setUser] = useState();

  return (
    <Router>
      <Route path='/'>
        <Header user={user} setUser={setUser} />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signin'>
        <SignIn user={user} setUser={setUser} />
      </Route>
      <Route path='/chat'>
        <Chat user={user} />
      </Route>
    </Router>
  );
};

export default App;
