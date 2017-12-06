import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';

class Video extends Component {
  constructor(props) {
    super(props)
    this.handleCloseVideo = this.handleCloseVideo.bind(this)
    this.state = {

    }
  }

  componentDidMount() {
    console.log('inside video.jsx', this.props)
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