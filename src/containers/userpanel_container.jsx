import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap'

class UserPanel extends Component {
    constructor(props){
        super(props)
        
        this.state = {
        }
    }

    render(){
        // className="w3-panel w3-blue"
        return(
            <div  id="userinfo">
                <img src={this.props.currentUserStore.icon} width="100" height="100" />
                <p> Username: {this.props.currentUserStore.username} </p>
                {/* <p> Email: {this.props.currentUserStore.email} </p> */}
                <p> Hello, {this.props.currentUserStore.first} </p>
                <p> Quote: {this.props.currentUserStore.quote} </p>
                {/* <p> Icon Image </p> */}
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
      currentUserStore: state.currentUserStore
    }
  }

export default connect(mapStateToProps)(UserPanel);
  


