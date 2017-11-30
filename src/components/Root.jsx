import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Root = () => (
  <div className="first-page">
   <div className="login-button">
      <Link to="/login">Login</Link>
    </div>
   <div className="signup-button">
     <Link to="/signup">Signup</Link>
   </div>
  </div>
);

export default Root;
