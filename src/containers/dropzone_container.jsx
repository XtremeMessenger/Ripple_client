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
    var socket = io.connect('http://localhost:3500');
    var uploader = new SocketIOFileUpload(socket);
    uploader.listenOnInput(document.getElementById("siofu_input"));

    uploader.addEventListener("complete", function(event){
      console.log('im sending this yo ',event.success);
      console.log('im sending this yo ',event.file);
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

export default Dropzone;