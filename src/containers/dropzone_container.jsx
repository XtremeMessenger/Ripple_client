import React, { Component } from 'react'
// import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import SocketIOFileUpload from 'socketio-file-upload';
import URL from '../../config/url.js';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap';

class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount(){
    let currentUser = this.props.currentChatStore.currentUser;
    let currentFriend = this.props.currentChatStore.currentFriend;
    var socket = io.connect(URL.SOCKET_SERVER_URL);
    var uploader = new SocketIOFileUpload(socket);
    uploader.listenOnInput(document.getElementById("siofu_input"));

    uploader.addEventListener("complete", function(event){
      console.log('im sending this yo ',event.success);
      console.log('im sending this yo ',event.file);
      let fileNfo = {
        from: currentUser,
        to: currentFriend,
        fileName: 'waaazzzaaa'
      }
      axios.post(`${URL.LOCAL_SERVER_URL}/main/privateSendFile`, fileNfo).then(function (response) {
        // axios.post(`/main/privateChatStore`, message).then(function (response) {
          console.log('file record nfo', response)
        })
    });
  }
  render() {
    return (
      <div className="dropzone">
        <h1>DROPZONE</h1>
        <input type="file" id="siofu_input"></input>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChatStore: state.currentChatStore
  }
}

export default connect(mapStateToProps)(Dropzone);