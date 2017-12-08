import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'

class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <div className="dropzone">
        <h1>DROPZONE</h1>
      </div>
    )
  }
}

export default Dropzone;