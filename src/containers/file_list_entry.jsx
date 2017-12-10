import React, { Component } from 'react'
import axios from 'axios'
import {connect} from  'react-redux'
import AWS from 'aws-sdk';

export default class FileListEntry extends Component {
    constructor(props){
        super(props)
        this.handleFileClick = this.handleFileClick.bind(this);
    }

handleFileClick(e){
    console.log('you clicked on a file ', this.props.file)
    this.props.onClick(this.props.file);

    
    AWS.config.update(
      {
        accessKeyId: ".. your key ..",
        secretAccessKey: ".. your secret key ..",
      }
    );
    var s3 = new AWS.S3();
    s3.getObject(
      { Bucket: "jayop", Key: this.props.file.fileName },
      function (error, data) {
        if (error != null) {
          alert("Failed to retrieve an object: " + error);
        } else {
          alert("Loaded " + data.ContentLength + " bytes");
          // do something with data.Body
        }
      }
    );
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