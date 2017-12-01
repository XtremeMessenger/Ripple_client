import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Signup from './signup_container.jsx';
import FIREBASE_API from '../../config.js';
import axios from 'axios';
import { setCurrentUser } from '../actions/setCurrentUser.jsx';

const firebase = require('firebase')
var provider = new firebase.auth.FacebookAuthProvider();

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.state = {
      username: '',
      password: '',
      email: '',
      submitted: false,
      error: null,
      showLogin:true    
    };
  }

  handleChange(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj, () => {
      //console.log('new state: ', this.state)
    });
  }
  
  async handleClickSubmit (e) {
    e.preventDefault();
    console.log('this is redux state before submit ===== ', this.props);
    let context = this;
    firebase.auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(function(user){
        firebase.auth.Auth.Persistence.LOCAL

      const getParameter = async () => {
        const response = await axios.post('/login', {
          firebase_id: user.uid
        })
        context.props.setCurrentUser(response.data[0])
        console.log('this is redux state after submit ===== ', context.props)
        context.props.history.push('/main')
      }
      getParameter();
    })
    .catch((error) => {
        console.log('failed to login thru firebase', error.message)
    });
  }

  render() {
    const { username, password, submitted } = this.state;
    return (
      <div id="login_view">
        <div className="container login-signup-wrappers">
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h2>Login</h2>
              <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} placeholder='Username'/>
                {submitted && !username &&
                    <div className="help-block">Username is required</div>
                }
              </div>
              <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder='Password' />
                {submitted && !password &&
                    <div className="help-block">Password is required</div>
                }
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClickSubmit}>Login</button>
                <button className="btn btn-primary btn-facebook" onClick={this.handleFacebookLogin}>Facebook</button>
                <button className='btn btn-secondary btn-sign-up' onClick={this.handleRegister}>Sign Up</button>
              </div>  
          </div>
        </div>
        </div>
      </div>
    )
  } 
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators({ setCurrentUser: setCurrentUser }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);