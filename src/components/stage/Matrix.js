/**
 * reference: https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/
 * [ a, c, e,
 *   b, d, f,
 *   0  0, 1 ]
 */
import { $ } from '../../utils/dom'

export default class Matrix {
  constructor(el, { x = 0, y = 0, removedEffectClass = 'effect--removed'}) {
    this.el = $(el)
    this.x = x
    this.y = y
    this.a = 1
    this.b = 0
    this.c = 0
    this.d = 1
    this.e = 0
    this.f = 0
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

  // 保证宽度和高度，不管怎样缩放都在一个固定的值, 缩放的相对位置都是相对于 el的正中间
  fix() {
    if(this._zoom != this.a) {
      const w = Math.min(this.a < 1 ? this.w / this.a : this.w * this.a, this.w)
      const h = Math.min(this.a < 1 ? this.h / this.a : this.h * this.a, this.h)
      // this.el.style.width = `${w}px`
      // this.el.style.height = `${h}px`
      this._zoom = this.a
    }
  }

  matrix() {
    var ctx = this
    window.requestAnimationFrame(function() {
      ctx.fix()
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
    this.a = offset ? this.a * zoom : zoom
    this.d = offset ? this.d * zoom : zoom

    if(this.el) {
      this.el.classList.remove(this.removedEffectClass)
    }
    return this
  }
}
