import React from 'react';
import Login from '../containers/login_container.jsx'
import Signup from '../containers/signup_container.jsx'

const App = () => (
  <div>
    <h2>Login:</h2>
    <Login /> 
    <hr />
    <h2>Signup:</h2>
    <Signup />
  </div>
);

export default App;