/**
 * Author: Noi Truong <noitq.hust@gmail.com>
 */

import React from 'react'
import { Link } from 'gatsby'
import { get } from 'lodash'
import './style.css'

export default ({ posts }) => {
  return (
    <div className="home">
      <ul className="posts" >
        {posts.map(({ node }, i) => {
          const title = get(node, 'frontmatter.title')
          const excerpt = get(node, 'frontmatter.excerpt')
          return (
            <li key={i}>
              <span class="post-date">{node.frontmatter.date}</span>
              <Link to={node.frontmatter.path} className="post-link" > {title} </Link> <br/> 
              {excerpt}
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}