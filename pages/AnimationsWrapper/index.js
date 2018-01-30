import CatPageWithWrapper from './../CatPageWithWrapper/'
import { AddAnimationHOC } from './AddAnimationsHOC'
import { animateIn, animateOut } from './animations'

export default AddAnimationHOC(
  animateIn,
  animateOut
)(CatPageWithWrapper)