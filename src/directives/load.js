export default {
    bind () {
      console.log(this.el.nodeName)
      if(this.el.nodeName !== 'IMG') return
      this.img = new Image()
      console.log(this.vm, this.expression)
      this.vm.$nextTick(() => {
        const old = this.el.getAttribute('src')
        const lazySrc = this.el.getAttribute('data-src')
        const ctx = this
        this.img.src = old
        if(lazySrc) this.el.src = lazySrc
        console.log(this.el)
        console.log(old)
        
        this.img.onload = function() {
          ctx.el.setAttribute('src', old)
        }
      })
    },
    unbind () {
      this.img = null
    }
};
