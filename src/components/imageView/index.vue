<style lang="less">
  .stage-img__container {
    column-count: 4;
    column-gap: .5vw;
    padding-top: .5vw;
    margin: 0;
  }
  .stage-img__item {
    position: relative;
    width: 24vw;
    list-style: none;
  }
  .stage-img__item .title{
    transition: font-size 0.5s ease-in-out;
    font-size: 16px;
    margin: 0;
    padding-bottom: 5px;
    padding-top: 5px;
  }
  .stage-img__item .img{
    max-width: 100%;
    max-height: 100%;
    display: block;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-drag: none;
  }
  .stage-img__item .img.active{
    box-shadow: 0 0 0 2px #7864f0;
  }
</style>
<template>
  <ul class="stage-img__container">
    <li v-for="(index, item) in list" track-by="$index" class="stage-img__item">
      <p class="title" :style="titleStyle">{{item.title}}</p>
      <img @click="select(index)" :class="{
        'img': true,
        'active': currentIndex === index
      }" :title="item.title" :src="item[key]" v-load>
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
      }
    },
    data() {
      return {
        currentIndex: 0,
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
    },
    computed: {
      titleStyle() {
        let size = 16
        if(this.zoom < 1) size =  size * 0.9 / this.zoom
        return {
          'font-size': `${size}px`
        }
      },
    },
    beforeDestroy() {
      this.timer = null
    }
  }
</script>
