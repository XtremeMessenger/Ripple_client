import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import URL from '../../config/url.js'
import { setPrivateRoom } from '../actions/setPrivateRoom.jsx';

class PrivateRoom extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getRoomHistory = this.getRoomHistory.bind(this)

    this.handle
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    //this.socket = io('http://chat.jayop.com')
    //this.getRoomHistory()
    this.socket = io(URL.SOCKET_SERVER_URL)
    this.socket.on('message', message => {
      this.props.setPrivateRoom({ messages: [message, ...this.state.messages] })
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log('this is next prop', nextProps)
    this.setState({
      messages: nextProps.currentRoomStore.messages
      //messages: [nextProps.currentRoomStore.messages, ...this.state.messages]
    }, ()=> {
      console.log('this.state',this.state)
    })
  }
 
  getRoomHistory() {
    console.log('this is redux state before submit ===== ', this.props);

  }



  handleSubmit(event) {
    console.log('handleSubmit invoked')
    const text = event.target.value
    //console.log('this.props.currentUserStore.username', this.props.currentUserStore)
    if (event.keyCode === 13 && text) {
      var message = {
        
        from: this.props.currentUserStore.username,
        to: this.props.currentRoomStore.currentRoom,
        text: text
      }

      this.socket.emit('message', [message.from, message.text])
      console.log('to send', message)
      // axios.post(`${URL.SERVER_URL}/main/privateRoomStore`, message).then(function (response) {
      axios.post(`/main/privateRoomStore`, message).then(function (response) {
        console.log('add room success', response)
      })
      event.target.value = '';
      var context = this
      const getData = async () => {

        console.log('this.props.currentUserStore', context.props.currentUserStore)
        // const response = await axios.post(`${URL.SERVER_URL}/main/getPrivateRoomHistory`, {
        const response = await axios.post(`/main/getRooms`, {
          from: context.props.currentUserStore.username,
          to: context.props.currentRoomStore.currentRoom
        })
        await context.props.setPrivateRoom({
          currentUser: context.props.currentUserStore.username,
          currentRoom: context.props.currentRoomStore.currentRoom,
          messages: response.data.messages
        })

        console.log('response response response ===', response)
      }
      getData()
    }
  }


  render() {
    var messages = 'test'

    return (
      <div id="private_room">
        <div><h2>Private Room</h2></div>
        <p> Username: {this.props.currentRoomStore.currentUser} </p>
        <p> Room Name: {this.props.currentRoomStore.currentRoom} </p>
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
        {
          this.state.messages.length>0 ? 
            this.state.messages[0].map((message, index) => {
              return <li id="chat_list" key={index}><b>{message.from}:</b>{message.text}</li>
            }) : 'test'
          
        }
        <ul>{messages}</ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentRoomStore: state.currentRoomStore,
    currentUserStore: state.currentUserStore
  }
}

function matchDispatchToProps(dispatch) {
  // call selectUser in index.js
  return bindActionCreators({ setPrivateRoom: setPrivateRoom }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PrivateRoom);