import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import URL from '../../../config/personal/ruslan/url.js'
import { Route, Redirect } from 'react-router'

class Ruslan extends Component {
  constructor(props) {
    super(props)
    this.handleRetuen = this.handleRetuen.bind(this)
    this.state = {

    }
  }

  handleRetuen() {
    this.props.browserHistory.history.push('/main')
  }

  render() {
    return (
      <div className="Ruslan">
        <div>{this.props.currentUserStore.username ? null : <Redirect to="/main" />}</div>
        This is Ruslan Page
        <a href={URL.RESUME}>Resume</a>
        <Button bsStyle="warning" onClick={this.handleRetuen}>RETURN</Button >
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

export default connect(mapStateToProps)(Ruslan);