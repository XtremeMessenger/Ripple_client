// import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { Switch, Route } from 'react-router-dom';
// import { browserHistory } from 'react-router';
// import { Link } from 'react-router-dom';

// import { FormGroup } from 'react-bootstrap'
// import axios from 'axios'
// import { bindActionCreators } from 'redux';
// import { setCurrentUser } from '../actions/setCurrentUser.jsx';
// import { setCurrentFriends } from '../actions/setCurrentFriends.jsx';
// import { setPrivateChat } from '../actions/setPrivateChat.jsx';
// import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';
// import { setInterval } from 'timers';
// import jwtDecode from 'jwt-decode';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';


import { bindActionCreators } from 'redux';

import URL from '../../config/url.js'
import { setCurrentUser } from '../actions/setCurrentUser.jsx';
import { setCurrentFriends } from '../actions/setCurrentFriends.jsx';
import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';
import { setCurrentRequests } from '../actions/setCurrentRequests.jsx';
import jwtDecode from 'jwt-decode';

import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { setInterval } from 'timers';
import FriendrequestEntry from './friendrequst_entry.jsx'
import io from 'socket.io-client'
// import { browserHistory } from 'react-router';
// import { Redirect } from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.getTokenTimeLeft = this.getTokenTimeLeft.bind(this)
    this.getFriendRequests = this.getFriendRequests.bind(this)
    this.handleRequestClick = this.handleRequestClick.bind(this)
    this.handleFlagFromSocket = this.handleFlagFromSocket.bind(this)
    this.state = {
      token: '',
      tokenTimeLeft: 0,
      tokenvalid: true,
      currentUser: '',
      friendsArr: []
    }
  }

  componentDidMount() {
    this.setState({ token: localStorage.token })
    try {
      const { exp } = jwtDecode(localStorage.token);
      let cutoff = Math.floor(Date.now() / 1000);
      let timeleft = exp - cutoff;
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
    setInterval(this.getTokenTimeLeft, 1000);
    this.handleFlagFromSocket()
  }

  getTokenTimeLeft() {
    if (this.state.token) {
      const { exp } = jwtDecode(this.state.token);
      let cutoff = Math.floor(Date.now() / 1000);
      let timeleft = exp - cutoff;
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
    this.props.setPrivateChat({
      currentUser: this.props.currentUserStore.username,
      currentFriend: '',
      directRoomId: null,
      messages: []
    })
    this.props.setCurrentChatView({
      chatview: 0
    })
    console.log('this.props', this.props)
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
      // console.log('response.data[0] in Main', response.data[0])

      let userRef = {
        user: response.data[0]
      };
      // console.log('componentWillMount userRef', userRef)
      var response2 = await axios.post(`${URL.LOCAL_SERVER_URL}/main/getFriends`, userRef)
      // console.log('this is response2', response2)
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

      // console.log('friendsarray after willmount', this.state.friendsArr)
    }
    getParameter();
  }

  async getFriendRequests() {
    let currentUser = this.props.currentUserStore;
    let friendReqeustResponse = await axios.post(`${URL.LOCAL_SERVER_URL}/main/getFriendRequests`, currentUser)
    console.log('friendReqeustResponse', friendReqeustResponse)
    await this.props.setCurrentRequests({
      currentUser: this.props.currentUserStore.username,
      currentRequests: friendReqeustResponse.data.data
    })
    console.log('after store requests', this.props.currentRequestsStore.currentRequests)
  }

  async handleRequestClick(request, choice) {
    console.log('your choice', request.requestID, request.requestee, choice)
    let decision = {
      requestee: request.requestee,
      requested: this.props.currentUserStore.username,
      decision: choice
    }
    console.log('decision === ', decision)
    let decisionResponse = await axios.post(`${URL.LOCAL_SERVER_URL}/main/decideFriend`, decision)
  }

  handleFlagFromSocket() {
    this.socket = io(URL.SOCKET_SERVER_URL, { secure: true })
    this.socket.on('request', request => {
      console.log('request got from socket:', request)

      if (request.requested === this.props.currentUserStore.username) {
        alert('you got a friend request from ' + request.requestee)
      }
    })
  }

  render() {
    var context = this;
    return (
      <div className="header">
        <div>current User: {this.props.currentUserStore.username}</div>
        <div>current ChatView: {this.props.currentChatView.chatview}</div>
        <div>Session Timeout in:
          {this.state.tokenTimeLeft > 0 ? ` ${this.state.tokenTimeLeft} sec` : ' session out'}</div>
        <span><input type="submit" value="Check Friend Request" onClick={this.getFriendRequests} /></span>
        <div>
          Friend Requests:
          <div> {this.props.currentRequestsStore.currentRequests.map(function (request, i) {
            return <FriendrequestEntry request={request} key={i} id={i} onClick={context.handleRequestClick}/>
          })}
          </div>
        </div>
        <span><input type="submit" value="Logout" onClick={this.handleLogout} /></span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore,
    currentChatView: state.currentChatView,
    currentFriendsStore: state.currentFriendsStore,
    currentRequestsStore: state.currentRequestsStore
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators(
    {
      setCurrentUser: setCurrentUser,
      setPrivateChat: setPrivateChat,
      setCurrentFriends: setCurrentFriends,
      setCurrentChatView: setCurrentChatView,
      setCurrentRequests: setCurrentRequests
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);