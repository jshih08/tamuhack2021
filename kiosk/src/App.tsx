import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import MainBg from './pages/MainBg';
import Carousel from './pages/Carousel';
import io from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:5000';
const socket = io.connect(ENDPOINT);

export default function App() {
  return (
    <Router>
      <Route path="/carousel">
        <Carousel socket={socket} />
      </Route>
      <Route path="/">
        <MainBg socket={socket} />
      </Route>
    </Router>
  );
}
