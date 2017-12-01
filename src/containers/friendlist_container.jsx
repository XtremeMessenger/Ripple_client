import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'

class Friendlist extends Component {
  constructor(props) {
    super(props)
    this.handleFindFriend = this.handleFindFriend.bind(this);
    this.state = {

    }
  }
  handleFindFriend(){
    console.log(document.getElementById('friendSearchBar').value);
    let newFriend = document.getElementById('friendSearchBar').value;
    let currentUser = this.props.currentUserStore;
    console.log(' this is the current logged user ',currentUser)
    let friendRequest = {
      requestee: currentUser,
      requested: newFriend
    }
    axios.post('/addFriend', friendRequest)
  }

  render() {
    return (
      <div className="friendlist" id="friendsComponent">
        <h2>find friend</h2>
        <input id="friendSearchBar"></input>
        <button id="findFriendButton" onClick={this.handleFindFriend}>add</button>
        <div></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore
  }
}

export default Friendlist;