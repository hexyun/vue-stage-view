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
    margin-bottom: .5vw;
    user-select: none;
  }
  .stage-img__item .title{
    transition: font-size 0.5s ease-in-out;
    font-size: 16px;
    margin: 0;
    padding: 5px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    text-align:center;
    background-color: rgba(0,0,0,.4);
    color: #fff;
  }
  .stage-img__item .img{
    -webkit-user-drag: none;
    max-width: 100%;
    max-height: 100%;
    display: block;
    box-sizing: border-box;
  }
  .stage-img__item .img.active{
    border: 2px solid #7864f0;
  }
</style>
<template>
  <ul class="stage-img__container">
    <li v-for="(index, item) in list" track-by="$index" class="stage-img__item">
      <p v-show="item[keyTitle]" class="title" :style="titleStyle">{{item[keyTitle]}}</p>
      <img @click="select(index)" :class="{
        'img': true,
        'active': currentIndex === index
      }" :title="item[keyTitle]" :src="item[key]" v-load>
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
    },
    computed: {
      titleStyle() {
        let size = 16
        if(this.zoom < 1) size =  size * 0.9 / this.zoom
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
