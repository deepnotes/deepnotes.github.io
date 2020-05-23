/**
 * Author: Noi Truong <noitq.hust@gmail.com>
 */
import React from 'react'
import {Link} from 'gatsby'
import './style.css'

class SideHeader extends React.Component {
  render() {
    return (
      <header id="user_top">
        <figure id="user_logo"
          className="active" >
          <Link to="/" > </Link>
        </figure>

        <h2 > < Link to="/" > {this.props.siteTitle} </Link></h2 >
        <h3 > {this.props.siteDescription} </h3>
        <div className="header-top" >
          {/* <a href="/rss.xml"
            rel="noopener noreferrer"
            target="blank" > RSS </a> */}
          <a href="https://ko-fi.com/hocmachinelearning" target="blank" > Buy me a coffee </a>
        </div>
      </header>
    )
  }
}

export default SideHeader