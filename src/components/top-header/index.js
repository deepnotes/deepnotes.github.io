import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from "../../../content/assets/logo.png"
import './style.css'


const TopHeader = ({ siteTitle }) => (
  <header class="site-header">

    <div class="wrap">

      <div style={{float:'left', marginTop:10, marginRight:10}}>
        <a href="/feed.xml">
          <img style={{ maxHeight: 40, maxWidth: 76 }} src={Logo} alt="logo" />
        </a>
      </div>
      <a class="site-title" href="/">{siteTitle}</a>
      <nav class="site-nav">
        <a href="#" class="menu-icon">
        </a>
        <div class="trigger">
          <a class="page-link" href="/about/">About</a>
        </div>
      </nav>
    </div>

  </header>
)

TopHeader.propTypes = {
  siteTitle: PropTypes.string,
}

TopHeader.defaultProps = {
  siteTitle: ``,
}

export default TopHeader
