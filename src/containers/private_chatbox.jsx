import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import URL from '../../config/url.js'
import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';

import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Functions from '../functions/functions.js';
import PropTypes from 'prop-types'


class PrivateChatBox extends Component {
  constructor(props) {
    super(props)
    this.handleMessageToSocket = this.handleMessageToSocket.bind(this)
    // this.handleCloseChat = this.handleCloseChat.bind(this)
    this.handleMessageFromSocket = this.handleMessageFromSocket.bind(this)
    this.handleStartNewChat = this.handleStartNewChat.bind(this)
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
    this.socket.on('private', message => {
      console.log('message got from socket:', message)

      if (message.directRoomId === this.props.currentChatStore.directRoomId 
        && this.props.currentChatStore.directRoomId !== null) {
        // console.log('this is messages ', this.props.currentChatStore.messages)
        let messageArray = this.props.currentChatStore.messages;
        // console.log('this is messageArray', messageArray)
        messageArray.push(message)
        this.props.setPrivateChat({
          currentUser: this.props.currentUserStore.username,
          currentFriend: this.props.currentChatStore.currentFriend,
          directRoomId: this.props.currentChatStore.directRoomId,
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
      var message = {
        directRoomId: this.props.currentChatStore.directRoomId,
        from: this.props.currentUserStore.username,
        text: text,
        timestamp: date
      }
      event.target.value = '';
      this.socket.emit('private', message)
      console.log('message emitted thru socket', message)
      // new message stores in db
      await axios.post(`${URL.LOCAL_SERVER_URL}/main/privateChatStore`, message).then(function (response) {
        console.log('chat store success', response)
      })
      let messageArray = this.props.currentChatStore.messages;
      console.log('this is messageArray', messageArray)
      messageArray.push(message)
      
      this.props.setPrivateChat({
        currentUser: this.props.currentUserStore.username,
        currentFriend: this.props.currentChatStore.currentFriend,
        directRoomId: this.props.currentChatStore.directRoomId,
        messages: messageArray
      })
      

    }
  }

  handleStartNewChat() {
    let date = Date.now();
    var message = {
      directRoomId: this.props.currentChatStore.directRoomId,
      from: this.props.currentUserStore.username,
      text: 'first chat initiated',
      timestamp: date
    }
    axios.post(`${URL.LOCAL_SERVER_URL}/main/createDirectChat`, message).then(function (response) {
      console.log('chat store success', response)
    })
    this.props.setPrivateChat({
      currentUser: this.props.currentUserStore.username,
      currentFriend: this.props.currentChatStore.currentFriend,
      directRoomId: this.props.currentChatStore.directRoomId,
      messages: [message]
    })

  }

  // handleCloseChat() {
  //   this.props.setPrivateChat({
  //     currentUser: this.props.currentUserStore.username,
  //     currentFriend: '',
  //     directRoomId: null,
  //     messages: []
  //   })
  //   this.props.setCurrentChatView({
  //     chatview: 0
  //   })
  // }

  render() {

    var context = this;
    return (

      <div id="private_chat">
        <div><h2>Private Chat</h2></div>
        {/* <button id="videoChatButton" onClick={this.handleVideoChat}>Video Chat</button> */}
        {/* <div id="videoChatButton">
          <Link to="/video"><h2>VideoChat</h2></Link>
        </div>
        <div id="videoChatButton">
          <Link to="/videoConference"><h2>Video Conference</h2></Link>
        </div> */}
        {/* <button id="closeChatButton" onClick={this.handleCloseChat}>Close Chat Window</button> */}
        <p> Username: {context.props.currentUserStore.username} </p>
        <p> Friend Name: {context.props.currentChatStore.currentFriend} </p>
        <p> Direct Chatroom ID: {context.props.currentChatStore.directRoomId} </p>
        
        {
          context.props.currentChatStore.messages.length>0 ? 
          context.props.currentChatStore.messages.map((message, index) => {
              return <li id="chat_list" key={index}><b>{message.from}: </b>{message.text} {message.timestamp}</li>
            }) 
            : "No Message Yet"
        }
        {
          context.props.currentChatStore.messages.length > 0 ?
            <input type='text' placeholder='Enter a message...' onKeyUp={this.handleMessageToSocket} /> :
            <span><input type="submit" value="Start New Chat" onClick={this.handleStartNewChat} /></span>
        }
      </div>
    )
  }
}

// PrivateChat.propTypes = {
//   currentChatStore: PropTypes.shape({
//    messages: PropTypes.array.isRequired,
//    currentUser: PropTypes.string.isRequired,
//    currentFriend: PropTypes.string.isRequired
//   }),
//   currentUserStore: PropTypes.shape({
//     username: PropTypes.string.isRequired
//   }),
//   currentChatView: PropTypes.number.isRequired

// };


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

export default connect(mapStateToProps, matchDispatchToProps)(PrivateChatBox);
