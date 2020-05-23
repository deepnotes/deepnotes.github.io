/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'prismjs/themes/prism.css'
import 'katex/dist/katex.min.css'
import "./src/styles/global.css"

import { config } from "@fortawesome/fontawesome-svg-core";
// Disable the automatic insertion 
// of CSS into the head of the document.
config.autoAddCss = false;
