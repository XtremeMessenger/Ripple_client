import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import URL from '../../config/url.js'
import { setPrivateChat } from '../actions/setPrivateChat.jsx';

class PrivateChat extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getChatHistory = this.getChatHistory.bind(this)

    this.handle
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    //this.socket = io('http://chat.jayop.com')
    //this.getChatHistory()
    this.socket = io(URL.SOCKET_SERVER_URL)
  }
  componentWillUpdate() {
    //this.socket = io('http://chat.jayop.com')
    this.getChatHistory()
  }
b 
  getChatHistory() {
    console.log('this is redux state before submit ===== ', this.props);
    let context = this;
    const chatHistory = async () => {
      //const response = await axios.post(`${URL.SERVER_URL}/main/getPrivateChatHistory`, {
      console.log('inside chat history ==== ', this.props.currentChatStore)
      const response = await axios.post(`/main/getPrivateChatHistory`, {
      from: context.props.currentChatStore.currentUser,
        to: context.props.currentChatStore.currentFriend
      })
      console.log('response.data', response.data.messages)
      //console.log('response.data[0]', response.data.messages)
      this.props.setPrivateChat(response.data.messages, () => {
        console.log('new state: ', this.props.currentUserStore.messages)
      });
      
      this.socket.on('message', message => {
        this.props.setPrivateChat({ messages: [message, ...this.state.messages] })
      })
    }
    chatHistory();
  }

  handleSubmit(event) {
    console.log('handleSubmit invoked')
    const text = event.target.value
    //console.log('this.props.currentUserStore.username', this.props.currentUserStore)
    if (event.keyCode === 13 && text) {
      var message = {
        
        from: this.props.currentUserStore.username,
        to: this.props.currentChatStore.currentFriend,
        text: text
      }
      //this.setState({ messages: [message, ...this.state.messages] })
      //this.props.setPrivateChat({ messages: [message, ...this.props.currentChatStore.messages] })
      //this.props.setPrivateChat({ currentUser: this.props.currentChatStore.currentUser})
      //this.props.setPrivateChat({ currentFriend: this.props.currentChatStore.currentFriend })
      this.socket.emit('message', [message.from, message.text])
      console.log('to send', message)
      //axios.post(`${URL.SERVER_URL}/main/privateChatStore`, message)
      axios.post(`/main/privateChatStore`, message)
      event.target.value = '';
    }
  }


  render() {

    var messages = this.props.currentChatStore.messages.map((message, index) => {
      return <li id="chat_list" key={index}><b>{message.from}:</b>{message.text}</li>
    })

    return (
      <div id="private_chat">
        <div><h2>Private Chat</h2></div>
        <p> Username: {this.props.currentChatStore.currentUser} </p>
        <p> Friend Name: {this.props.currentChatStore.currentFriend} </p>
        {/* <h1 id="chat-user">Current User: {this.props.currentUser}</h1> */}
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
        {messages}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChatStore: state.currentChatStore,
    currentUserStore: state.currentUserStore
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators({ setPrivateChat: setPrivateChat }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PrivateChat);