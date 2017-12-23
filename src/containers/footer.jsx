import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ResumeLink from '../../public/resume/resume-link.js'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <div id="footer">
        {/* <Link to="/jay">Jay</Link>
        <Link to="/ruslan">Ruslan</Link>
        <Link to="/yiyang">YiYang</Link> */}
        <a href={ResumeLink.JAY}>JAY</a>
        <a href={ResumeLink.RUSLAN}>RUSLAN</a>
        <a href={ResumeLink.YIYANG}>YIYANG</a>
      </div>
    )
  }
}

export default Footer;