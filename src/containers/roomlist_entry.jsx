import React, { Component } from 'react'
import axios from 'axios'
import {connect} from  'react-redux'


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
        <li onClick={this.handleRoomClick}> {this.props.id} : {this.props.room} </li>
    )
}


}