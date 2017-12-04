import React, { Component } from 'react'
import axios from 'axios'
import {connect} from  'react-redux'


export default class FriendlistEntry extends Component {
    constructor(props){
        super(props)
        this.handleFriendClick = this.handleFriendClick.bind(this);
    }

handleFriendClick(e){
    console.log('you clicked friend ', this.props.friend)
    this.props.onClick(this.props.friend);
}


render() {
    return (
        <li onClick={this.handleFriendClick}> {this.props.id} : {this.props.friend} </li>
    )
}


}