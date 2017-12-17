import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { browserHistory } from 'react-router';
import Login from '../containers/login_container.jsx'
import Signup from '../containers/signup_container.jsx'
import Header from '../containers/header.jsx'
import Main from './Main.jsx'
import Setting from './Setting.jsx'
import Video from './Video.jsx'
import VideoConference from './VideoConference.jsx'
import Jay from '../../public/resume/Jay/Jay.jsx'
import Ruslan from '../../public/resume/Ruslan/Ruslan.jsx'
import YiYang from '../../public/resume/YiYang/YiYang.jsx'

import Root from './Root.jsx'
import { Link } from 'react-router-dom';

const App = () => (
  <div id="yolo">
    <Switch>
      
      <Route path='/login' exact component={ Login } />
      <Route path='/signup' exact component={ Signup } />
      <Route path='/main' exact component={ Main } />
      <Route path='/header' exact component={Header} />
      <Route path='/setting' exact component={ Setting } />
      <Route path='/video' exact component={ Video } />
      <Route path='/videoConference' exact component={ VideoConference } />
      <Route path='/jay' exact component={Jay} />
      <Route path='/ruslan' exact component={Ruslan} />
      <Route path='/yiyang' exact component={YiYang} />
      <Route path='/' component= { Main } />
    </Switch>
  </div>
);

export default App;
