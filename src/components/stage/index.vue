<template>
  <div v-el:stage class="hex-stage">
    <div v-el:base class="hex-stage__base">
      <slot></slot>
    </div>
  </div>
</template>
<style>
  .hex-stage {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;;
    height: 100%;
    width: 100%;
    z-index: 0;
    overflow: hidden;
  }

  .hex-stage__base {
    position: relative;
    height: 100%;
    width: 100%;
    /*will-change: transform;*/
    transition: transform .5s ease-in-out;
    transform: matrix(1,0,0,1,0,0);
    transform-origin: 50% 50%;
    -webkit-transform-style: preserve-3d;
    /*user-select: none;*/
    /* display: flex;
    align-items: center;
    justify-content: center; */
  }
  .effect--removed{
    transition: unset;
  }
</style>
<script>
  import Matrix from './Matrix'
  import Dragger from './Dragger'
  import { throttle } from '../../utils/dom'

  export default {
    name: 'stage',
    props: {
      zoom: {
        type: [Number, String],
        default: 1
      }
    },
    data() {
      return {
        matrix: null,
        dragger: null,
        detailDragger: null
      }
    },
    ready() {
      this.matrix = new Matrix(this.$els.base, {
        zoom: this.zoom
      })
      this.dragger = new Dragger(this.$els.stage, throttle(({x, y}) => {
        if(x != 0 || y != 0) this.matrix.translate({x: x * 2, y: y * 2}, true).matrix()
      }, 16.6))
      
      this.$els.stage.oncontextmenu = function(e) {
        e.preventDefault()
      }
    },
    methods: {
      // 缩放
      zoomIn() {
        this.matrix.scale(Math.max((this.matrix.a * 100 - 20) / 100, 0.4)).matrix()
        this.$emit('zoom', this.matrix.zoom)
      },
      // 放大
      zoomOut() {
        this.matrix.scale(Math.min((this.matrix.a * 100 + 20) / 100, 2)).matrix()
        this.$emit('zoom', this.matrix.zoom)
      }
    },
    beforeDestroy() {
      this.matrix = null
      this.dragger = null
      this.in = 0
      this.out = 0
    }
  }
</script>
