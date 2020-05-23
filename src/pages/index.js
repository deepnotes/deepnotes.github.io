import React from "react"
import get from 'lodash/get'
import PageTemplate from "../templates/page"
import Home from '../components/home'

class PageIndex extends React.Component {
  render() {
    const siteTitle       = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(this, 'props.data.site.siteMetadata.description')
    const posts           = get(this, 'props.data.allMarkdownRemark.edges')

    return (

      <PageTemplate 
        pageTitle={siteTitle} 
        siteTitle={siteTitle} 
        siteDescription={siteDescription}>
          <Home posts={posts}/>
      </PageTemplate>
    )
  }
}

export default PageIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            path
            tags
          }
        }
      }
    }
  }
`