<template>
  <div id="app">
    <div class="nav-bar">
      <div class="logo">
        <img src="./logo.png" alt="logo">
      </div>
      <div class="nav-item">
        <router-link class="nav-bar-item home-link" to="/Home">
          <img src="" alt="">
          <span>首页</span>
        </router-link>
        <router-link class="nav-bar-item course-link" to="/Course">
          <img src="" alt="">
          <span>课程</span>
        </router-link>
        <router-link class="nav-bar-item exams-link" to="/Exams">
          <img src="" alt="">
          <span>历年题</span>
        </router-link>
        <router-link class="nav-bar-item live-link" to="/Live">
          <img src="" alt="">
          <span>直播间</span>
        </router-link>
      </div>
      <div class="account" v-if="user == null">
        <router-link class="account-item login btn btn-primary" to="/PleaseLogIn">
          登陆
        </router-link>
        <!--<router-link class="account-item register" to="/PleaseLogIn">-->
          <!--<span>注册</span>-->
        <!--</router-link>-->
      </div>
      <div class="user" v-if="user != null">
        <router-link class="user-item" to="/User">
          <span>{{user['name']}}</span>
        </router-link>
        <a class="user-item" @click="logOut">
          <span>登出</span>
        </a>
      </div>
    </div>
    <div class="main-content">
      <router-view
        @logInSucceed="logInSucceed"
        @signUpSucceed="signUpSucceed"
      ></router-view>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import router from './router'

export default {
  name: 'app',
  mounted () {
    // 验证登录状态
    if (localStorage.getItem('user')) {
      let str = localStorage.getItem('user')
      let id = str.substring(0, str.indexOf('|'))
      let name = str.substring(str.indexOf('|') + 1)
      console.log(id)
      console.log(name)
      let o = {
        id: id,
        name: name
      }
      this.user = o
    }
  },
  data () {
    return {
      user: null
    }
  },
  methods: {
    /**
     * 登陆成功
     */
    logInSucceed () {
      let str = localStorage.getItem('user')
      let id = str.substring(0, str.indexOf('|'))
      let name = str.substring(str.indexOf('|') + 1)
      let o = {
        id: id,
        name: name
      }
      this.user = o
      router.push('/Home')
    },
    /**
     * 注册
     */
    signUpSucceed () {
      alert('reg')
    },
    /**
     * 登出
     */
    logOut () {
      localStorage.clear()
      this.user = null
      router.push('/Home')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    text-align center
    .nav-bar
      z-index 10
      width 100%
      overflow hidden
      position fixed
      top 0
      left 0
      height 3em
      background-color #fff
      text-align center
      .logo
        display inline-block
        margin-left 1em
        margin-right 1em
        height 3em
        vertical-align top
        img
          height 100%
      .account
        position fixed
        right 0
        top 0
        margin-right 1em
        height 3em
        line-height 3em
        .account-item
          cursor pointer
      .user
        position fixed
        right 0
        top 0
        margin-right 1em
        height 3em
        line-height 3em
        .user-item
          cursor pointer
          color #0f88eb
      .nav-item
        height 3em
        line-height 3em
        display inline-block
        vertical-align top
        .nav-bar-item
          text-decoration none
          text-align center
          margin-left 1em
          margin-right 1em
          color #777
    .main-content
      margin-top 3em
      display inline-block
      text-align left
    .foot
      clear both
</style>
