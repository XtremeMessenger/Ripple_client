import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AllReducers from './reducers/AllReducers.jsx';
import App from './components/App.jsx';

//main application storage
const store = createStore(AllReducers);

ReactDOM.render(
  // <h2>Hey Now -- </h2>,
  // <App />,
  // Provider: make the data accessable
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
