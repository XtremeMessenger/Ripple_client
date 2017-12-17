import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux';

class YiYang extends Component {
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
      <div className="YiYang">
        This is YiYang Page
        <a href="https://drive.google.com/open?id=1GJNezOawJ6-e_PXhxYTG8P4sGTx7-diP">Resume</a>
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

export default connect(mapStateToProps)(YiYang);