import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import {connect} from  'react-redux'
import URL from '../../../config/url.js'
import RoomlistEntry from './roomlist_entry.jsx'
import { setGroupChat } from '../../actions/setGroupChat.jsx';
import { setCurrentChatView } from '../../actions/setCurrentChatView.jsx';
import { setCurrentRooms } from '../../actions/setCurrentRooms.jsx';
import Functions from '../../functions/functions.js';
import io from 'socket.io-client'

class Roomlist extends Component {
  constructor(props) {
    super(props)
    this.handleGetRooms = this.handleGetRooms.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleRoomClick = this.handleRoomClick.bind(this);
    this.state = {
      roomsArray: []
    }
  }

  componentDidMount(){
    this.socket = io(URL.SOCKET_SERVER_URL, { secure: true })
    this.handleGetRooms();
  }

  async handleGetRooms() {
    let getRoomResponse = await axios.post(`${URL.LOCAL_SERVER_URL}/main/getRooms`, {})
    console.log('getRoomResponse', getRoomResponse.data)
    this.props.setCurrentRooms({
      currentUser: this.props.currentUserStore.username,
      currentRooms: getRoomResponse.data.data
    })
    console.log('this.props.currentRoomStore', this.props.currentRoomStore)
  }

  async handleCreateRoom() {
    // console.log(document.getElementById('roomSearchBar').value);
    let newRoom = document.getElementById('roomSearchBar').value;
    // console.log('newRoom', newRoom)
    let currentUser = this.props.currentUserStore.username;
    // console.log(' this is the current logged user ', currentUser)

    let roomRequest = {
      username: currentUser,
      roomname: newRoom
    }

    let context = this;
    let newRoomResponse = await axios.post(`${URL.LOCAL_SERVER_URL}/main/newRoom`, roomRequest)
    if (newRoomResponse.data.err) {
      alert(newRoomResponse.data.data)
    } else {
      // console.log('newRoomResponse', newRoomResponse.data.data)
      this.props.setCurrentRooms({
        currentUser: this.props.currentUserStore.username,
        currentRooms: newRoomResponse.data.data
      })
      this.socket.emit('newroom', 'newroom')
      // console.log('this.props.currentRoomsStore', this.props.currentRoomsStore)
    }
  }

  async handleRoomClick(room){
    // var context = this

    console.log('roomID', room.roomID)
    let response = await axios.post(`${URL.LOCAL_SERVER_URL}/main/getGroupChatHistory`, room)
  
    console.log('this is getgroupChatHistory response.data', response.data)
    var messageAry = []
    if (response.data.length !== 0) {
      messageAry = response.data.messageArray.reverse()
      // messageAry = Functions.messageObjToArray(response.data.messageObj)
    }
    await this.props.setGroupChat({
      currentUser: this.props.currentUserStore.username,
      currentRoom: room,
      messages: messageAry
    })

    console.log('this.props.currentGroupChatStore', this.props.currentGroupChatStore)
    this.props.setCurrentChatView({
      chatview: 2
    })
  }

  render() {
    var context = this;
    return (
      <div className="Roomlist" id="roomsComponent">
        <h2 id="spaceit">Create Room</h2>
        <input id="spaceit" id="roomSearchBar"></input>
        <button id="findRoomButton" onClick={this.handleCreateRoom}>Create</button>
        <div>
          <span id="common">Rooms: </span>
          <ul> {context.props.currentRoomsStore.currentRooms.map(function(room, i){
            return <RoomlistEntry room={room} key = {i} id = {i} onClick={context.handleRoomClick}/> 
          })} 
          </ul>
        </div>
        {/* {<div>current chat view: {context.props.currentChatView.chatview}</div>} */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore,
    currentGroupChatStore: state.currentGroupChatStore,
    currentChatView: state.currentChatView,
    currentRoomsStore: state.currentRoomsStore
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators(
    { setGroupChat: setGroupChat,
      setCurrentChatView: setCurrentChatView,
      setCurrentRooms: setCurrentRooms }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Roomlist);