
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import './style.css'

export default function Footer(props) {
  return (
    <footer class="site-footer">

      <div class="wrap">

        <div class="footer-col-1 column">
          <ul>
            <li>{props.siteDescription}</li>
          </ul>
        </div>

        <div class="footer-col-2 column">
          <ul>
            <li>
              <a href="https://github.com/noitq">
                <span>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
                <span class="username"> noitq</span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/noitq">
                <span>
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
                <span class="username"> noitq</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-col-3 column">
          <p class="text">Hi! I'm Noi, I am a Dev and a Machine Learning enthusiast. I built some small things and noted here.</p>
        </div>

      </div >

    </footer >
  )
}