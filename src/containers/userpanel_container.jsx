import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap'
// import { withRouter } from "react-router-dom";

// import { Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';
// import { Link } from 'react-router-dom';
// const history = createHashHistory()

class UserPanel extends Component {
    constructor(props){
        super(props)
        this.handleEditProfile = this.handleEditProfile.bind(this)
        this.state = {
        }
    }

    handleEditProfile() {
        // alert('edit profile button clicked')
        console.log('browserHistory', this.props.browserHistory)
        this.props.browserHistory.history.push('/login')
    }


    render(){
        return(
            <div className="w3-panel w3-blue">
                <img src={this.props.currentUserStore.icon} width="100" height="100" />
                <p> Username: {this.props.currentUserStore.username} </p>
                <p> Email: {this.props.currentUserStore.email} </p>
                <p> Hello, {this.props.currentUserStore.first} , {this.props.currentUserStore.last} </p>
                <p> Quote: {this.props.currentUserStore.quote} </p>
                <p> Icon Image </p>
                <Button bsStyle="warning" onClick={this.handleEditProfile}>EDIT USER PROFILE</Button >
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
      currentUserStore: state.currentUserStore,
      browserHistory: state.browserHistory
    }
  }

  export default connect(mapStateToProps)(UserPanel);
  


