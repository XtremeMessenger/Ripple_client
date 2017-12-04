import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import URL from '../../config/url.js'

class PrivateChat extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handle
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    //this.socket = io('http://chat.jayop.com')
    this.getChatHistory
  }

  getChatHistory() {
    e.preventDefault();
    //console.log('this is redux state before submit ===== ', this.props);
    let context = this;
    const chatHistory = async () => {
      const response = await axios.post(`${URL.SERVER_URL}/main/getPrivateChatHistory`, {
        ogUsor: this.props.currentChatStore.currentUser,
        friend: this.props.currentChatStore.currentFriend
      })
      this.setState(response.data[0], () => {
        console.log('new state: ', this.state.messages)
      });
      this.socket = await io(URL.SOCKET_SERVER_URL)
      this.socket.on('message', message => {
        this.setState({ messages: [message, ...this.state.messages] })
      })
    }
    chatHistory();
  }

  handleSubmit(event) {
    console.log('handleSubmit invoked')
    const body = event.target.value
    //console.log('this.props.currentUserStore.username', this.props.currentUserStore)
    if (event.keyCode === 13 && body) {
      const message = {
        body: body,
        from: this.props.currentUserStore.username
      }
      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', [message.from, message.body])
      event.target.value = ''
      axios.post(`${URL.SERVER_URL}/main/chat/store`, {
        newMessage: message.body
      })
    }
  }


  render() {

    const messages = this.state.messages.map((message, index) => {
      return <li id="chat_list" key={index}><b>{message.from}:</b>{message.body}</li>
    })

    return (
      <div id="chat">
        {/* <h1 id="chat-user">Current User: {this.props.currentUser}</h1> */}
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
        {messages}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChatStore: state.currentChatStore
  }
}

export default connect(mapStateToProps)(PrivateChat);