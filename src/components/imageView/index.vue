<style lang="less">
  .stage-img__container {
    width: 200%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .stage-img__item {
    position: relative;
    list-style: none;
    user-select: none;
    margin-right: 30px;
    margin-bottom: 30px;
    transition: margin-right 0.5s ease, margin-bottom 0.5s ease-in;
  }
  .stage-img__item .title{
    transition: font-size 0.5s ease-in-out;
    font-size: 16px;
    margin: 0;
    padding: 5px;
    box-sizing: border-box;
    text-align:left;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stage-img__item .img{
    -webkit-user-drag: none;
    display: block;
    box-sizing: border-box;
  }
  .stage-img__item .img.active{
    box-shadow: -1px 3px 10px #a19cc0;
  }
</style>
<template>
  <ul class="stage-img__container">
    <li :style="stageStyle" v-for="(index, item) in list" track-by="$index" class="stage-img__item">
      <p v-show="item[keyTitle]" class="title" :style="titleStyle">{{item[keyTitle]}}</p>
      <img :data-src="item[key]" v-load @click="select(index)" :class="{
        'img': true,
        'active': currentIndex === index
      }" :title="item[keyTitle]">
    </li>
  </ul>
</template>
<script>
  import load from '../../directives/load'
  import stage from '../stage'
  export default {
    name: 'image-view',
    directives: {
      load
    },
    components: {
      stage
    },
    props: {
      list: {
        type: Array,
        default:[] 
      },
      zoom: {
        type: Number,
        default: 1
      },
      key: {
        type: String,
        default: 'url'
      },
      keyTitle: {
        type: String,
        default: 'title'
      }
    },
    data() {
      return {
        currentIndex: -1,
        timer: null,
        lastClick: 0
      }
    },
    methods: {
      select(index) {
        this.currentIndex = index
        // dbclick
        if(Date.now() - this.lastClick < 200) {
          this.timer && clearTimeout(this.timer)
          this.$emit('view', this.list[index])
        // click
        } else {
          this.timer = setTimeout(() => {
            this.$emit('select', this.list[index])
            this.lastClick = Date.now()
          }, 200)
        }
        this.lastClick = Date.now()
      },
      _ajustedZoom() {
        let zoom = 1
        if(this.zoom > 3 && this.zoom <= 300) {
          zoom = this.zoom / 100
        } else if(this.zoom <= 3 && this.zoom >= 0.3) {
          zoom = this.zoom
        }
        return Math.min(zoom, 1)
      }
    },
    computed: {
      stageStyle() {
        let bottom = 30 / this._ajustedZoom()
        return {
          'margin-bottom': `${bottom}px`,
          'margin-right': `${bottom}px`
        }
      },
      titleStyle() {
        let size = 16 / this._ajustedZoom()
        return {
          'font-size': `${size}px`
        }
      }
    },
    beforeDestroy() {
      this.timer = null
    }
  }
</script>
