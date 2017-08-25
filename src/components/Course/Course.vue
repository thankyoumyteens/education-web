<template>
  <div class="course">
    <div class="select-window" v-show="!showPage">
      <div class="course-list" v-if="courseList.length>0">
        <div class="course-item" @click="toVideo(item['link'])" v-for="item in courseList">
          <div class="img"><img :src="item['img']" alt=""></div>
          <div class="title">{{item['title']}}</div>
        </div>
      </div>
      <div class="loading" v-if="courseList.length<=0">
        加载中...
      </div>
    </div>
    <page ref="page" v-show="showPage" @closed="pageClosed"></page>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import page from '@/components/VideoPage/VideoPage'
  import {
    getUrl
  } from '@/util/url.js'

  export default {
    components: {
      page
    },
    mounted () {
      this.$http.get(getUrl()['course'] + '?category=-1').then((res) => {
        let data = res.body
        if (data.length <= 0) {
          this.$refs.loading.innerHTML = '暂无数据'
          return
        }
        this.courseList = []
        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          let o = {}
          o['title'] = item['title']
          o['img'] = item['img']
          o['link'] = item['link']
          Vue.set(this.courseList, i, o)
        }
      })
    },
    data () {
      return {
        showPage: false,
        courseList: []
      }
    },
    methods: {
      toVideo (link) {
        this.$refs.page.init(link)
        this.$refs.page.show()
        this.showPage = true
      },
      pageClosed () {
        this.showPage = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .course
    .course-list
      /*text-align center*/
      width 1120px
      margin 0 auto
      .course-item
        /*display inline-block*/
        float left
        width 240px
        margin 20px
        border-top-left-radius 10px
        border-top-right-radius 10px
        cursor pointer
        border 1px solid #ccc
        box-shadow 3px 3px 2px #dfdbda
        transition all .3s
        .img
          width 100%
          img
            width 100%
            border-radius 10px
        .title
          text-align center
          margin-top 5px
          margin-bottom 5px
          font-weight bold
</style>
