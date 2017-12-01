import React, { Component } from 'react'
import {connect} from 'react-redux';


class UserPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgsrc : ''
        }
    }


    componentDidMount(){
        var context = this;
        console.log('user panel this props', this.props.currentUserStore)
        this.setState({
            imgsrc: context.props.currentUserStore.icon
        })
    }

    render(){
        return(
            <div className="w3-panel w3-blue">
                <img src={this.state.imgsrc} width="100" height="100" />
                <p> Username: {this.props.currentUserStore.username} </p>
                <p> Email: {this.props.currentUserStore.email} </p>
                <p> Hello, {this.props.currentUserStore.first} , {this.props.currentUserStore.last} </p>
                <p> Quote: {this.props.currentUserStore.quote} </p>
                <p> Icon Image </p>
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
  


