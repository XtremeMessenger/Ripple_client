import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../containers/login_container.jsx'
import Signup from '../containers/signup_container.jsx'
import Main from './Main.jsx'
import Setting from './Setting.jsx'
import Video from './Video.jsx'

import Root from './Root.jsx'
import { Link } from 'react-router-dom';

const App = () => (
  <div id="yolo">
    <Switch>
      <Route path='/login' exact component={ Login } />
      <Route path='/signup' exact component={ Signup } />
      <Route path='/main' exact component={ Main } />
      <Route path='/setting' exact component={ Setting } />
      <Route path='/video' exact component={ Video } />
      <Route path='/' exact component= { Root } />
    </Switch>
  </div>
);

export default App;
