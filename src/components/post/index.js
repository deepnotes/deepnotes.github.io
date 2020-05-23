/**
 * Author: Noi Truong <noitq.hust@gmail.com>
 */

import React from 'react'
import { Link } from "gatsby"
import './style.css'

export default ({ data }) => {

  const { markdownRemark } = data
  if (!markdownRemark)
    return null;

  const { frontmatter, html, headings } = markdownRemark

  let h2Headings = headings ? headings.filter(h => h.depth === 2) : []
  const { title } = frontmatter
  let tags = []
  const tags_str = frontmatter.tags
  if (tags_str !== undefined && tags_str !== "") {
    tags = tags_str.split(',')
  }
  return (
    <div className="container">
      <div className="main">
        {/* {h2Headings.length > 0 */}
        {false 
          ? <div className="toc-container">
            <ul>
              {/* eslint-disable-next-line */}
              {h2Headings.map((h, i) => <li key={i}><h2><a href={'#' + (encodeURIComponent(h.value.toLowerCase().replace(/[&;\/\\#,+()$~%.'":*?<>{}]/g, '').split(` `).join(`-`)))}>{h.value}</a></h2></li>)}
            </ul>
          </div>
          : null}

        <header class="post-header">
          <h1>{title}</h1>
          <p class="meta">{frontmatter.date}</p>
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="other-tags">
          <b>Tags:</b>
          {tags.length
            ? tags.map((tag, i) => <Link key={i} className="topic-tag" to={"/tags/" + tag}>{tag}</Link>)
            : null}
        </div>
      </div>
    </div>
  )
}