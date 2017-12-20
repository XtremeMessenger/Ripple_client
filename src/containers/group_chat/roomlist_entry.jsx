import React, { Component } from 'react'
import axios from 'axios'
import {connect} from  'react-redux'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'



export default class RoomlistEntry extends Component {
    constructor(props){
        super(props)
        this.handleRoomClick = this.handleRoomClick.bind(this);
    }

handleRoomClick(e){
    console.log('you clicked room ', this.props.room)
    this.props.onClick(this.props.room);
}


render() {
    return (
        <button onClick={this.handleRoomClick}> <span id="common2">Name:</span> {this.props.room.roomname}, <span id="common2">Owner:</span> {this.props.room.owner} </button>
    )
}


}