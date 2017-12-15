import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap'
import PrivateChatBox from './private_chatbox.jsx'
import axios from 'axios'
// import io from 'socket.io-client'
import URL from '../../config/url.js'
import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';

import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Functions from '../functions/functions.js';
import PropTypes from 'prop-types'


class Private extends Component {
  constructor(props) {
    super(props)
    this.handleCloseChat = this.handleCloseChat.bind(this)
    this.state = {

    }
  }

  // componentDidMount() {

  // }

  handleCloseChat() {
    this.props.setPrivateChat({
      currentUser: this.props.currentUserStore.username,
      currentFriend: '',
      directRoomId: null,
      messages: []
    })
    this.props.setCurrentChatView({
      chatview: 0
    })
  }

  render() {

    var context = this;
    return (

      <div id="private_chat">
        <div><h2>Private Chat</h2></div>
        {/* <button id="videoChatButton" onClick={this.handleVideoChat}>Video Chat</button> */}
        <div id="videoChatButton">
          <Link to="/video"><h2>VideoChat</h2></Link>
        </div>
        <div id="videoChatButton">
          <Link to="/videoConference"><h2>Video Conference</h2></Link>
        </div>
        <button id="closeChatButton" onClick={this.handleCloseChat}>Close Chat Window</button>
        <div><PrivateChatBox /></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChatStore: state.currentChatStore,
    currentUserStore: state.currentUserStore,
    currentChatView: state.currentChatView
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators(
    {
      setPrivateChat: setPrivateChat,
      setCurrentChatView: setCurrentChatView
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Private);
