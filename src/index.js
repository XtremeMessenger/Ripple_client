import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import AllReducers from './reducers/allReducers.jsx';
import App from './components/App.jsx';

//main application storage
const store = createStore(AllReducers);

ReactDOM.render(
  // <h2>Hey Now -- </h2>,
  // <App />,
  // Provider: make the data accessable
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
