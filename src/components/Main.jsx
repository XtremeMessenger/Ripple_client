import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Chat from '../containers/chat_container.jsx'
import PrivateChat from '../containers/private_chat_container.jsx'
import PrivateRoom from '../containers/private_room_container.jsx'
import Friendlist from '../containers/friendlist_container.jsx'
import Roomlist from '../containers/roomlist_container.jsx'
import UserPanel from '../containers/userpanel_container.jsx'
import Video from './Video.jsx'

import { FormGroup } from 'react-bootstrap'
import axios from 'axios'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <div className="main">
        This is Main Page
        <div>current User: {this.props.currentUserStore.username}</div>
        <div>current ChatView: {this.props.currentChatView.chatview}</div>
        <div><UserPanel /></div>
        {this.props.currentChatView.chatview === 0 ?
          <div><Chat /></div> : null}
        {this.props.currentChatView.chatview === 0 ?
          <div id="chat">No Chat Room Opened</div> : null}
        {this.props.currentChatView.chatview === 1 ? 
          <div><PrivateChat /></div> : null}
        {this.props.currentChatView.chatview === 2 ?
          <div><PrivateRoom /></div> : null}
        <div><Friendlist /></div>
        <div><Roomlist /></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore,
    currentChatView: state.currentChatView
  }
}

export default connect(mapStateToProps)(Main);