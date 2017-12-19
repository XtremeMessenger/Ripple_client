import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import URL from '../../../config/personal/jay/url.js'

class Jay extends Component {
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
      <div className="jay">
        This is Jay Page
        {/* <a href={URL.RESUME}>Resume</a> */}
        <Button bsStyle="warning" onClick={this.handleRetuen}>RETURN</Button >
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    browserHistory: state.browserHistory
  }
}

export default connect(mapStateToProps)(Jay);