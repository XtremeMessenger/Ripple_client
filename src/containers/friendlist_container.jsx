import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import {connect} from  'react-redux'
import URL from '../../config/url.js'
import FriendlistEntry from './friendlist_entry.jsx'
import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';

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
    console.log('currentUser', this.props.currentUserStore)
    let userRef = {
      user: this.props.currentUserStore
    }
    console.log('currentUser', currentUser)
    // axios.post(`/main/getFriends`, userRef).then(function (response) {
    axios.post(`${URL.LOCAL_SERVER_URL}/main/getFriends`,userRef).then(function(response){
      console.log('this is getFriends response', response)
      response.data.forEach(function(friend){
        friends.push(friend)
      })
      context.setState({
        friendsArr: friends
      })
    })
    .catch(function(err){
      console.log('error in POST request to url /getFriends', err)
    })

  }
  // handleFindFriend(){
  //   console.log(document.getElementById('friendSearchBar').value);
  //   let newFriend = document.getElementById('friendSearchBar').value;
  //   let currentUser = this.props.currentUserStore;
  //   console.log(' this is the current logged user ',currentUser)
  //   let friendRequest = { 
  //     requestee: currentUser,
  //     requested: newFriend
  //   }
  //   // axios.post('/main/addFriend', friendRequest).then(function (response) {
  //   axios.post(`${URL.LOCAL_SERVER_URL}/main/addFriend`, friendRequest).then(function(response){
  //     console.log('add friend success', response)
  //   }).catch(function(err){
  //     console.log('error in add friend ', err)
  //   })
  // }

  handleFindFriend() {
    console.log(document.getElementById('friendSearchBar').value);
    let newFriend = document.getElementById('friendSearchBar').value;
    let currentUser = this.props.currentUserStore;
    console.log(' this is the current logged user ', currentUser)
    let friendRequest = {
      requestee: currentUser,
      requested: newFriend
    }
    let userRef = {
      user: this.props.currentUserStore
    }
    // axios.post('/main/addFriend', friendRequest).then(function (response) {
    axios.post(`${URL.LOCAL_SERVER_URL}/main/addFriend`, friendRequest).then(function (response) {
      console.log('add friend success', response)
    }).catch(function (err) {
      console.log('error in add friend ', err)
    }).then(
      axios.post(`${URL.LOCAL_SERVER_URL}/main/getFriends`, userRef).then(function (response) {
        console.log('this is getFriends response', response)
        response.data.forEach(function (friend) {
          friends.push(friend)
        })
        context.setState({
          friendsArr: friends
        })
      })
    )
  }

  handleClick(friend){
    var context = this
    console.log('before click chatview', context.props.currentChatView)
    const privateChat = async () => {
      
      context.props.setCurrentChatView({
        chatview: 1
      })

      
      // await context.props.setPrivateChat({
      //   currentUser: context.props.currentUserStore.username,
      //   currentFriend: friend,
      //   // messages: response.data.messages
      // })
      
      console.log('this.props.currentUserStore', context.props.currentUserStore)
      //console.log('this.props.currentChatStore.currentFriend', context.props.currentChatStore.currentFriend)
      // const response = await axios.post(`/main/getPrivateChatHistory`, {
      const response = await axios.post(`${URL.LOCAL_SERVER_URL}/main/getPrivateChatHistory`, {
        from: context.props.currentUserStore.username,
        to: friend
      })
      await context.props.setPrivateChat({
        currentUser: context.props.currentUserStore.username,
        currentFriend: friend,
        messages: response.data.messages
      })
      // await context.props.setPrivateChat({
      //   currentUser: context.props.currentUserStore.username,
      //   currentFriend: friend,
      //   messages: response.data.messages
      // })

      console.log('response response response ===', response)
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
          <ul> {this.state.friendsArr.map(function(friend, i){
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
    currentChatView: state.currentChatView
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators(
    { setPrivateChat: setPrivateChat,
      setCurrentChatView: setCurrentChatView }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Friendlist);