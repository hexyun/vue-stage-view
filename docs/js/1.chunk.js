webpackJsonp([1],{78:function(t,e,s){var o,i,n;!function(s,r){i=[e],o=r,n="function"==typeof o?o.apply(e,i):o,!(void 0!==n&&(t.exports=n))}(this,function(e){"use strict";function s(){for(var t=["https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2819109401,2573286501&fm=26&gp=0.jpg","https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=80274084,2988281088&fm=26&gp=0.jpg","https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=520772347,1639860623&fm=11&gp=0.jpg","https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=968897864,3213190193&fm=26&gp=0.jpg","https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3560174241,1441889743&fm=26&gp=0.jpg,https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2289902233,4012915850&fm=26&gp=0.jpg"],e=0,s=[];e<30;)s.push({title:e+1+"猫咪",url:t[parseInt(5*Math.random())]}),e++;return s}Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{list:s(),keyword:""}},ready:function(){var t=this;setTimeout(function(){return t.keyword="1"},1e3)},methods:{remove:function(t){var e=this.$refs.stage_view.currentItem,s=-1;e&&e[t]&&(s=this.list.findIndex(function(s){return s[t]==e[t]})),s>-1&&this.list.splice(s,1),this.$refs.stage_view.selectShow=!1,this.$refs.list.currentIndex=-1}}},t.exports=e.default})},166:function(t,e){t.exports=" <stage-view v-ref:stage_view :list=list key-thumb=url key-detail=url :keyword=keyword key-title=title></stage-view> "},171:function(t,e,s){var o,i,n={};o=s(78),i=s(166),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports.default);var r="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i&&(r.template=i),r.computed||(r.computed={}),Object.keys(n).forEach(function(t){var e=n[t];r.computed[t]=function(){return e}})}});