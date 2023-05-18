import React from 'react';
import './App.css';
import Header from 'components/header/Header';
import { Route, Switch } from 'react-router-dom';
import CounterFeature from 'features/counter';
import ProductFeature from 'features/product';
import CartFeature from 'features/cart';

function App() {
  return (
    <div className="app">
      <Header />

      <Switch>
        <Route exact path="/" component={CounterFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
      </Switch>
    </div>
  );
}

export default App;
