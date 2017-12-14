'use strict';


import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPrivateChat } from '../actions/setPrivateChat.jsx';
import { setCurrentChatView } from '../actions/setCurrentChatView.jsx';

import io from 'socket.io-client'
import URL from '../../config/url.js'
import 'webrtc-adapter';
//import {getHTMLMediaElement} from '../../node_modules/rtcmulticonnection-v3/dev/getHTMLMediaElement.js';
import Script from 'react-load-script'


class VideoConference extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    startConference(){

        function getHTMLMediaElement(mediaElement, config) {
            config = config || {};
        
            if (!mediaElement.nodeName || (mediaElement.nodeName.toLowerCase() != 'audio' && mediaElement.nodeName.toLowerCase() != 'video')) {
                if (!mediaElement.getVideoTracks().length) {
                    return getAudioElement(mediaElement, config);
                }
        
                var mediaStream = mediaElement;
                mediaElement = document.createElement(mediaStream.getVideoTracks().length ? 'video' : 'audio');
                mediaElement[!!navigator.mozGetUserMedia ? 'mozSrcObject' : 'src'] = !!navigator.mozGetUserMedia ? mediaStream : window.webkitURL.createObjectURL(mediaStream);
            }
        
            if (mediaElement.nodeName && mediaElement.nodeName.toLowerCase() == 'audio') {
                return getAudioElement(mediaElement, config);
            }
        
            mediaElement.controls = false;
        
            var buttons = config.buttons || ['mute-audio', 'mute-video', 'full-screen', 'volume-slider', 'stop'];
            buttons.has = function(element) {
                return buttons.indexOf(element) !== -1;
            };
        
            config.toggle = config.toggle || [];
            config.toggle.has = function(element) {
                return config.toggle.indexOf(element) !== -1;
            };
        
            var mediaElementContainer = document.createElement('div');
            mediaElementContainer.className = 'media-container';
        
            var mediaControls = document.createElement('div');
            mediaControls.className = 'media-controls';
            mediaElementContainer.appendChild(mediaControls);
        
            if (buttons.has('mute-audio')) {
                var muteAudio = document.createElement('div');
                muteAudio.className = 'control ' + (config.toggle.has('mute-audio') ? 'unmute-audio selected' : 'mute-audio');
                mediaControls.appendChild(muteAudio);
        
                muteAudio.onclick = function() {
                    if (muteAudio.className.indexOf('unmute-audio') != -1) {
                        muteAudio.className = muteAudio.className.replace('unmute-audio selected', 'mute-audio');
                        mediaElement.muted = false;
                        mediaElement.volume = 1;
                        if (config.onUnMuted) config.onUnMuted('audio');
                    } else {
                        muteAudio.className = muteAudio.className.replace('mute-audio', 'unmute-audio selected');
                        mediaElement.muted = true;
                        mediaElement.volume = 0;
                        if (config.onMuted) config.onMuted('audio');
                    }
                };
            }
        
            if (buttons.has('mute-video')) {
                var muteVideo = document.createElement('div');
                muteVideo.className = 'control ' + (config.toggle.has('mute-video') ? 'unmute-video selected' : 'mute-video');
                mediaControls.appendChild(muteVideo);
        
                muteVideo.onclick = function() {
                    if (muteVideo.className.indexOf('unmute-video') != -1) {
                        muteVideo.className = muteVideo.className.replace('unmute-video selected', 'mute-video');
                        mediaElement.muted = false;
                        mediaElement.volume = 1;
                        mediaElement.play();
                        if (config.onUnMuted) config.onUnMuted('video');
                    } else {
                        muteVideo.className = muteVideo.className.replace('mute-video', 'unmute-video selected');
                        mediaElement.muted = true;
                        mediaElement.volume = 0;
                        mediaElement.pause();
                        if (config.onMuted) config.onMuted('video');
                    }
                };
            }
        
            if (buttons.has('take-snapshot')) {
                var takeSnapshot = document.createElement('div');
                takeSnapshot.className = 'control take-snapshot';
                mediaControls.appendChild(takeSnapshot);
        
                takeSnapshot.onclick = function() {
                    if (config.onTakeSnapshot) config.onTakeSnapshot();
                };
            }
        
            if (buttons.has('stop')) {
                var stop = document.createElement('div');
                stop.className = 'control stop';
                mediaControls.appendChild(stop);
        
                stop.onclick = function() {
                    mediaElementContainer.style.opacity = 0;
                    setTimeout(function() {
                        if (mediaElementContainer.parentNode) {
                            mediaElementContainer.parentNode.removeChild(mediaElementContainer);
                        }
                    }, 800);
                    if (config.onStopped) config.onStopped();
                };
            }
        
            var volumeControl = document.createElement('div');
            volumeControl.className = 'volume-control';
        
            if (buttons.has('record-audio')) {
                var recordAudio = document.createElement('div');
                recordAudio.className = 'control ' + (config.toggle.has('record-audio') ? 'stop-recording-audio selected' : 'record-audio');
                volumeControl.appendChild(recordAudio);
        
                recordAudio.onclick = function() {
                    if (recordAudio.className.indexOf('stop-recording-audio') != -1) {
                        recordAudio.className = recordAudio.className.replace('stop-recording-audio selected', 'record-audio');
                        if (config.onRecordingStopped) config.onRecordingStopped('audio');
                    } else {
                        recordAudio.className = recordAudio.className.replace('record-audio', 'stop-recording-audio selected');
                        if (config.onRecordingStarted) config.onRecordingStarted('audio');
                    }
                };
            }
        
            if (buttons.has('record-video')) {
                var recordVideo = document.createElement('div');
                recordVideo.className = 'control ' + (config.toggle.has('record-video') ? 'stop-recording-video selected' : 'record-video');
                volumeControl.appendChild(recordVideo);
        
                recordVideo.onclick = function() {
                    if (recordVideo.className.indexOf('stop-recording-video') != -1) {
                        recordVideo.className = recordVideo.className.replace('stop-recording-video selected', 'record-video');
                        if (config.onRecordingStopped) config.onRecordingStopped('video');
                    } else {
                        recordVideo.className = recordVideo.className.replace('record-video', 'stop-recording-video selected');
                        if (config.onRecordingStarted) config.onRecordingStarted('video');
                    }
                };
            }
        
            if (buttons.has('volume-slider')) {
                var volumeSlider = document.createElement('div');
                volumeSlider.className = 'control volume-slider';
                volumeControl.appendChild(volumeSlider);
        
                var slider = document.createElement('input');
                slider.type = 'range';
                slider.min = 0;
                slider.max = 100;
                slider.value = 100;
                slider.onchange = function() {
                    mediaElement.volume = '.' + slider.value.toString().substr(0, 1);
                };
                volumeSlider.appendChild(slider);
            }
        
            if (buttons.has('full-screen')) {
                var zoom = document.createElement('div');
                zoom.className = 'control ' + (config.toggle.has('zoom-in') ? 'zoom-out selected' : 'zoom-in');
        
                if (!slider && !recordAudio && !recordVideo && zoom) {
                    mediaControls.insertBefore(zoom, mediaControls.firstChild);
                } else volumeControl.appendChild(zoom);
        
                zoom.onclick = function() {
                    if (zoom.className.indexOf('zoom-out') != -1) {
                        zoom.className = zoom.className.replace('zoom-out selected', 'zoom-in');
                        exitFullScreen();
                    } else {
                        zoom.className = zoom.className.replace('zoom-in', 'zoom-out selected');
                        launchFullscreen(mediaElementContainer);
                    }
                };
        
                function launchFullscreen(element) {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                }
        
                function exitFullScreen() {
                    if (document.fullscreen) {
                        document.cancelFullScreen();
                    }
        
                    if (document.mozFullScreen) {
                        document.mozCancelFullScreen();
                    }
        
                    if (document.webkitIsFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
        
                function screenStateChange(e) {
                    if (e.srcElement != mediaElementContainer) return;
        
                    var isFullScreeMode = document.webkitIsFullScreen || document.mozFullScreen || document.fullscreen;
        
                    mediaElementContainer.style.width = (isFullScreeMode ? (window.innerWidth - 20) : config.width) + 'px';
                    mediaElementContainer.style.display = isFullScreeMode ? 'block' : 'inline-block';
        
                    if (config.height) {
                        mediaBox.style.height = (isFullScreeMode ? (window.innerHeight - 20) : config.height) + 'px';
                    }
        
                    if (!isFullScreeMode && config.onZoomout) config.onZoomout();
                    if (isFullScreeMode && config.onZoomin) config.onZoomin();
        
                    if (!isFullScreeMode && zoom.className.indexOf('zoom-out') != -1) {
                        zoom.className = zoom.className.replace('zoom-out selected', 'zoom-in');
                        if (config.onZoomout) config.onZoomout();
                    }
                    setTimeout(adjustControls, 1000);
                }
        
                document.addEventListener('fullscreenchange', screenStateChange, false);
                document.addEventListener('mozfullscreenchange', screenStateChange, false);
                document.addEventListener('webkitfullscreenchange', screenStateChange, false);
            }
        
            if (buttons.has('volume-slider') || buttons.has('full-screen') || buttons.has('record-audio') || buttons.has('record-video')) {
                mediaElementContainer.appendChild(volumeControl);
            }
        
            var mediaBox = document.createElement('div');
            mediaBox.className = 'media-box';
            mediaElementContainer.appendChild(mediaBox);
        
            mediaBox.appendChild(mediaElement);
        
            if (!config.width) config.width = (innerWidth / 2) - 50;
        
            mediaElementContainer.style.width = config.width + 'px';
        
            if (config.height) {
                mediaBox.style.height = config.height + 'px';
            }
        
            mediaBox.querySelector('video').style.maxHeight = innerHeight + 'px';
        
            var times = 0;
        
            function adjustControls() {
                mediaControls.style.marginLeft = (mediaElementContainer.clientWidth - mediaControls.clientWidth - 2) + 'px';
        
                if (slider) {
                    slider.style.width = (mediaElementContainer.clientWidth / 3) + 'px';
                    volumeControl.style.marginLeft = (mediaElementContainer.clientWidth / 3 - 30) + 'px';
        
                    if (zoom) zoom.style['border-top-right-radius'] = '5px';
                } else {
                    volumeControl.style.marginLeft = (mediaElementContainer.clientWidth - volumeControl.clientWidth - 2) + 'px';
                }
        
                volumeControl.style.marginTop = (mediaElementContainer.clientHeight - volumeControl.clientHeight - 2) + 'px';
        
                if (times < 10) {
                    times++;
                    setTimeout(adjustControls, 1000);
                } else times = 0;
            }
        
            if (config.showOnMouseEnter || typeof config.showOnMouseEnter === 'undefined') {
                mediaElementContainer.onmouseenter = mediaElementContainer.onmousedown = function() {
                    adjustControls();
                    mediaControls.style.opacity = 1;
                    volumeControl.style.opacity = 1;
                };
        
                mediaElementContainer.onmouseleave = function() {
                    mediaControls.style.opacity = 0;
                    volumeControl.style.opacity = 0;
                };
            } else {
                setTimeout(function() {
                    adjustControls();
                    setTimeout(function() {
                        mediaControls.style.opacity = 1;
                        volumeControl.style.opacity = 1;
                    }, 300);
                }, 700);
            }
        
            adjustControls();
        
            mediaElementContainer.toggle = function(clasName) {
                if (typeof clasName != 'string') {
                    for (var i = 0; i < clasName.length; i++) {
                        mediaElementContainer.toggle(clasName[i]);
                    }
                    return;
                }
        
                if (clasName == 'mute-audio' && muteAudio) muteAudio.onclick();
                if (clasName == 'mute-video' && muteVideo) muteVideo.onclick();
        
                if (clasName == 'record-audio' && recordAudio) recordAudio.onclick();
                if (clasName == 'record-video' && recordVideo) recordVideo.onclick();
        
                if (clasName == 'stop' && stop) stop.onclick();
        
                return this;
            };
        
            mediaElementContainer.media = mediaElement;
        
            return mediaElementContainer;
        }

        document.getElementById('open-room').onclick = function() {
            disableInputButtons();
            connection.open(document.getElementById('room-id').value, function() {
                showRoomURL(connection.sessionid);
            });
        };
        document.getElementById('join-room').onclick = function() {
            disableInputButtons();
            connection.join(document.getElementById('room-id').value);
        };
        document.getElementById('open-or-join-room').onclick = function() {
            disableInputButtons();
            connection.openOrJoin(document.getElementById('room-id').value, function(isRoomExist, roomid) {
                if (!isRoomExist) {
                    showRoomURL(roomid);
                }
            });
        };
        // ......................................................
        // ..................RTCMultiConnection Code.............
        // ......................................................
        var connection = new RTCMultiConnection();
        // by default, socket.io server is assumed to be deployed on your own URL
        connection.socketURL = 'http://localhost:3500';
        // comment-out below line if you do not have your own socket.io server
        // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
        connection.socketMessageEvent = 'video-conference-demo';
        connection.session = {
            audio: true,
            video: true
        };
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        connection.videosContainer = document.getElementById('videos-container');
        connection.onstream = function(event) {
            var existing = document.getElementById(event.streamid);
            if(existing && existing.parentNode) {
              existing.parentNode.removeChild(existing);
            }
            event.mediaElement.removeAttribute('src');
            event.mediaElement.removeAttribute('srcObject');
            var video = document.createElement('video');
            video.controls = true;
            if(event.type === 'local') {
                video.muted = true;
            }
            video.srcObject = event.stream;
            var width = parseInt(connection.videosContainer.clientWidth / 2) - 20;
            var mediaElement = getHTMLMediaElement(video, {
                title: event.userid,
                buttons: ['full-screen'],
                width: width,
                showOnMouseEnter: false
            });
            connection.videosContainer.appendChild(mediaElement);
            setTimeout(function() {
                mediaElement.media.play();
            }, 5000);
            mediaElement.id = event.streamid;
        };
        connection.onstreamended = function(event) {
            var mediaElement = document.getElementById(event.streamid);
            if (mediaElement) {
                mediaElement.parentNode.removeChild(mediaElement);
            }
        };
        function disableInputButtons() {
            document.getElementById('open-or-join-room').disabled = true;
            document.getElementById('open-room').disabled = true;
            document.getElementById('join-room').disabled = true;
            document.getElementById('room-id').disabled = true;
        }
        // ......................................................
        // ......................Handling Room-ID................
        // ......................................................
        function showRoomURL(roomid) {
            var roomHashURL = '#' + roomid;
            var roomQueryStringURL = '?roomid=' + roomid;
            var html = '<h2>Unique URL for your room:</h2><br>';
            html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
            html += '<br>';
            html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';
            var roomURLsDiv = document.getElementById('room-urls');
            roomURLsDiv.innerHTML = html;
            roomURLsDiv.style.display = 'block';
        }
        (function() {
            var params = {},
                r = /([^&=]+)=?([^&]*)/g;
            function d(s) {
                return decodeURIComponent(s.replace(/\+/g, ' '));
            }
            var match, search = window.location.search;
            while (match = r.exec(search.substring(1)))
                params[d(match[1])] = d(match[2]);
            window.params = params;
        })();
        var roomid = '';
        if (localStorage.getItem(connection.socketMessageEvent)) {
            roomid = localStorage.getItem(connection.socketMessageEvent);
        } else {
            roomid = connection.token();
        }
        document.getElementById('room-id').value = roomid;
        document.getElementById('room-id').onkeyup = function() {
            localStorage.setItem(connection.socketMessageEvent, this.value);
        };
        var hashString = location.hash.replace('#', '');
        if (hashString.length && hashString.indexOf('comment-') == 0) {
            hashString = '';
        }
        var roomid = params.roomid;
        if (!roomid && hashString.length) {
            roomid = hashString;
        }
        if (roomid && roomid.length) {
            document.getElementById('room-id').value = roomid;
            localStorage.setItem(connection.socketMessageEvent, roomid);
            // auto-join-room
            (function reCheckRoomPresence() {
                connection.checkPresence(roomid, function(isRoomExist) {
                    if (isRoomExist) {
                        connection.join(roomid);
                        return;
                    }
                    setTimeout(reCheckRoomPresence, 5000);
                });
            })();
            disableInputButtons();
        }
    }

    componentDidMount() {
        console.log('video conference component mounted')
    }

    handleScriptError(){
        console.log('error loading script')
    }
        
    

      render(){
          return (
            <div>
            
            <Script
            url="https://cdn.webrtc-experiment.com/RTCMultiConnection.js"
            onLoad={this.startConference.bind(this)}
            onError={this.handleScriptError.bind(this)} />
      

  <section className="make-center">
  <input type="text" id="room-id" placeholder="abcdef" />
  <button id="open-room">Open Room</button>
  <button id="join-room">Join Room</button>
  <button id="open-or-join-room">Auto Open Or Join Room</button>

  <div id="room-urls"></div>

  <div id="videos-container"></div>
</section>

<script src="https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js"></script>
<script src="/dev/getHTMLMediaElement.js"></script>
<script src="/dev/adapter.js"></script>
<script src="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js"></script>
</div>            

          )
      }


}

function mapStateToProps(state) {
    return {
      currentChatStore: state.currentChatStore,
      currentUserStore: state.currentUserStore,
      currentChatView: state.currentChatView
    }
  }

  export default connect(mapStateToProps)(VideoConference);
  
    