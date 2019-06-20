import { $ } from '../../utils/dom'
export default class Dragger {
  constructor(el, cb) {
    this.el = $(el)
    if (this.el) {
      this.down = (e) => {
        this.x = e.clientX
        this.y = e.clientY
        this.lastX = this.x
        this.lastY = this.y
        this.el.addEventListener('mousemove', this.move)
        this.el.addEventListener('mouseup', this.up)
        return false
      }
      this.move = e => {
        this.x = e.clientX
        this.y = e.clientY
        if(typeof cb === 'function') {
          cb({x: this.x - this.lastX , y: this.y - this.lastY})
        }
        if(this.x < 10 || this.y < 10) this.off()
        this.lastX = this.x
        this.lastY = this.y
        return false
      }
      this.off = () => {
        this.el.removeEventListener('mousemove', this.move)
        this.el.removeEventListener('mouseup', this.down)
      }
      this.up = () => {
        this.off()
        return false
      }
      this.el.addEventListener('mousedown', this.down)
    }
  }
}
