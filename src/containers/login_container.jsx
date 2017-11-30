import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Signup from './signup_container.jsx';
import FIREBASE_API from '../../config.js'

const firebase = require('firebase')
var provider = new firebase.auth.FacebookAuthProvider();
// provider.setCustomParameters({
//   'display': 'popup'
// });

// var config = {
//     apiKey: FIREBASE_API.FIREBASE_API,
//     authDomain: "xtrememessenger.firebaseapp.com",
//     databaseURL: "https://xtrememessenger.firebaseio.com",
//     projectId: "xtrememessenger",
//     storageBucket: "xtrememessenger.appspot.com"
//   };
//   firebase.initializeApp(config);
  


export default class Login extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this)
      this.handleClickSubmit = this.handleClickSubmit.bind(this)
      // this.handleClickDropDown = this.handleClickDropDown.bind(this)
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
    
      async handleClickSubmit () {
        console.log('this is redux state before submit ===== ',this.props)
        let context = this;
        e.preventDefault();
        
        // console.log('state ', this.state)
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(function(user){
            firebase.auth.Auth.Persistence.LOCAL	
            
            // axios.get('/getUser',{
            //     params:{
            //       id: user.uid
            //     }
            //   }).then(function (response) {
            //     console.log('response ', response);
            //     var userObject = response.data[0]
            //     context.props.getUserInfo(userObject);
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   })
        }).catch((error) => {
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
                        <form name="form" onSubmit={this.handleSubmit}>
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
                                <button className="btn btn-primary">Login</button>
                                <button className="btn btn-primary btn-facebook" onClick={this.handleFacebookLogin}>Facebook</button>
                                <button className='btn btn-secondary btn-sign-up' onClick={this.handleRegister}>Sign Up</button>
                            </div>
                            
                            
                        </form>
            </div>
        </div>
        </div>
	</div>
        )
      }
      
}

function mapStateToProps(state) {
    return {
      reducerSignupStore: state.reducerSignupStore
    }
  }
