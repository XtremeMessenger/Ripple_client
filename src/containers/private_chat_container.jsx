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

class PrivateChat extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCloseChat = this.handleCloseChat.bind(this)
    // this.handleVideoChat = this.handleVideoChat.bind(this)

    this.handle
    this.state = {
      messages: [],
      startVideo: false
    }
  }

  componentDidMount() {
    this.socket = io('http://chat.jayop.com')
    //this.getChatHistory()
    this.socket = io(URL.SOCKET_SERVER_URL)
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] },
      () => { console.log(this.state.messages)})
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log('this is next prop', nextProps)
    this.setState({
      messages: nextProps.currentChatStore.messages
      //messages: [nextProps.currentChatStore.messages, ...this.state.messages]
    }, ()=> {
      console.log('this.state',this.state)
    })
  }
 
  // getChatHistory() {
  //   console.log('this is redux state before submit ===== ', this.props);

  // }



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

      this.socket.emit('message', [message.from, message.text])
      console.log('to send', message)
      // new message stores in db
      // axios.post(`${URL.SERVER_URL}/main/privateChatStore`, message).then(function (response) {
      axios.post(`/main/privateChatStore`, message).then(function (response) {
        console.log('add friend success', response)
      })
      event.target.value = '';

      // ================================================ //
      // this code is to retrive messages from db
      // var context = this
      // const getData = async () => {
        // const response = await axios.post(`${URL.SERVER_URL}/main/getPrivateChatHistory`, {
        // const response = await axios.post(`/main/getPrivateChatHistory`, {
        //   from: context.props.currentUserStore.username,
        //   to: context.props.currentChatStore.currentFriend
        // })
        // await context.props.setPrivateChat({
        //   currentUser: context.props.currentUserStore.username,
        //   currentFriend: context.props.currentChatStore.currentFriend,
        //   messages: response.data.messages
        // })
      // }
      // getData()
      // ================================================ //
    }
  }

  // handleVideoChat() {
  //   console.log('this.props.history', this.props)
  //   this.props.history.push('/video')
  // }

  handleCloseChat() {
    this.props.setPrivateChat({
      currentUser: this.props.currentUserStore.username,
      currentFriend: '',
      messages: []
    })
    this.props.setCurrentChatView({
      chatview: 0
    })
  }

  render() {
    return (

      <div id="private_chat">
        <div><h2>Private Chat</h2></div>
        {/* <button id="videoChatButton" onClick={this.handleVideoChat}>Video Chat</button> */}
        <div id="videoChatButton">
          <Link to="/video">VideoChat</Link>
        </div>
        <button id="closeChatButton" onClick={this.handleCloseChat}>Close Chat Window</button>
        <p> Username: {this.props.currentChatStore.currentUser} </p>
        <p> Friend Name: {this.props.currentChatStore.currentFriend} </p>
        
        {
          this.state.messages.length>0 ? 
            this.state.messages[0].map((message, index) => {
              return <li id="chat_list" key={index}><b>{message.from}:</b>{message.text}</li>
            }) : 'test'
          
        }
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
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

export default connect(mapStateToProps, matchDispatchToProps)(PrivateChat);