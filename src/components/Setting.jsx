import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap'
import Header from '../containers/header.jsx'
import URL from '../../config/url.js'

class Setting extends Component {
  constructor(props) {
    super(props)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickUpdate = this.handleClickUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.handleIconClick = this.handleIconClick.bind(this)
    // this.handleIconClick = this.handleIconClick.bind(this)
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

  componentDidMount() {
    // this.setState({username: this.currentUserStore.username})
  }

  handleClickCancel() {
    this.props.browserHistory.history.push('/main')
  }

  async handleClickUpdate() {
    console.log(this.currentUserStore)
    // alert(JSON.stringify(this.state))
    let userObj = {
      username: this.props.currentUserStore.username,
      first: this.state.firstname,
      last: this.state.lastname,
      quote: this.state.quote,
      icon: this.state.icon
    }
    // alert(JSON.stringify(userObj))
    let response = await axios.post(`${URL.LOCAL_SERVER_URL}/main/update`, userObj)
    this.props.browserHistory.history.push('/main')
  }

  handleChange(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj, () => {
      console.log('new state: ', this.state)
    });
  }

  handleIconClick(e) {
    console.log('icon clicked', e.target.src)
    this.setState({
      icon: e.target.src
    })
  }



  render() {
    return (
      <div className="setting">
        <div><Header /></div>
        <img src={this.props.currentUserStore.icon} width="100" height="100" />
        <FormGroup>
        <p> Username: {this.props.currentUserStore.username} </p>
        {/* <p> Email: {this.props.currentUserStore.email} </p> */}
        <p> FirstName: {this.props.currentUserStore.first} </p>
        <div><label> New First Name: <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} /></label></div>
        <p> LastName: {this.props.currentUserStore.last} </p>
        <div><label> New Last Name: <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} /></label></div>
        <p> Quote: {this.props.currentUserStore.quote} </p>
        <div><label> New Quote: <input type="text" name="quote" value={this.state.quote} onChange={this.handleChange} /></label></div>
          <div>
            <label> Choose a New Icon: </label>
            <img src="https://thumbs.dreamstime.com/z/businessman-profile-icon-male-portrait-business-man-flat-design-vector-illustration-55382689.jpg" width="100" height="100" onClick={this.handleIconClick}></img>
            <img src="https://thumbs.dreamstime.com/z/face-woman-hairdo-face-appearance-single-icon-flat-style-vector-symbol-stock-illustration-face-98467159.jpg" width="100" height="100" onClick={this.handleIconClick}></img>
          </div>
        <Button bsStyle="primary" onClick={this.handleClickCancel}>Cancel</Button >
        <Button bsStyle="warning" onClick={this.handleClickUpdate}>Update</Button >
        </FormGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore,
    browserHistory: state.browserHistory
  }
}

export default connect(mapStateToProps)(Setting);