import React from 'react';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';

import './App.css';

const history = createBrowserHistory();

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
