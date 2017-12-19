import React, { Component } from 'react'
import axios from 'axios'
import {connect} from  'react-redux'
import AWS from 'aws-sdk';
import cfg from '../../config/S3key.js';
import URL from '../../config/url';
import PropTypes from 'prop-types'
// import $ from 'jquery';



export default class FileListEntry extends Component {
    constructor(props){
        super(props)
        this.handleFileClick = this.handleFileClick.bind(this);
    }

handleFileClick(e){
    console.log('you clicked on a file ', this.props.file)
    this.props.onClick(this.props.file);
    let contextOne = this.props.file;
    console.log('context one ', contextOne)
    axios.post(`${URL.LOCAL_SERVER_URL}/main/downloadFile`, this.props.file).then(function (response) {
      // axios.post(`/main/privateChatStore`, message).then(function (response) {
        let contextTwo = contextOne;
        console.log('context two', contextTwo);
        console.log('downloadFile file data', response);
        
        // setTimeout( ()=>{
            window.open(`/download/${contextTwo.fileName}`)
        // }, 3000)
        // axios.get(`/download/${contextTwo.fileName}`)
        // yolo
    })

    
    
}

componentWillMount(){
    console.log(' this.props.file ',this.props.file)
}

render() {
    //console.log('this is the sheeet props ', props)
    return (
        <li id="files" onClick={this.handleFileClick}> {this.props.id} : {this.props.file.fileName} </li>
        )
    }
}

FileListEntry.propTypes = {
    file: PropTypes.shape({
     fileName: PropTypes.string.isRequired
    })
  };

