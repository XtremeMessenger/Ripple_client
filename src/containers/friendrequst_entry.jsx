import React, { Component } from 'react'
import axios from 'axios'
import {connect} from  'react-redux'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'


export default class FriendrequestEntry extends Component {
    constructor(props){
        super(props)
        this.handleReques = this.handleRequest.bind(this);
    }

    handleRequest(choice) {
        // console.log('you clicked request ', this.props.request.requestee)
        this.props.onClick(this.props.request, choice);
    }


render() {
    return (
        <div>
        <div>Request ID: {this.props.id}, Request From: {this.props.request.requestee} </div>
            <Button bsStyle="primary"
                onClick={(e) => this.handleRequest(true)}
            >ACCEPT
            </Button >
            <Button bsStyle="danger"
                onClick={(e) => this.handleRequest(false)}
            >REJECT
            </Button >

        </div>
    )
}


}
