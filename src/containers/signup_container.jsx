import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { handleSignup } from '../actions/handleSignup.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import FIREBASE_API from '../../config.js'

const firebase = require("firebase");
// console.log('API Key', FIREBASE_API.FIREBASE_API)
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: FIREBASE_API.FIREBASE_API,
  authDomain: "xtrememessenger.firebaseapp.com",
  databaseURL: "https://xtrememessenger.firebaseio.com",
  projectId: "xtrememessenger",
  storageBucket: "xtrememessenger.appspot.com"
};
firebase.initializeApp(config);

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    // this.handleClickDropDown = this.handleClickDropDown.bind(this)
    this.state = {
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      quote: '',
      icon: ''
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
    // console.log('state ', this.state)
    await this.props.handleSignup(this.state);
    console.log('this is redux state after submit ===== ', this.props)
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function (user) {
      const newUser = {
        username: context.state.username,
        password: user.uuid,
        email: context.state.email,
        first: context.state.firstname,
        last: context.state.lastname,
        quote: context.state.quote,
        icon: ''
      }
    axios.post('/main/signup', newUser)
      .then(response => {
        console.log('sign up response ', response.data)
      })
    })
  }

  // handleClickDropDown(name) {
  //   this.setState({ org: name }, () => { console.log('new state: ', this.state) });
  // }

  render() {

    return (
      <div id="sign_up_view">
        <FormGroup id="signup">
          <div id="credentials"><label> Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> First Name: <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> Last Name: <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> Quote: <input type="text" name="quote" value={this.state.quote} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> Icon </label></div>
          <div id="credentials"><label> Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> Email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></label></div>
          <span><input type="submit" value="Signup" onClick={this.handleClickSubmit} /></span>
        </FormGroup>
      </div>
    )
  }

}
function mapStateToProps(state) {
  return {
    reducerSignupStore: state.reducerSignupStore
  }
}

//dispatch: call a function
function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators({ handleSignup: handleSignup }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
