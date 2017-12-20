import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap'
import GroupChatBox from './group_chatbox.jsx'
import axios from 'axios'
// import io from 'socket.io-client'
import URL from '../../../config/url.js'
import { setGroupChat } from '../../actions/setGroupChat.jsx';
import { setCurrentChatView } from '../../actions/setCurrentChatView.jsx';

import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Functions from '../../functions/functions.js';
import PropTypes from 'prop-types'


class Group extends Component {
  constructor(props) {
    super(props)
    this.handleCloseChat = this.handleCloseChat.bind(this)
    this.state = {

    }
  }

  // componentDidMount() {

  // }

  handleCloseChat() {
    this.props.setGroupChat({
      currentUser: this.props.currentUserStore.username,
      currentRoom: null,
      messages: []
    })
    this.props.setCurrentChatView({
      chatview: 0
    })
  }

  render() {

    var context = this;
    return (

      <div id="Group_chat">
      <button id="closeChatButton" onClick={this.handleCloseChat}>Close</button>s
        {/* <div><h2>Group Chat</h2></div> */}
        {/* <button id="videoChatButton" onClick={this.handleVideoChat}>Video Chat</button> */}
        <div id="videoChatButton">
        <button><Link id="linkstyle" to="/video">VideoChat</Link> </button>
        </div>
        <div id="videoChatButton">
          <button><Link id="linkstyle" to="/videoConference">Video Conference</Link> </button>
        </div>
        
        <div><GroupChatBox /></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentGroupChatStore: state.currentGroupChatStore,
    currentUserStore: state.currentUserStore,
    currentChatView: state.currentChatView
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators(
    {
      setGroupChat: setGroupChat,
      setCurrentChatView: setCurrentChatView
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Group);
