import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import BucketList from './pages/BucketList';
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/bucketlist" component={BucketList} />
    </>
  );
}

export default App;
