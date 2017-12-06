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
    this.state = {

    }
  }


  render() {
    return (
      <div className="video">
        This is Video Page
        <div>Current User: {this.props.currentChatStore.username}</div>
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