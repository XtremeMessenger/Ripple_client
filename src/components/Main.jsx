import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import Chat from '../containers/chat_container.jsx'
import PrivateChat from '../containers/private_chat_container.jsx'
import PrivateRoom from '../containers/private_room_container.jsx'
import Friendlist from '../containers/friendlist_container.jsx'
import Roomlist from '../containers/roomlist_container.jsx'
import UserPanel from '../containers/userpanel_container.jsx'
import Video from './Video.jsx'
import URL from '../../config/url.js'
import { setCurrentUser } from '../actions/setCurrentUser.jsx';
import { setCurrentFriends } from '../actions/setCurrentFriends.jsx';
import jwtDecode from 'jwt-decode';

import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { setInterval } from 'timers';

class Main extends Component {
  constructor(props) {
    super(props)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.getTokenTimeLeft = this.getTokenTimeLeft.bind(this)
    this.state = {
      token: '',
      tokenTimeLeft: 0,
      tokenvalid: true,
      currentUser: '',
      friendsArr: []
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return true;
  //   // return !deepEquals(render(this.props), render(nextProps))
  // }

  componentDidMount() {
    this.setState({ token: localStorage.token })
    try {
      const { exp } = jwtDecode(localStorage.token);
      let cutoff = Math.floor(Date.now() / 1000);
      let timeleft = exp - cutoff - 3000;
      console.log('timeleft ======= ', timeleft);
      if (timeleft < 0) {
        this.handleLogout();
        // localStorage.removeItem('token');
        // this.props.history.push('/login');
      }
    } catch (e) {
      // this.setState({tokenvalid: false})
      // this.props.history.push('/login');
      this.handleLogout();
    }
    if (this.state.tokenvalid) {
      this.getUserInfo()
    }
    //this.getUserInfo()
    setInterval(this.getTokenTimeLeft,1000);
  }

  getTokenTimeLeft() {
    if (this.state.token) {
      const { exp } = jwtDecode(this.state.token);
      let cutoff = Math.floor(Date.now() / 1000);
      let timeleft = exp - cutoff - 3000;
      this.setState({ tokenTimeLeft: timeleft })
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ tokenvalid: false })
    this.props.setCurrentUser({
      username: '',
      firebase_id: '',
      email: '',
      first: '',
      last: '',
      quote: '',
      icon: ''
    })
    this.props.history.push('/login');
  }

  getUserInfo() {
    var context = this;
    var friends = this.state.friendsArr.slice()
    const getParameter = async () => {
      //const response = await axios.post('http://www.jayop.com:3000/main/login', {
      var response = await axios.post(`${URL.LOCAL_SERVER_URL}/main/auth`, {
        firebase_id: localStorage.uid
      })
      await context.setState({ currentUser: response.data[0].username })
      await context.props.setCurrentUser(response.data[0])
      console.log('response.data[0] in Main', response.data[0])

      let userRef = {
        user: response.data[0]
      };
      console.log('componentWillMount userRef', userRef)
      var response2 = await axios.post(`${URL.LOCAL_SERVER_URL}/main/getFriends`, userRef)
      console.log('this is response2', response2)
      await response2.data.forEach(function (friend) {
        friends.push(friend)
      })

      await context.setState({
        friendsArr: friends
      }, () => { console.log('friendsarray after willmount', context.state.friendsArr) })
      await context.props.setCurrentFriends({
        currentUser: response.data[0].username,
        currentFriends: friends
      }, () => { console.log('friendsarray after willmount', context.state.friendsArr) })
      // .then(function (response) {
      //   console.log('this is getFriends response', response)
      //   response.data.forEach(function (friend) {
      //     friends.push(friend)
      //   })
      //   context.setState({
      //     friendsArr: friends
      //   }, () => {console.log('friendsarray after willmount',this.state.friendsArr)})
      // })

      console.log('friendsarray after willmount', this.state.friendsArr)
    }
    getParameter();
  }

  render() {
    return (
      <div className="main">
        <div>current User: {this.props.currentUserStore.username}</div>
        <div>current ChatView: {this.props.currentChatView.chatview}</div>
        <div>Session Timeout in:
          {this.state.tokenTimeLeft > 0 ? ` ${this.state.tokenTimeLeft} sec`: ' session out'}</div>
        <span><input type="submit" value="Logout" onClick={this.handleLogout} /></span>
        <div><UserPanel /></div>
        {this.props.currentChatView.chatview === 0 ?
          <div><Chat /></div> : null}
        {this.props.currentChatView.chatview === 0 ?
          <div id="chat">No Chat Room Opened</div> : null}
        {this.props.currentChatView.chatview === 1 ? 
          <div><PrivateChat /></div> : null}
        {this.props.currentChatView.chatview === 2 ?
          <div><PrivateRoom /></div> : null}
        <div><Friendlist /></div>
        <div><Roomlist /></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore,
    currentChatView: state.currentChatView,
    currentFriendsStore: state.currentFriendsStore
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators(
    { setCurrentUser: setCurrentUser,
    setCurrentFriends: setCurrentFriends }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Main);