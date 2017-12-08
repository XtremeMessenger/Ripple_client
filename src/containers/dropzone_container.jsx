import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
import SocketIOFileUpload from 'socketio-file-upload';

class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount(){
    var socket = io.connect();
    var uploader = new SocketIOFileUpload(socket);
    uploader.listenOnInput(document.getElementById("siofu_input"));
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

export default Dropzone;