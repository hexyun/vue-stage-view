<style lang="less">
  .stage__navigator {
    position: fixed;
    bottom: 20px;
    right: 30px;
    display: flex;
    justify-content: space-between;
    width: 120px;
    user-select: none;
    background: #f0f2f5;
    padding: 5px 10px;
    align-items: center;
    border-radius: 5px;
  }

  .nav-btn .icon {
    width: 28px;
    height: 28px;
    fill: #5e71c5;
    vertical-align: middle;
  }

  .v-modal {
    background-color: #f4f4f4 !important;
  }
  .stage__preview{
    background-color: #f4f4f4;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1004;
    width: 100%;
    height: 100%;
  }
  .stage__preview .img {
    -webkit-user-drag: none;
  }
</style>
<template>
  <div class="stage__wrapper">
    <stage v-ref:stage @zoom="zoom" :zoom="z / 100">
      <image-view v-ref:list @select="select" @view="view" :zoom="z" :key-title="keyTitle" :list="filterList"
                  :key="keyThumb" :keyword="keyword"></image-view>
    </stage>
    <div class="stage__navigator">
      <div class="nav-btn zoom-out"
           @click="$refs.stage.zoomOut()"
           title="缩小">
        <svg t="1557915928818" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="1989" xmlns:xlink="http://www.w3.org/1999/xlink" width="32"
             height="32">
          <defs>
            <style type="text/css"></style>
          </defs>
          <path
            d="M604.16 430.08c0 11.264-9.216 20.48-20.48 20.48H450.56v133.12c0 11.264-9.216 20.48-20.48 20.48s-20.48-9.216-20.48-20.48V450.56H276.48c-11.264 0-20.48-9.216-20.48-20.48s9.216-20.48 20.48-20.48h133.12V276.48c0-11.264 9.216-20.48 20.48-20.48s20.48 9.216 20.48 20.48v133.12h133.12c11.264 0 20.48 9.216 20.48 20.48z m359.424 533.504c-4.096 4.096-9.216 6.144-14.336 6.144s-10.24-2.048-14.336-6.144L683.008 711.68C615.424 772.096 527.36 808.96 430.08 808.96 221.184 808.96 51.2 638.976 51.2 430.08S221.184 51.2 430.08 51.2s378.88 169.984 378.88 378.88c0 97.28-36.864 185.344-97.28 252.928l251.904 251.904c8.192 8.192 8.192 20.48 0 28.672zM768 430.08C768 243.712 616.448 92.16 430.08 92.16S92.16 243.712 92.16 430.08s151.552 337.92 337.92 337.92 337.92-151.552 337.92-337.92z"
            p-id="1990" fill="#2c2c2c"></path>
        </svg>
      </div>

      <div v-el:zoom-pan class="zoom--pan">

        <span class="text">{{z}}%</span>
      </div>
      <div class="nav-btn zoom-in"
           @click="$refs.stage.zoomIn()"
           title="放大">
        <svg t="1557916627763" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="6026" xmlns:xlink="http://www.w3.org/1999/xlink" width="32"
             height="32">
          <defs>
            <style type="text/css"></style>
          </defs>
          <path
            d="M426.666667 785.066667c-98.679467 0-183.995733-35.259733-253.559467-104.840534S68.266667 525.346133 68.266667 426.666667s35.2768-183.995733 104.840533-253.559467S327.9872 68.266667 426.666667 68.266667c98.082133 0 183.381333 35.259733 253.508266 104.789333C749.806933 242.670933 785.066667 327.9872 785.066667 426.666667c0 36.078933-4.522667 70.638933-13.4144 102.7072-16.469333 55.227733-46.336 105.0112-88.917334 148.343466a15.752533 15.752533 0 0 1-2.6112 3.4816c-30.225067 29.610667-63.624533 53.367467-99.242666 70.6048C534.272 773.905067 482.423467 785.066667 426.666667 785.066667z m0-682.666667c-89.2928 0-166.485333 31.914667-229.4272 94.839467S102.4 337.373867 102.4 426.666667s31.914667 166.485333 94.839467 229.4272C260.181333 719.035733 337.373867 750.933333 426.666667 750.933333c50.653867 0 97.5872-10.069333 139.451733-29.917866 31.197867-15.086933 60.689067-35.874133 87.586133-61.7472a15.394133 15.394133 0 0 1 2.4064-3.1744c39.850667-39.850667 67.703467-85.674667 82.756267-136.174934 7.970133-28.7744 12.066133-60.245333 12.066133-93.252266 0-89.2928-31.8976-166.485333-94.839466-229.4272C592.64 134.331733 515.4304 102.4 426.666667 102.4z"
            p-id="6027"></path>
          <path
            d="M938.666667 973.653333a33.9968 33.9968 0 0 1-24.132267-10.001066l-120.32-120.32a34.133333 34.133333 0 1 1 48.264533-48.264534l120.32 120.32A34.133333 34.133333 0 0 1 938.666667 973.653333zM597.333333 462.506667H256a34.133333 34.133333 0 0 1 0-68.266667h341.333333a34.133333 34.133333 0 0 1 0 68.266667z"
            p-id="6028"></path>
          <path d="M692.309333 644.864l150.186667 150.186667-48.2816 48.2816-150.186667-150.186667z" p-id="6029"></path>
        </svg>
      </div>
    </div>
  </div>
  <div v-show="selectShow" class="stage__preview">
    <div v-click-out-side="hide" v-el:preview class="preview__wrapper">
      <img class="img"
           :src="currentItem && currentItem[keyDetail]"
           :alt="currentItem && currentItem[keyTitle]"
           :title="currentItem && currentItem[keyTitle]"
      />
    </div>
  </div>

</template>
<script>
  import Matrix from '../stage/Matrix'
  import Dragger from '../stage/Dragger'
  import { throttle } from '../../utils/dom'
  import clickOutSide from '../../directives/clickoutside.js'

  export default {
    name: 'stage-view',
    directives: {
      clickOutSide
    },
    props: {
      keyword: {
        type: String,
        default: ''
      },
      scale: {
        type: [Number, String],
        default: 100
      },
      list: {
        type: Array,
        default: []
      },
      keyThumb: {
        type: String,
        default: 'url'
      },
      keyDetail: {
        type: String,
        default: 'url'
      },
      keyTitle: {
        type: String,
        default: 'title'
      },
      selectThumb: {
        type: Function,
        default: function() {
        }
      },

      selectDetail: {
        type: Function,
        default: function() {
        }
      },
      search: {
        type: Function,
        default: function() {
        }
      }
    },
    data() {
      return {
        z: this.scale,
        zD: 100,
        selectList: [],
        selectShow: false,
        page: 1,
        currentItem: null,
        matrix: null,
        dragger: null
      }
    },
    watch: {
      filterList(val, old) {
        this.search(val, this.keyword)
      }
    },
    computed: {
      filterList() {
        let list = this.list
        if(this.keyword) {
          list = list.filter(x => {
            let title = x[this.keyTitle]
            if(!title) return true
            return title.indexOf(this.keyword.trim()) > -1
          })
        }
        return list
      }
    },
    ready() {
      this.matrix = new Matrix(this.$els.preview, {})
      this.dragger = new Dragger(this.$els.preview, throttle(({x, y}) => {
        if(x != 0 || y != 0) this.matrix.translate({x: x * 2, y: y * 2}, true).matrix()
      }, 16.6))
    },
    methods: {
      zoom(zoom) {
        if(zoom <= 1) {
          this.z = zoom * 100
        }
      },
      zoomDetail(zoom) {
        if(zoom <= 1) this.zD = zoom * 100
      },
      select(item) {
        this.currentItem = item
        this.selectThumb(item, this.filterList)
      },
      selectItem(item) {
        // this.$emit('select-thumb', item)
        this.selectDetail(item, this.filterList)
      },
      // 大图隐藏
      changed(show) {
        if(!show) {
          this.selectShow = false
        }
      },
      view(item) {
        this.matrix.reset()
        this.currentItem = item
        this.selectDetail(item, this.filterList)
        this.selectShow = true
      },
      hide() {
        if(this.selectShow) {
          this.selectShow = false
          this.dragger && this.dragger.off()
        }  
      }
    }
  }
</script>
