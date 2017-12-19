import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import { connect } from 'react-redux'
// import URL from '../../config/url.js'
import PropTypes from 'prop-types'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      messages: []
    }
  }


  componentDidMount() {
    // this.socket = io('http://localhost:3500')
    this.socket = io("http://localhost:3500")
    // this.socket.on('message', message => {
    //   this.setState({ messages: [message, ...this.state.messages] })
    // })
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
    }
  }

  render() {

    const messages = this.state.messages.map((message, index) => {
      return <li id="chat_list" key={index}><b>{message.from}:</b>{message.body}</li>
    })

    return (
      <div id="chat">
        {/* <h1 id="chat-user">Current User: {this.props.currentUser}</h1> */}
        <div>
        {messages}
        </div>
        <br></br>
        <div>
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
        </div>
      </div>
    )
  }
}


Chat.propTypes = {
  messages: PropTypes.array,
  currentUserStore: PropTypes.shape({
    username: PropTypes.string.isRequired
  })

};

  

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore
  }
}

export default connect(mapStateToProps)(Chat);