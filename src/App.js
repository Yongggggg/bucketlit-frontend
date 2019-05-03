import React from 'react';
import './App.css';
import BucketList from './pages/BucketList';
import { Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Item from './pages/Item';

function App() {
  return (
    <>
      <Route exact path="/bucketlist/" component={BucketList} />
      <Route exact path="/register/" component={Register} />
      <Route exact path="/login/" component={Login} />
      <Route exact path="/item/:id" component={Item} />
      <Route exact path="/" component={Profile} />
    </>
  );
}

export default App;
