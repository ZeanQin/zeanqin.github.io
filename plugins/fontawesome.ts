import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFilePdf, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {
  faCode,
  faBars,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faBars)
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faCode)
library.add(faFilePdf)
library.add(faEnvelope)
library.add(faGithub)
library.add(faLinkedin)

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)
