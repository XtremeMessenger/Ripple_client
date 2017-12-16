import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import {connect} from  'react-redux'
import URL from '../../config/url.js'
import RoomlistEntry from './roomlist_entry.jsx'
import { setPrivateRoom } from '../actions/setPrivateRoom.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';


class Roomlist extends Component {
  constructor(props) {
    super(props)
    this.handleMakeRoom = this.handleMakeRoom.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      roomsArray: []
    }
  }

  componentDidMount(){
    var context = this;
    var rooms = []
    //retrieve friends for current user
    var currentUser = this.props.currentUserStore
    // console.log('currentUser', this.props.currentUserStore)
    let userRef = {
      username: this.props.currentUserStore
    }
    // console.log('currentUser', currentUser)
    axios.post(`${URL.LOCAL_SERVER_URL}/main/getRooms`,userRef)
    .then(function(response){
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
    var context = this
    var currentUser = this.props.currentUserStore
    var rooms = [];
    let userRef = {
      user: this.props.currentUserStore
    }

    const makeRoom = async () => {

      console.log(document.getElementById('roomSearchBar').value);
      let newRoom = document.getElementById('roomSearchBar').value;
      let currentUser = this.props.currentUserStore.username;
      console.log(' this is the makeroom ',currentUser, newRoom)
      let roomRequest = { 
        resident: currentUser,
        roomname: newRoom
      }

      console.log('roomRequest', roomRequest)
      axios.post(`${URL.LOCAL_SERVER_URL}/main/addRoom`, roomRequest).then(function(response){
        console.log('add room success', response)
        let rooms = [];
        response.data.forEach(function (room) {
          rooms.push(room)
        })
        context.setState({
          roomsArray: rooms
        })
      }).catch(function(err){
        console.log('error in add room ', err)
      })
    }
    makeRoom()
  }

  handleClick(room){
    var context = this
    const privateRoom = async () => {

      context.props.setCurrentChatView({
        chatview: 2
      })

      // console.log('this.props.currentUserStore', context.props.currentUserStore.username)
      //console.log('this.props.currentRoomStore.currentFriend', context.props.currentRoomStore.currentRoom)
      const response = await axios.post(`/main/getRooms`, {
      // const response = await axios.post(`${URL.SERVER_URL}/main/getPrivateRoomHistory`, {
        from: context.props.currentUserStore.username,
        to: room
      })
      await context.props.setPrivateRoom({
        currentUser: context.props.currentUserStore.username,
        currentRoom: room,
        messages: [[]]
      })

      // console.log('response response response ===', response)
    }
    privateRoom()
  }

  render() {
    var context = this;
    return (
      <div className="roomlist" id="roomsComponent">
        <h2>Create Room</h2>
        <input id="roomSearchBar"></input>
        <button id="createRoomButton" onClick={this.handleMakeRoom}>Create</button>
        {/* <div>
          Rooms: 
          <ul> {this.state.roomsArray.map(function(room, i){
            return <RoomlistEntry room={room} key = {i} id = {i} onClick={this.handleClick}/> 
          })} 
          </ul>
        </div> */}
      </div>
    )
  }
}
{/* <li onClick={this.handleRoomClick}> {this.props.room.roomID} : {this.props.room.roomname} </li> */}
function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore,
    currentChatStore: state.currentChatStore,
    currentChatView: state.currentChatView
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators({ setPrivateRoom: setPrivateRoom,
    setCurrentChatView: setCurrentChatView }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Roomlist);