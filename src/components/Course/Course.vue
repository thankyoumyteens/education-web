<template>
  <div class="course">
    <div class="select-window" v-show="!showPage">
      <div class="category-list">
        <div class="category-item category-title">分类: </div>
        <div class="category-item" :class="{'selected':selected===-1}" @click="getCourses(-1)">全部</div>
        <div class="category-item" :class="{'selected':selected===0}" @click="getCourses(0)">工商管理</div>
        <div class="category-item" :class="{'selected':selected===1}" @click="getCourses(1)">农业</div>
        <div class="category-item" :class="{'selected':selected===2}" @click="getCourses(2)">商业</div>
        <div class="category-item" :class="{'selected':selected===3}" @click="getCourses(3)">财政税收</div>
        <div class="category-item" :class="{'selected':selected===4}" @click="getCourses(4)">金融</div>
        <div class="category-item" :class="{'selected':selected===5}" @click="getCourses(5)">保险</div>
        <div class="category-item" :class="{'selected':selected===6}" @click="getCourses(6)">运输</div>
        <div class="category-item" :class="{'selected':selected===7}" @click="getCourses(7)">人力资源管理</div>
        <div class="category-item" :class="{'selected':selected===8}" @click="getCourses(8)">邮电</div>
        <div class="category-item" :class="{'selected':selected===9}" @click="getCourses(9)">房地产</div>
        <div class="category-item" :class="{'selected':selected===10}" @click="getCourses(10)">旅游</div>
        <div class="category-item" :class="{'selected':selected===11}" @click="getCourses(11)">建筑</div>
        <div class="category-item" :class="{'selected':selected===200}" @click="getCourses(200)">录音</div>
      </div>
      <div class="course-list" v-if="courseList.length>0">
        <div class="course-item" v-if="item['category']!=='200'" @click="toVideo(item['link'])" v-for="item in courseList">
          <div class="img"><img :src="item['img']" alt=""></div>
          <div class="title">{{item['title']}}</div>
        </div>
        <div class="course-item" v-if="item['category']==='200'" v-for="item in courseList" @mouseover="changeLink(item['link'])">
          <div class="img"><img src="./audioBg.png" alt=""></div>
          <div class="title">{{item['title']}}</div>
          <div class="play" @click="playAudio()">播放</div>
          <div class="pause" @click="pauseAudio()">暂停</div>
        </div>
      </div>
      <div class="loading" id="loadingData" v-if="courseList.length<=0">
        暂无数据
      </div>
    </div>
    <page ref="page" v-show="showPage" @closed="pageClosed"></page>
    <audio ref="audioPlayer" :src="audioLink"></audio>
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
        audioLink: '',
        selected: -1,
        showPage: false,
        courseList: []
      }
    },
    methods: {
      changeLink (link) {
        this.audioLink = link
      },
      pauseAudio () {
        this.$refs.audioPlayer.pause()
      },
      playAudio (link) {
        this.$refs.audioPlayer.play()
      },
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
          this.courseList = []
          let data = res.body
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let o = {}
            o['title'] = item['title']
            o['category'] = item['category']
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
        .play, .pause
          display inline-block
          width 49%
          text-align center
    .loading
      width 1120px
      margin 0 auto
      text-align center
      padding-top 10%
      font-size 1.5em
</style>
