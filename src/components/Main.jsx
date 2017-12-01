import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Chat from '../containers/chat_container.jsx'
import Friendlist from '../containers/friendlist_container.jsx'
import Roomlist from '../containers/roomlist_container.jsx'
//import Userpannel from '../containers/userpannel_container.jsx'

import { FormGroup } from 'react-bootstrap'
import axios from 'axios'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <div className="main">
        This is Main Page
        <div><Chat /></div>
        <div><Friendlist /></div>
        <div><Roomlist /></div>
      </div>
    )
  }
}