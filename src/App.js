import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import BucketList from './pages/BucketList';
import { Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Item from './pages/Item';

function App() {
  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/bucketlist/" component={BucketList} />
      <Route path="/register/" component={Register} />
      <Route path="/login/" component={Login} />
      <Route path="/profile/" component={Profile} />
      <Route path="/item/:id" component={Item} />
    </>
  );
}

export default App;
