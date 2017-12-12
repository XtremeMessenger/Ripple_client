import React, { Component } from 'react'
import axios from 'axios'
import {connect} from  'react-redux'
import AWS from 'aws-sdk';
import cfg from '../../config/S3key.js';
import URL from '../../config/url';
// import $ from 'jquery';



export default class FileListEntry extends Component {
    constructor(props){
        super(props)
        this.handleFileClick = this.handleFileClick.bind(this);
    }

handleFileClick(e){
    console.log('you clicked on a file ', this.props.file)
    this.props.onClick(this.props.file);

    axios.post(`${URL.LOCAL_SERVER_URL}/main/downloadFile`, this.props.file).then(function (response) {
      // axios.post(`/main/privateChatStore`, message).then(function (response) {
        console.log('downloadFile file data', response)
        axios.get(`${URL.LOCAL_SERVER_URL}/download`).then(function (response) {
          // axios.post(`/main/privateChatStore`, message).then(function (response) {
            console.log('download file data', response)
            window.open('/download')
        })
    })
    // AWS.config.update(
    //   {
    //     accessKeyId: cfg.aws_access_key_id,
    //     secretAccessKey: cfg.aws_secret_access_key
    //   }
    // );
    // var s3 = new AWS.S3();
    // var opgg = s3.getObject(
    //   { Bucket: "jayop", Key: 'index.html' },
    //   function (error, data) {
    //     if (error != null) {
    //       alert("Failed to retrieve an object: " + error);
    //     } else {
    //       console.log(' this is the data yo ' ,data)
    //       alert("Loaded " + data.ContentLength + " bytes");
    //       // do something with data.Body
          
    //     }
    //   }
    // );

    
}

componentWillMount(){
    console.log(' this.props.file ',this.props.file)
}

render() {
    //console.log('this is the sheeet props ', props)
    return (
        <li onClick={this.handleFileClick}> {this.props.id} : {this.props.file.fileName} </li>
    )
}


}