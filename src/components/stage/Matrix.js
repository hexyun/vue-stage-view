/**
 * reference: https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/
 * [ a, c, e,
 *   b, d, f,
 *   0  0, 1 ]
 */
import { $ } from '../../utils/dom'

export default class Matrix {
  constructor(el, { x = 0, y = 0, removedEffectClass = 'effect--removed', zoom = 1}) {
    this.el = $(el)
    this.x = x
    this.y = y
    this.zoom = zoom
    this.reset()
    const styles = window.getComputedStyle(this.el, null)
    this.w = parseInt(styles.width)
    this.h = parseInt(styles.height)
    this.removedEffectClass = removedEffectClass
  }

  meta() {
    return [
      this.a,
      this.b,
      this.c,
      this.d,
      this.e,
      this.f
    ].join(',')
  }
  setZoom(zoom) {
    this.a = this.d = this.zoom = zoom
    return this
  }
  reset() {
    this.a = this.zoom
    this.b = 0
    this.c = 0
    this.d = this.zoom
    this.e = 0
    this.f = 0
    return this.matrix()
  }

  matrix() {
    var ctx = this
    window.requestAnimationFrame(function() {
      ctx.el.style.transform = `matrix(${ctx.meta()})`
    })
    return this
  }

  translate({x, y}, offset = false) {
    this.e = offset ? this.e + x : x
    this.f = offset ? this.f + y : y
    if(this.el) {
      this.el.classList.add(this.removedEffectClass)
    }
    return this
  }

  scale(zoom, offset) {
    this.setZoom(zoom)
    this.a = offset ? this.a * zoom : zoom
    this.d = offset ? this.d * zoom : zoom

    if(this.el) {
      this.el.classList.remove(this.removedEffectClass)
    }
    return this
  }
}
