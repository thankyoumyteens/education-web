<template>
  <div class="simulation">
    <div class="simulation-list" v-if="simulationList.length>0">
      <div class="simulation-item" v-for="item in simulationList">
        <div class="title">{{item['title']}}</div>
        <div class="link">
          <a class="btn btn-primary" target="_blank" :href="item['link']">下载</a>
        </div>
      </div>
    </div>
    <div class="loading" v-if="simulationList.length<=0">
      加载中...
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {
    getUrl
  } from '@/util/url.js'

  export default {
    mounted () {
      this.$http.get(getUrl()['exams']).then((res) => {
        let data = res.body
        if (data.length <= 0) {
          this.$refs.loading.innerHTML = '暂无数据'
          return
        }
        this.simulationList = []
        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          let o = {}
          o['title'] = item['title']
          o['link'] = item['link']
          Vue.set(this.simulationList, i, o)
        }
      })
    },
    data () {
      return {
        simulationList: []
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .simulation
    .simulation-list
      .simulation-item
        width 700px
        height 50px
        margin 10px
        display block
        border 1px solid #ccc
        box-shadow 3px 3px 2px #dfdbda
        transition all .3s
        &:hover
          box-shadow 3px 3px 2px #ccc
        .title
          font-weight bold
          margin-left 50px
          height 50px
          line-height 50px
          display inline-block
          vertical-align top
        .link
          margin-right 30px
          float right
          height 50px
          line-height 50px
          vertical-align top
</style>
