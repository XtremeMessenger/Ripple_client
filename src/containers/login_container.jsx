import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Signup from './signup_container.jsx';
// import FIREBASE from '../../config/firebase.js'
import axios from 'axios';
import { setCurrentUser } from '../actions/setCurrentUser.jsx';
import URL from '../../config/url.js'
import { Link } from 'react-router-dom';

const firebase = require('firebase')
var provider = new firebase.auth.FacebookAuthProvider();
//const EndPoint = '/main'

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.handleChangeDeveloper = this.handleChangeDeveloper.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
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

  handleChangeDeveloper(event) {
    var obj = {};
    obj['username'] = event.target.value;
    obj['password'] = `${event.target.value}${event.target.value}`;
    obj['email'] = `${event.target.value}@${event.target.value}.com`;
    this.setState(obj, () => {
      //console.log('new state: ', this.state)
    });
  }

  async handleClickSubmit (e) {
    e.preventDefault();
    //console.log('this is redux state before submit ===== ', this.props);
    let context = this;
    firebase.auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(user){
      firebase.auth.Auth.Persistence.LOCAL

      const getParameter = async () => {
        const response = await axios.post(`${URL.LOCAL_SERVER_URL}/main/login`, {
          firebase_id: user.uid
        })
        context.props.setCurrentUser(response.data[0])
        console.log('response.data[0].token', response.data[0].token);
        await localStorage.setItem('username', response.data[0].username);
        await localStorage.setItem('uid', response.data[0].key);
        await localStorage.setItem('token', response.data[0].token.accessToken);
        console.log('localStorage.token', localStorage.token)
        //console.log('this is redux state after submit ===== ', context.props)
        context.props.history.push('/main')
      }
      getParameter();
      })
      .catch((error) => {
          console.log('failed to login thru firebase', error.message)
          context.props.history.push('/')
      });
    }

  handleEnter(event) {
    if (event.keyCode === 13) {
      this.handleClickSubmit(event);
    }
  }

  render() {
    const { email, password, submitted } = this.state;
    return (
      <div id="login_view">
        <div className="container login-signup-wrappers">
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h2 id="login">Login</h2>
              <p>
                Don't have an account?
                <span className="auth-link">
                  <Link to="/signup">
                    Sign up
                  </Link>
                </span>
              </p>
              <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                <label htmlFor="email">Email</label> <br></br>
                <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} placeholder='email'/>
                {submitted && !email &&
                    <div className="help-block">Username is required</div>
                }
              </div>
              <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                <label htmlFor="password">Password</label><br></br>
                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder='Password' />
                {submitted && !password &&
                    <div className="help-block">Password is required</div>
                }
              </div>
              <div className="form-group">
                <button id="loginbutton" className="btn btn-primary" type="button" onClick={this.handleClickSubmit}>Login</button>
              </div>
              <div id="credentials"><label> Quick Login:<br></br> <input type="text" name="all" value={this.state.username} onChange={this.handleChangeDeveloper} onKeyUp={this.handleEnter}/></label></div> 
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
  return bindActionCreators({ setCurrentUser: setCurrentUser }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);