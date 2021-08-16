import React from 'react';
import ReactDOM from 'react-dom';
import "../src/Pages/index/index.sass"
import Index from './Pages/index';
import store from '../src/Reducers/store'

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {  Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './Pages/search/search';
import Detail from './Pages/detail/detail';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch  >
        <Route exact path="/" >
            <Index/>
        </Route>
      </Switch>
      <Switch  >
        <Route exact path="/items">
          <Search/>
        </Route>
      </Switch>
      <Switch  >
        <Route exact path="/items/:id" >
          <Detail/>
        </Route>
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
