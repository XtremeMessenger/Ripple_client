import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';

import io from 'socket.io-client'

class Video extends Component {
  constructor(props) {
    super(props)
    this.handleCloseVideo = this.handleCloseVideo.bind(this)
    this.state = {

    }
  }

  componentDidMount() {
    console.log('inside video.jsx', this.props.currentChatStore.messages)
    // this.socket = io(URL.SOCKET_SERVER_URL);
    // this.socket.on('message', message => {
    //   this.setState({ messages: [message, ...this.state.messages] },
    //     () => { console.log('this.setstate by socket io', this.state.messages) })
    // })
  }

  handleCloseVideo() {
    this.props.history.push('/main');
  }


  render() {
    let context = this
    return (
      <div className="video">
        This is Video Page
        <button id="closeVideoButton" onClick={this.handleCloseVideo}>Close Video</button>
        <div>Current User: {this.props.currentChatStore.currentUser}</div>
        <div>Current User: {this.props.currentChatStore.currentFriend}</div>
        <div id="private_chat"> Chat Window
          {
            this.props.currentChatStore.messages.length > 0 ?
              this.props.currentChatStore.messages[0].map((message, index) => {
                return <li id="chat_list" key={index}><b>{message.from}:</b>{message.text}</li>
              }) : 'no message yet'

          }
        </div>
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

// function matchDispatchToProps(dispatch) {
//   // call selectUser in index.js
//   return bindActionCreators(
//     {
//       setPrivateChat: setPrivateChat,
//       setCurrentChatView: setCurrentChatView
//     }, dispatch)
// }

export default connect(mapStateToProps)(Video);