import React from "react"
import { graphql } from "gatsby"
import {get} from 'lodash'
import SEO from '../components/seo'
import TopHeader from '../components/header'
import Post from '../components/post'
import Footer from "../components/footer"

export default ({data}) => {
    const postTitle = get(data, 'markdownRemark.frontmatter.title')
    const postDescription = get(data, 'markdownRemark.frontmatter.description')
    const postFeaturedImage = get(data, 'markdownRemark.frontmatter.featuredImage.publicURL')
    const siteTitle = get(data, 'site.siteMetadata.title')
    const siteDescription = get(data, 'site.siteMetadata.description')
    const meta=[
      {
        property: `og:type`,
        content: `article`,
      },
      {
        property: `og:image`,
        content: postFeaturedImage,
      },
    ]
    return (
      <div>
        <SEO title={postTitle} description={postDescription} meta={meta}/>
        <TopHeader siteTitle={siteTitle} />
        <Post data={data}/>
        <Footer siteTitle={siteTitle} siteDescription={siteDescription}/>
      </div>
    )
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      headings(depth: h6) {
        value
        depth
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        featuredImage {
          publicURL
        }
        description
      }
    }
  }
`