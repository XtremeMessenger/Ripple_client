import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import URL from '../../config/url.js'
import { setPrivateRoom } from '../actions/setPrivateRoom.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';

class PrivateRoom extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getRoomHistory = this.getRoomHistory.bind(this)
    this.handleCloseChat = this.handleCloseChat.bind(this)
    
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    //this.socket = io('http://chat.jayop.com')
    //this.getRoomHistory()
    console.log('this is in private room container === ')

    this.socket = io(URL.SOCKET_SERVER_URL, { secure: true })
    this.socket.on('private', message => {
      console.log('this is from socket io message', message)
      console.log('this is messages ', this.props.currentRoomStore.messages)
      var messageArray = this.props.currentRoomStore.messages;
      messageArray[0].push(message)
      this.props.setPrivateRoom({
        currentUser: this.props.currentUserStore.username,
        currentRoom: this.props.currentRoomStore.currentRoom,
        messages: messageArray
      })

    })
  }
 
  getRoomHistory() {
    // console.log('this is redux state before submit ===== ', this.props);

  }



  handleSubmit(event) {
    console.log('handleSubmit invoked')
    const text = event.target.value
    //console.log('this.props.currentUserStore.username', this.props.currentUserStore)
    if (event.keyCode === 13 && text) {
      var message = {
        
        from: this.props.currentUserStore.username,
        to: this.props.currentRoomStore.currentRoom.roomname,
        text: text
      }

      this.socket.emit('private', [message.from, message.text])
      console.log('to send', message)
      // axios.post(`${URL.LOCAL_SERVER_URL}/main/privateRoomStore`, message).then(function (response) {
      // // axios.post(`/main/privateRoomStore`, message).then(function (response) {
      //   console.log('add room success', response)
      // })

      var messageArray = this.props.currentRoomStore.messages;
      console.log('messageArray', messageArray)
      messageArray[0].push(message)
      this.props.setPrivateRoom({
        currentUser: this.props.currentUserStore.username,
        currentRoom: this.props.currentRoomStore.currentRoom,
        messages: messageArray
      })

      event.target.value = '';

    }
  }

  handleCloseChat() {
    this.props.setPrivateRoom({
      currentUser: this.props.currentUserStore.username,
      currentRoom: '',
      messages: []
    })
    this.props.setCurrentChatView({
      chatview: 0
    })
  }

  render() {
    var context = this;
    return (
      <div id="private_room">
        <div><h2>Private Room</h2></div>
        <button id="closeChatButton" onClick={this.handleCloseChat}>Close Chat Window</button>
        <p> Username: {this.props.currentRoomStore.currentUser} </p>
        <p> Room Name: {this.props.currentRoomStore.currentRoom.roomname} </p>
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
        {
          this.props.currentRoomStore.messages.length>0 ? 
            this.props.currentRoomStore.messages[0].map((message, index) => {
              return <li id="chat_list" key={index}><b>{message.from}:</b>{message.text}</li>
            }) : 'no message yet'
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentRoomStore: state.currentRoomStore,
    currentUserStore: state.currentUserStore,
    currentChatView: state.currentChatView
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators(
    { setPrivateRoom: setPrivateRoom,
      setCurrentChatView: setCurrentChatView }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PrivateRoom);