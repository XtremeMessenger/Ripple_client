import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import Chat from '../containers/chat_container.jsx'
import PrivateChat from '../containers/private_chat_container.jsx'
import PrivateRoom from '../containers/private_room_container.jsx'
import Friendlist from '../containers/friendlist_container.jsx'
import Roomlist from '../containers/roomlist_container.jsx'
import UserPanel from '../containers/userpanel_container.jsx'
import Video from './Video.jsx'
import URL from '../../config/url.js'
import { setCurrentUser } from '../actions/setCurrentUser.jsx';

import { FormGroup } from 'react-bootstrap'
import axios from 'axios'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    var context = this;
    const getParameter = async () => {
      //const response = await axios.post('http://www.jayop.com:3000/main/login', {
      const response = await axios.post(`${URL.LOCAL_SERVER_URL}/main/auth`, {
        firebase_id: localStorage.uid
      })
      context.props.setCurrentUser(response.data[0])
      console.log('response.data[0] in Main', response.data[0])
    }
    getParameter();
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

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators({ setCurrentUser: setCurrentUser }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Main);