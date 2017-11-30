import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../containers/login_container.jsx'
import Signup from '../containers/signup_container.jsx'
import Index2 from './Index.jsx'
import { Link } from 'react-router-dom';

const App = () => (
  <div id="yolo">
    <Switch>
      <Route path='/login' exact component={ Login } />
      <Route path='/signup' exact component={ Signup } />
      <Route path='/' exact component= { Index2 }/>
    </Switch>
  </div>
);

export default App;
