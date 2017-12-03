import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import axios from 'axios'
import {connect} from  'react-redux'

class Friendlist extends Component {
  constructor(props) {
    super(props)
    this.handleFindFriend = this.handleFindFriend.bind(this);
    this.state = {
      friendsArr: []
    }
  }

  componentDidMount(){
    var context = this;
    var friends = this.state.friendsArr.slice()
    //retrieve friends for current user
    var currentUser = this.props.currentUserStore
    let userRef = {
      user: currentUser
    }
    axios.post('/getFriends',userRef).then(function(response){
      console.log('this is getFriends response', response)
      response.data.forEach(function(friend){
        friends.push(friend)
      })
      context.setState({
        friendsArr: friends
      })
    })
    .catch(function(err){
      console.log('error in POST request to /getFriends', err)
    })

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
    axios.post('http://www.jayop.com:3000/main/addFriend', friendRequest)
  }
  render() {
    return (
      <div className="friendlist" id="friendsComponent">
        <h2>find friend</h2>
        <input id="friendSearchBar"></input>
        <button id="findFriendButton" onClick={this.handleFindFriend}>add</button>
        <div>
          My Friends: 
          <ul> {this.state.friendsArr.map(function(friend){
            return <li> {friend} </li>
          })} 
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUserStore: state.currentUserStore
  }
}

export default connect(mapStateToProps)(Friendlist);