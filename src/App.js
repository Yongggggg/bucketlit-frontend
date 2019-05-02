import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import BucketList from './pages/BucketList';
import { Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/bucketlist/" component={BucketList} />
      <Route path="/register/" component={Register} />
      <Route path="/login/" component={Login} />
    </>
  );
}

export default App;
