import React from 'react';
import './App.css';
import Header from 'components/header/Header';
import { Switch } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import CounterFeature from 'features/counter';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Route path="/" component={CounterFeature}></Route>
      </Switch>
    </div>
  );
}

export default App;
