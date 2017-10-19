/**
 * @desc 滑块Slider
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Oct 2017
 */

'use strict'

export default ({
  isClient
}) => {
  if (isClient) {
    window.Slider = Slider
  }
}

class Slider {
  constructor (bar, dot, initialValue = 0) {
    this.dot = dot
    this.bar = bar
    this.dragging = false
    this.value = initialValue
    this.handleSliderClick = this.onSliderClick.bind(this)
    this.handleDotMouseDown = this.onDotMouseDown.bind(this)
    this.handleDotMouseLeave = this.onDotMouseLeave.bind(this)
    this.handleDotMouseUp = this.onDotMouseUp.bind(this)
    this.init()
  }

  init () {
    this.bar.addEventListener('click', this.handleSliderClick)
    this.dot.addEventListener('mousedown', this.handleDotMouseDown)
    this.dot.addEventListener('mousemove', this.handleDotMouseLeave)
    this.dot.addEventListener('mouseup', this.handleDotMouseUp)
  }

  destroy () {}

  onSliderClick (e) {
    if (this.dragging) {
      return
    }
    console.log(e)
  }

  onDotMouseDown (e) {}

  onDotMouseLeave (e) {}

  onDotMouseUp (e) {}
}
