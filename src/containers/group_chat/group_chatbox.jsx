import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import URL from '../../../config/url.js'
import { setGroupChat } from '../../actions/setGroupChat.jsx';
import { setCurrentChatView } from '../../actions/setCurrentChatView.jsx';

import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Functions from '../../functions/functions.js';
import PropTypes from 'prop-types'


class GroupChatBox extends Component {
  constructor(props) {
    super(props)
    this.handleMessageToSocket = this.handleMessageToSocket.bind(this)
    // this.handleCloseChat = this.handleCloseChat.bind(this)
    this.handleMessageFromSocket = this.handleMessageFromSocket.bind(this)
    this.handleClickMessage = this.handleClickMessage.bind(this)
    // this.handleVideoChat = this.handleVideoChat.bind(this)

    this.state = {
      // messages: []
    }
  }

  componentDidMount() {
    this.handleMessageFromSocket()
  }

  handleMessageFromSocket() {
    this.socket = io(URL.SOCKET_SERVER_URL, { secure: true })
    this.socket.on('group', message => {
      console.log('message got from socket:', message)

      if (message.roomID === this.props.currentGroupChatStore.roomID 
        && this.props.currentGroupChatStore.roomID !== null) {
        // console.log('this is messages ', this.props.currentGroupChatStore.messages)
        let messageArray = this.props.currentGroupChatStore.messages;
        // console.log('this is messageArray', messageArray)
        messageArray.unshift(message)
        this.props.setGroupChat({
          currentUser: this.props.currentUserStore.username,
          currentRoom: this.props.currentGroupChatStore.currentRoom,
          messages: messageArray
        })
      }
    })
  }

  async handleMessageToSocket(event) {
    console.log('handleMessageToSocket invoked')
    const text = event.target.value
    console.log('this.props.currentUserStore.username', this.props.currentUserStore)
    if (event.keyCode === 13 && text) {
      let date = Date.now();
      let message = {
        roomID: this.props.currentGroupChatStore.currentRoom.roomID,
        from: this.props.currentUserStore.username,
        text: text,
        timestamp: date
      }
      event.target.value = '';
      this.socket.emit('group', message)
      console.log('message emitted thru socket', message)
      // new message stores in db
      await axios.post(`${URL.LOCAL_SERVER_URL}/main/groupChatStore`, message).then(function (response) {
        console.log('chat store success', response)
      })
      let messageArray = this.props.currentGroupChatStore.messages;
      console.log('this is messageArray', messageArray)
      messageArray.unshift(message)
      
      this.props.setGroupChat({
        currentUser: this.props.currentUserStore.username,
        currentRoom: this.props.currentGroupChatStore,
        messages: messageArray
      })
    }
  }


  handleClickMessage(e) {
    // alert('you clicked')
  }

  render() {

    var context = this;
    return (

      <div id="group_chat">
        <div><h2>Group Chat</h2></div>
        {/* <button id="videoChatButton" onClick={this.handleVideoChat}>Video Chat</button> */}
        {/* <div id="videoChatButton">
          <Link to="/video"><h2>VideoChat</h2></Link>
        </div>
        <div id="videoChatButton">
          <Link to="/videoConference"><h2>Video Conference</h2></Link>
        </div> */}
        {/* <button id="closeChatButton" onClick={this.handleCloseChat}>Close Chat Window</button> */}
        <p> Username: {context.props.currentUserStore.username} </p>
        <p> Room Name: {context.props.currentGroupChatStore.currentRoom.roomname} </p>
        <p> Chatroom ID: {context.props.currentGroupChatStore.currentRoom.roomID} </p>
        
        {
          context.props.currentGroupChatStore.messages.length>0 ? 
          context.props.currentGroupChatStore.messages.map((message, index) => {
              return <li id="chat_list" key={index}><b>{message.from}: </b>{message.text} { Functions.timestampToDate(message.timestamp) } </li>
            }) 
            : "No Message Yet"
        }
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleMessageToSocket} />
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

export default connect(mapStateToProps, matchDispatchToProps)(GroupChatBox);
