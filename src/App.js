import React from 'react';
import './App.css';
import Header from 'components/header/Header';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/"></Route>
      </Switch>
    </div>
  );
}

export default App;
