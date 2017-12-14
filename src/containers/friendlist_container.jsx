import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import {connect} from  'react-redux'
import URL from '../../config/url.js'
import FriendlistEntry from './friendlist_entry.jsx'
import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';
import { setCurrentFriends } from '../actions/setCurrentFriends.jsx';
import Functions from '../functions/functions.js';

class Friendlist extends Component {
  constructor(props) {
    super(props)
    this.handleFindFriend = this.handleFindFriend.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      friendsArr: []
    }
  }

  componentDidMount(){
    var context = this;
    var friends = this.state.friendsArr.slice()
    //retrieve friends for current user
    var currentUser = this.props.currentUserStore
    // console.log('currentUser', this.props.currentUserStore)
    let userRef = {
      user: this.props.currentUserStore
    }
    // console.log('currentUser', currentUser)
    // axios.post(`/main/getFriends`, userRef).then(function (response) {
    axios.post(`${URL.LOCAL_SERVER_URL}/main/getFriends`,userRef)
    .then(function(response){
      console.log('this is getFriends response', response)
      response.data.forEach(function(friend){
        friends.push(friend)
      })
      context.setState({
        friendsArr: friends
      })
      context.setCurrentFriends({
        currentUser: this.currentUserStore.username,
        currentFriends: friends
      })
    })
    .catch(function(err){
      console.log('error in POST request to url /getFriends', err)
    })

  }

  handleFindFriend() {
    // console.log(document.getElementById('friendSearchBar').value);
    let newFriend = document.getElementById('friendSearchBar').value;
    let currentUser = this.props.currentUserStore;
    // console.log(' this is the current logged user ', currentUser)
    let friendRequest = {
      requestee: currentUser,
      requested: newFriend
    }
    let userRef = {
      user: this.props.currentUserStore
    }
    // axios.post('/main/addFriend', friendRequest).then(function (response) {
    let context = this;
    axios.post(`${URL.LOCAL_SERVER_URL}/main/addFriend`, friendRequest).then(function (response) {
      // console.log('add friend success', response)
      let friends = [];
      response.data.forEach(function (friend) {
        friends.push(friend)
      })
      context.setState({
        friendsArr: friends
      })
      context.props.setCurrentFriends({
        currentUser: context.props.currentUserStore.username,
        currentFriends: friends
      })
    }).catch(function (err) {
      console.log('error in add friend ', err)
    })
  }

  handleClick(friend){
    var context = this
    // console.log('before click chatview', context.props.currentChatView)
    const privateChat = async () => {
      
      context.props.setCurrentChatView({
        chatview: 1
      })

      // console.log('this.props.currentFriends', context.props.currentFriends)
      const responseGetRoomID = await axios.post(`${URL.LOCAL_SERVER_URL}/main/getDirectRoomID`, {
        username: context.props.currentUserStore.username,
        friendname: friend
      })
      let directRoomId = responseGetRoomID.data.room_id
      
      let response = await axios.post(`${URL.LOCAL_SERVER_URL}/main/getPrivateChatHistory`, {
        directRoomId: directRoomId
      })

      console.log('this is getPrivateChatHistory response.data', response.data)
      var messageAry = []
      if (response.data.length !== 0) {
        messageAry = Functions.messageObjToArray(response.data.messageObj)
      }
      await context.props.setPrivateChat({
        currentUser: context.props.currentUserStore.username,
        currentFriend: friend,
        directRoomId: directRoomId,
        messages: messageAry
      })

      console.log('this.props.currentChatStore.messages', this.props.currentChatStore.messages)
    }
    privateChat()
    
  }

  render() {
    var context = this;
    return (
      <div className="friendlist" id="friendsComponent">
        <h2>Find Friend</h2>
        <input id="friendSearchBar"></input>
        <button id="findFriendButton" onClick={this.handleFindFriend}>add</button>
        <div>
          My Friends: 
          <ul> {context.props.currentFriendsStore.currentFriends.map(function(friend, i){
            return <FriendlistEntry friend={friend} key = {i} id = {i} onClick={context.handleClick}/> 
          })} 
          </ul>
        </div>
        {<div>current chat view: {context.props.currentChatView.chatview}</div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore,
    currentChatStore: state.currentChatStore,
    currentChatView: state.currentChatView,
    currentFriendsStore: state.currentFriendsStore
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators(
    { setPrivateChat: setPrivateChat,
      setCurrentChatView: setCurrentChatView,
      setCurrentFriends: setCurrentFriends }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Friendlist);