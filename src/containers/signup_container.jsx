import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { handleSignup } from '../actions/handleSignup.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import FIREBASE from '../../config/firebase.js'
// import URL from '../../config/url.js'

const firebase = require("firebase");
firebase.initializeApp(FIREBASE.FIREBASE_CONFIG);

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
    this.handleChangeDeveloper = this.handleChangeDeveloper.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.state = {
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      quote: '',
      icon: '',
      all: ''
    };
  }

  handleChangeDeveloper(event) {
    var obj = {};
    obj['username'] = event.target.value;
    obj['password'] = `${event.target.value}${event.target.value}`;
    obj['email'] = `${event.target.value}@${event.target.value}.com`;
    obj['firstname'] = `${event.target.value}s firstname`;
    obj['lastname'] = `${event.target.value}s lastname`;
    obj['quote'] = `${event.target.value}s quote`;
    obj['icon'] = "https://lh3.googleusercontent.com/VlUerPxAQm1l25mb1aS3ZZmjV_JmAFABPrrJm-YiQ35kB_zuVaG1C-LSNqLJq8RyGdY=w300";
    this.setState(obj, () => {
      //console.log('new state: ', this.state)
    });
  }

  handleChange(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj, () => {
      //console.log('new state: ', this.state)
    });
  }

  handleIconClick(e){
    console.log('icon clicked', e.target.src)
    this.setState({
      icon: e.target.src
    })
  }

  async handleClickSubmit (e) {
    e.preventDefault();
    console.log('this is redux state before submit ===== ',this.props)
    let context = this;
    // console.log('state ', this.state)
    await this.props.handleSignup(this.state);
    console.log('this is redux state after submit ===== ', this.props)
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function (user) {
        console.log('successfully registerd new user with firebase id :', user.uid)
      const newUser = {
        username: context.state.username,
        firebase_id: user.uid,
        email: context.state.email,
        first: context.state.firstname,
        last: context.state.lastname,
        quote: context.state.quote,
        icon: context.state.icon
      }
      //axios.post('http://www.jayop.com:3000/main/signup', newUser)
      axios.post(`/main/signup`, newUser)
      .then(response => {
        console.log('sign up response ', response.data)
        context.props.history.push('/login')
      })
    })
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      this.handleClickSubmit(event);
    }
  }

  render() {

    return (
      <div id="sign_up_view">
	    <h2 id="signin">Signup</h2>
        <p>
          Already have an account?
            <span className="auth-link">
            <Link to="/login">
              Login
              </Link>
          </span>
        </p>
        <FormGroup id="signup">
          <div id="credentials"><label> Username: <br></br><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> First Name: <br></br><input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> Last Name: <br></br><input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> Quote: <br></br><input type="text" name="quote" value={this.state.quote} onChange={this.handleChange} /></label></div>
          <div id="credentials">
          <label> Choose an Icon: <br></br></label>
          <img src="https://thumbs.dreamstime.com/z/businessman-profile-icon-male-portrait-business-man-flat-design-vector-illustration-55382689.jpg" width="100" height="100" onClick={this.handleIconClick}></img>
          <img src="https://thumbs.dreamstime.com/z/face-woman-hairdo-face-appearance-single-icon-flat-style-vector-symbol-stock-illustration-face-98467159.jpg" width="100" height="100" onClick={this.handleIconClick}></img>
          </div>
          <div id="credentials"><label> Password: <br></br><input type="text" name="password" value={this.state.password} onChange={this.handleChange} /></label></div>
          <div id="credentials"><label> Email: <br></br><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></label></div>
          <span><input type="submit" value="Signup" onClick={this.handleClickSubmit} /></span>
          <div id="credentials"><label> DeveloperOnly:<br></br> <input type="text" name="all" value={this.state.username} onChange={this.handleChangeDeveloper} onKeyUp={this.handleEnter} /></label></div>
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
