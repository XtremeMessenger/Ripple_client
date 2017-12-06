import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import {connect} from  'react-redux'
import URL from '../../config/url.js'
import RoomlistEntry from './roomlist_entry.jsx'
import { setPrivateChat } from '../actions/setPrivateChat.jsx';

class Roomlist extends Component {
  constructor(props) {
    super(props)
    this.handleMakeRoom = this.handleMakeRoom.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      roomsArray: [],
      roomname: ''
    }
  }

  componentDidMount(){
    var context = this;
    var rooms = this.state.roomsArray.slice()
    //retrieve friends for current user
    var currentUser = this.props.currentUserStore
    console.log('currentUser', this.props.currentUserStore.username)
    let userRef = {
      username: currentUser.username
    }
    console.log('currentUser', currentUser)
    axios.post(`/main/getRooms`, userRef).then(function (response) {
    // axios.post(`${URL.SERVER_URL}/main/getRooms`,userRef).then(function(response){
      console.log('this is getRooms response', response)
      response.data.forEach(function(room){
        rooms.push(room)
      })
      context.setState({
        roomsArray: rooms
      })
    })
    .catch(function(err){
      console.log('error in POST request to url /getRooms', err)
    })

  }
  handleMakeRoom(){
    console.log(document.getElementById('roomSearchBar').value);
    let newRoom = document.getElementById('roomSearchBar').value;
    let currentUser = this.props.currentUserStore.username;
    console.log(' this is the makeroom ',currentUser, newRoom)
    let roomRequest = { 
      resident: currentUser,
      roomname: newRoom
    }
    console.log('roomRequest', roomRequest)
    axios.post('/main/addRoom', roomRequest).then(function (response) {
    // axios.post(`${URL.SERVER_URL}/main/addRoom`, roomRequest).then(function(response){
      console.log('add room success', response)
    }).catch(function(err){
      console.log('error in add room ', err)
    })
    console.log('this.state.roomsArray ', this.state.roomsArray)
  }

  handleClick(room){
    
    var context = this
    const privateRoom = async () => {

      console.log('this.props.currentUserStore', context.props.currentUserStore.username)
      //console.log('this.props.currentRoomStore.currentFriend', context.props.currentRoomStore.currentRoom)
      const response = await axios.post(`/main/getRooms`, {
      // const response = await axios.post(`${URL.SERVER_URL}/main/getPrivateRoomHistory`, {
        from: context.props.currentUserStore.username,
        to: room
      })
      await context.props.setPrivateRoom({
        currentUser: context.props.currentUserStore.username,
        currentRoom: room,
        messages: response.data.messages
      })

      console.log('response response response ===', response)
    }
    privateRoom()
  }

  render() {
    var context = this;
    console.log(' this is the room state shit ', this.state)
    return (
      <div className="roomlist" id="roomsComponent">
        <h2>Create Room</h2>
        <input id="roomSearchBar"></input>
        <button id="findFriendButton" onClick={this.handleMakeRoom}>Create</button>
        <div>
          Rooms: 
          <ul> {this.state.roomsArray.map(function(room, i){
            return <RoomlistEntry room={room} key = {i} id = {i} onClick={context.handleClick}/> 
          })} 
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore,
    currentChatStore: state.currentChatStore
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators({ setPrivateChat: setPrivateChat }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Roomlist);