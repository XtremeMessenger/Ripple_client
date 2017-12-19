'use strict';


import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrivateChatBox from '../containers/private_chatbox.jsx'
import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';

import io from 'socket.io-client'
// import URL from '../../config/url.js'
import 'webrtc-adapter';
import PropTypes from 'prop-types'



import Dropzone from '../containers/dropzone_container.jsx'

class Video extends Component {
  constructor(props) {
    super(props)
    this.handleCloseVideo = this.handleCloseVideo.bind(this)
    this.handleVideoClick = this.handleVideoClick.bind(this)
    this.handleHangUp = this.handleHangUp.bind(this)

    this.state = {

    }
  }

  componentDidMount() {
    console.log('inside video.jsx', this.props.currentChatStore.messages)
    // this.socket = io(URL.SOCKET_SERVER_URL);
    // this.socket.on('message', message => {
    //   this.setState({ messages: [message, ...this.state.messages] },
    //     () => { console.log('this.setstate by socket io', this.state.messages) })
    // })
    this.props.currentChatStore.currentUser
    this.props.currentChatStore.currentFriend

    //draggable elements
    dragElement(document.getElementById(("remoteVideo")));
    dragElement(document.getElementById(("localVideo")));
    
    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    
  }

  handleCloseVideo() {
    this.props.history.push('/main');
  }

  handleVideoClick(){
    
        var isChannelReady = false;
        var isInitiator = false;
        var isStarted = false;
        var localStream;
        var pc;
        var remoteStream;
        var turnReady;
        
        var pcConfig = {
          'iceServers': [{
            'urls': 'stun:stun.l.google.com:19302'
          }]
        };
        
        // Set up audio and video regardless of what devices are present.
        var sdpConstraints = {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        };
        
        window.room = prompt("Enter room name:");
        var isInitiator;
        var socket = io.connect("http://localhost:3500");
        if(room === ""){
          alert('Please enter valid room name')
          return;
        }
        
        if (room === null){
          alert('Please enter valid room name')
          return;
        }
        
        if (room !== "" || null) {
          console.log('Message from client: Asking to join room ' + room);
          socket.emit('create or join', room);
        }
    
        socket.on('created', function(room, clientId) {
          console.log('Created room ' + room);
          
          isInitiator = true;
        });
    
        socket.on('full', function(room) {
          console.log('Message from client: Room ' + room + ' is full :^(');
        });
    
        socket.on('ipaddr', function(ipaddr) {
          console.log('Message from client: Server IP address is ' + ipaddr);
        });
    
        socket.on('join', function (room){
          console.log('Another peer made a request to join room ' + room);
          console.log('This peer is the initiator of room ' + room + '!');
          isChannelReady = true;
        });
        
        socket.on('joined', function(room) {
          console.log('joined: ' + room);
          isChannelReady = true;
        });
        
    
          function sendMessage(message) {
            console.log('Client sending message: ', message);
            socket.emit('message', message);
          }
    
          // This client receives a message
          socket.on('message', function(message) {
            console.log('Client received message:', message);
            if (message === 'got user media') {
              maybeStart();
            } else if (message.type === 'offer') {
              if (!isInitiator && !isStarted) {
                maybeStart();
              }
              pc.setRemoteDescription(new RTCSessionDescription(message));
              doAnswer();
            } else if (message.type === 'answer' && isStarted) {
              pc.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate' && isStarted) {
              var candidate = new RTCIceCandidate({
                sdpMLineIndex: message.label,
                candidate: message.candidate
              });
              pc.addIceCandidate(candidate);
            } else if (message === 'bye' && isStarted) {
              handleRemoteHangup();
            }
          });
    
          ////////////////////////////////////////////////////
    
    
       // navigator.getUserMedia = navigator.getUserMedia ||
       // navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
        var constraints = {
          audio: false,
          video: true
        };
        
        let localVideo = document.getElementById('localVideo');    
        let remoteVideo = document.getElementById('remoteVideo');
        
    
        console.log('before navigator.mediaDevices.getUserMedia')

        if(room!== null || ""){
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          })
          .then(gotStream)
          .catch(function(e) {
            alert('getUserMedia() error: ' + e.name);
          });
        }
        function gotStream(stream) {
          console.log('Adding local stream.');
          localVideo.src = window.URL.createObjectURL(stream);
          localStream = stream;
          sendMessage('got user media');
          if (isInitiator) {
            maybeStart();
          }
        }    
    
    
          var constraints = {
            video: true
          };
    
          console.log('Getting user media with constraints', constraints);
    
          //if (location.hostname !== 'localhost') {
          //  console.log('not local host')
          //  requestTurn(
          //    'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
          //  );
         // }
        function maybeStart() {
        console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
        if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
          console.log('>>>>>> creating peer connection');
          createPeerConnection();
          pc.addStream(localStream);
          isStarted = true;
          console.log('isInitiator', isInitiator);
          if (isInitiator) {
            doCall();
          }
        }
      }
    
    
    
      window.onbeforeunload = function() {
        sendMessage('bye');
      };
        
    
    
    /////////////////////////////////////////////////////////
    
          function createPeerConnection() {
            try {
              pc = new RTCPeerConnection(null);
              pc.onicecandidate = handleIceCandidate;
              pc.onaddstream = handleRemoteStreamAdded;
              pc.onremovestream = handleRemoteStreamRemoved;
              console.log('Created RTCPeerConnnection');
            } catch (e) {
              console.log('Failed to create PeerConnection, exception: ' + e.message);
              alert('Cannot create RTCPeerConnection object.');
              return;
            }
          }
    
          function handleIceCandidate(event) {
            console.log('icecandidate event: ', event);
            if (event.candidate) {
              sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
              });
            } else {
              console.log('End of candidates.');
            }
          }
    
          function handleRemoteStreamAdded(event) {
            console.log('Remote stream added.');
            remoteVideo.src = window.URL.createObjectURL(event.stream);
            remoteStream = event.stream;
          }
    
          function handleCreateOfferError(event) {
            console.log('createOffer() error: ', event);
          }
    
          function doCall() {
            console.log('Sending offer to peer');
            pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
          }
    
          function doAnswer() {
            console.log('Sending answer to peer.');
            pc.createAnswer().then(
              setLocalAndSendMessage,
              onCreateSessionDescriptionError
            );
          }
    
          function setLocalAndSendMessage(sessionDescription) {
            // Set Opus as the preferred codec in SDP if Opus is present.
            //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
            pc.setLocalDescription(sessionDescription);
            console.log('setLocalAndSendMessage sending message', sessionDescription);
            sendMessage(sessionDescription);
          }
    
          function onCreateSessionDescriptionError(error) {
            trace('Failed to create session description: ' + error.toString());
          }
    
          function requestTurn(turnURL) {
            var turnExists = false;
            for (var i in pcConfig.iceServers) {
              if (pcConfig.iceServers[i].url.substr(0, 5) === 'turn:') {
                turnExists = true;
                turnReady = true;
                break;
              }
            }
            if (!turnExists) {
              console.log('Getting TURN server from ', turnURL);
              // No TURN server. Get one from computeengineondemand.appspot.com:
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  var turnServer = JSON.parse(xhr.responseText);
                  console.log('Got TURN server: ', turnServer);
                  pcConfig.iceServers.push({
                    'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
                    'credential': turnServer.password
                  });
                  turnReady = true;
                }
              };
              xhr.open('GET', turnURL, true);
              xhr.send();
            }
          }
    
          function handleRemoteStreamAdded(event) {
            console.log('Remote stream added.');
            remoteVideo.src = window.URL.createObjectURL(event.stream);
            remoteStream = event.stream;
          }
    
          function handleRemoteStreamRemoved(event) {
            console.log('Remote stream removed. Event: ', event);
          }
    
          function hangup() {
            console.log('Hanging up.');
            stop();
            sendMessage('bye');
          }
    
          function handleRemoteHangup() {
            console.log('Session terminated.');
            stop();
            isInitiator = false;
          }
    
          function stop() {
            isStarted = false;
            // isAudioMuted = false;
            // isVideoMuted = false;
            pc.close();
            pc = null;
          }
    
          ///////////////////////////////////////////
    
          // Set Opus as the default audio codec if it's present.
          function preferOpus(sdp) {
            var sdpLines = sdp.split('\r\n');
            var mLineIndex;
            // Search for m line.
            for (var i = 0; i < sdpLines.length; i++) {
              if (sdpLines[i].search('m=audio') !== -1) {
                mLineIndex = i;
                break;
              }
            }
            if (mLineIndex === null) {
              return sdp;
            }
    
            // If Opus is available, set it as the default in m line.
            for (i = 0; i < sdpLines.length; i++) {
              if (sdpLines[i].search('opus/48000') !== -1) {
                var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
                if (opusPayload) {
                  sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex],
                    opusPayload);
                }
                break;
              }
            }
    
            // Remove CN in m line and sdp.
            sdpLines = removeCN(sdpLines, mLineIndex);
    
            sdp = sdpLines.join('\r\n');
            return sdp;
          }
    
          function extractSdp(sdpLine, pattern) {
            var result = sdpLine.match(pattern);
            return result && result.length === 2 ? result[1] : null;
          }
    
          // Set the selected codec to the first in m line.
          function setDefaultCodec(mLine, payload) {
            var elements = mLine.split(' ');
            var newLine = [];
            var index = 0;
            for (var i = 0; i < elements.length; i++) {
              if (index === 3) { // Format of media starts from the fourth.
                newLine[index++] = payload; // Put target payload to the first.
              }
              if (elements[i] !== payload) {
                newLine[index++] = elements[i];
              }
            }
            return newLine.join(' ');
          }
    
          // Strip CN from sdp before CN constraints is ready.
          function removeCN(sdpLines, mLineIndex) {
            var mLineElements = sdpLines[mLineIndex].split(' ');
            // Scan from end for the convenience of removing an item.
            for (var i = sdpLines.length - 1; i >= 0; i--) {
              var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
              if (payload) {
                var cnPos = mLineElements.indexOf(payload);
                if (cnPos !== -1) {
                  // Remove CN payload from m line.
                  mLineElements.splice(cnPos, 1);
                }
                // Remove CN line in sdp
                sdpLines.splice(i, 1);
              }
            }
    
            sdpLines[mLineIndex] = mLineElements.join(' ');
            return sdpLines;
          }
      }

  handleHangUp(){
    let localVideo = document.getElementById('localVideo');    
    let remoteVideo = document.getElementById('remoteVideo');
    let stream = localVideo.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function(track) {
      track.stop();
    });
  
    localVideo.srcObject = null;
  
    localVideo.src = null;
    remoteVideo.src = null;

  }
    
    


  render() {
    let context = this
    return (
      <div className="video">
        <div className="video-container">
          <video id="remoteVideo" width="580" height="400"autoPlay></video>
          <video id="localVideo" muted="muted" width="200" height="180" autoPlay></video>
        </div>
          <div className="startcall">
            <button id="startButton" onClick={this.handleVideoClick}>Start Call</button>
            <button id="hangupButton" onClick={this.handleHangUp}>Hang Up</button>
            <button id="closeVideoButton" onClick={this.handleCloseVideo}>Back to Main</button>
        </div>
        <div><PrivateChatBox /></div>
        <div id="dropzone"><Dropzone /></div>
      </div>
    )
  }
}

Video.propTypes = {
  currentChatStore: PropTypes.shape({
   messages: PropTypes.array.isRequired,
   currentUser: PropTypes.string.isRequired,
   currentFriend: PropTypes.string.isRequired
  }),
  currentUserStore: PropTypes.shape({
    username: PropTypes.string.isRequired
  }),
  currentChatView: PropTypes.number.isRequired

};


function mapStateToProps(state) {
  return {
    currentChatStore: state.currentChatStore,
    currentUserStore: state.currentUserStore,
    currentChatView: state.currentChatView
  }
}

// function matchDispatchToProps(dispatch) {
//   // call selectUser in index.js
//   return bindActionCreators(
//     {
//       setPrivateChat: setPrivateChat,
//       setCurrentChatView: setCurrentChatView
//     }, dispatch)
// }

export default connect(mapStateToProps)(Video);
