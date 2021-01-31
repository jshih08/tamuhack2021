import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import MainBg from './pages/MainBg';
import Carousel from './pages/Carousel';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/carousel" exact component={Carousel} />
        <Route path="/" component={MainBg} />
      </Switch>
    </Router>
  );
}
