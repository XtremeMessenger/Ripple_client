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
        <li onClick={this.handleRoomClick}> {this.props.room.roomID}, Name: {this.props.room.roomname}, Owner: {this.props.room.owner} </li>
    )
}


}