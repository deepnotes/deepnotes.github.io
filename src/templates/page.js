import React from "react"
import SEO from "../components/seo"
import TopHeader from '../components/top-header'
import './page.css'
import Footer from "../footer"

export default (props) => {
  const { pageTitle, siteTitle, siteDescription, children } = props
  return (
    <div>
      <SEO title={pageTitle} />
      <div className="index" >
        <TopHeader siteTitle={siteTitle} />
        <div className="page-content">
          <div className="wrap">
            {children}
          </div>
        </div>
        {/* <Footer siteTitle={siteTitle} siteDescription={siteDescription}/> */}
      </div>
    </div>
  )
}
