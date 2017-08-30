<template>
  <div class="course">
    <div class="select-window" v-show="!showPage">
      <div class="category-list">
        <div class="category-item category-title">分类: </div>
        <div class="category-item" :class="{'selected':selected===-1}" @click="getCourses(-1)">全部</div>
        <div class="category-item" :class="{'selected':selected===0}" @click="getCourses(0)">初级经济师</div>
        <div class="category-item" :class="{'selected':selected===1}" @click="getCourses(1)">中级经济师</div>
        <div class="category-item" :class="{'selected':selected===2}" @click="getCourses(2)">高级经济师</div>
      </div>
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
    getUrl,
    getHost
  } from '@/util/url.js'

  export default {
    components: {
      page
    },
    mounted () {
      this.getCourses(-1)
    },
    data () {
      return {
        selected: -1,
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
      },
      getCourses (category) {
        this.selected = category
        this.$http.get(getUrl()['course'] + '?category=' + category).then((res) => {
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
            o['img'] = getHost() + item['img']
            o['link'] = getHost() + item['link']
            Vue.set(this.courseList, i, o)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .course
    .category-list
      width 100%
      border-bottom 1px solid #2e6da4
      .category-title
        font-weight bold
      .category-item
        cursor pointer
        display inline-block
        padding 0 10px
        margin 10px 4px
        height 34px
        line-height 34px
        border-radius 2px
        &:hover
          color #2e6da4
        &.selected
          color #fff
          font-weight bold
          background #2e6da4
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
        &:hover
          box-shadow 3px 3px 2px #777
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
