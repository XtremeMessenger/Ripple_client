import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import AWS from 'aws-sdk';
// import AWSKEY from '../../../config/AWSKey.json'

// AWS.config.credentials = new AWS.CognitoIdentityCredentials(AWSKEY);
AWS.config.update({ region: 'us-east-1' });

class Lex extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.addtext = this.addtext.bind(this)
    this.state = {
      text: '',
    }
  }

  handleChange(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj, () => {
      // console.log('new state: ', this.state)
    });
  }

  addtext() {
    console.log('command to lex bot ===== ', this.state.text)
    // var lexruntime = new AWS.LexRuntime();
    // var params = {
    //   botAlias: '$LATEST', /* required, has to be '$LATEST' */
    //   botName: 'BOT', /* required, the name of you bot */
    //   inputText: this.state.text, /* required, your text */
    //   userId: 'USER', /* required, arbitrary identifier */
    //   sessionAttributes: {
    //     accessKeyId: AWSKEY.aws_access_key_id,
    //     secretAccessKey: AWSKEY.aws_secret_access_key
    //   }
    // };

    // lexruntime.postText(params, function (err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else console.log(data);           // successful response
    // });
  }

  render() {
    return (
      <div id="lex">
      <div className="lex">
        This is Lex Page
      </div>
      
      <label> Command: <input type="text" name="text" value={this.state.text} onChange={this.handleChange} /></label>
      <span><input type="submit" value="command" onClick={this.addtext} /></span>
      </div>
    )
  }
}

export default Lex;
