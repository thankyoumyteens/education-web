<template>
  <div id="app">
    <div class="nav-bar">
      <div class="logo">
        <img src="./logo.png" alt="logo">
      </div>
      <div class="nav-item">
        <router-link class="nav-bar-item" to="/Home">首页</router-link>
        <router-link class="nav-bar-item" v-show="freeShow" to="/FreeCourse">体验课</router-link>
        <router-link class="nav-bar-item" to="/Course">课程</router-link>
        <router-link class="nav-bar-item" to="/Simulation">模拟题</router-link>
        <router-link class="nav-bar-item" to="/Exams">历年题</router-link>
        <router-link class="nav-bar-item" to="/Live">直播间</router-link>
        <router-link class="nav-bar-item" to="/About">关于我们</router-link>
      </div>
      <div class="account" v-if="user == null">
        <router-link class="account-item btn btn-primary" to="/PleaseLogIn">登陆</router-link>
        <router-link class="account-item btn btn-primary" to="/Register">注册</router-link>
      </div>
      <div class="user" v-if="user != null">
        <router-link class="user-item" to="/User">
          <span>{{user['nickname']}}</span>
        </router-link>
        <a class="user-item" @click="logOut">登出</a>
      </div>
    </div>
    <div class="main-content">
      <keep-alive>
        <router-view
          :profile="user"
          @logInSucceed="logInSucceed"
        ></router-view>
      </keep-alive>
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
    if (sessionStorage.getItem('uid')) {
      let o = {
        uid: sessionStorage.getItem('uid'),
        nickname: sessionStorage.getItem('nickname'),
        address: sessionStorage.getItem('address'),
        gender: sessionStorage.getItem('gender'),
        idCard: sessionStorage.getItem('idCard'),
        mail: sessionStorage.getItem('mail'),
        name: sessionStorage.getItem('name'),
        qqAccount: sessionStorage.getItem('qqAccount'),
        schoolCard: sessionStorage.getItem('schoolCard'),
        wechatAccount: sessionStorage.getItem('wechatAccount'),
        weiboAccount: sessionStorage.getItem('weiboAccount')
      }
      if (!o['nickname']) {
        o['nickname'] = o['uid']
      }
      this.user = o
    }
  },
  computed: {
    'freeShow' () {
      if (this.user === null) {
        //
      }
      if (!sessionStorage.getItem('accessLevel')) {
        return true
      } else if (parseInt(sessionStorage.getItem('accessLevel')) < 1) {
        return true
      } else {
        return false
      }
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
      let o = {
        uid: sessionStorage.getItem('uid'),
        nickname: sessionStorage.getItem('nickname'),
        address: sessionStorage.getItem('address'),
        gender: sessionStorage.getItem('gender'),
        idCard: sessionStorage.getItem('idCard'),
        mail: sessionStorage.getItem('mail'),
        name: sessionStorage.getItem('name'),
        qqAccount: sessionStorage.getItem('qqAccount'),
        schoolCard: sessionStorage.getItem('schoolCard'),
        wechatAccount: sessionStorage.getItem('wechatAccount'),
        weiboAccount: sessionStorage.getItem('weiboAccount')
      }
      this.user = o
      router.push('/Home')
    },
    /**
     * 登出
     */
    logOut () {
      sessionStorage.clear()
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
      height 45px
      background-color #f3f5f7
      text-align center
      .logo
        display inline-block
        margin-left 1em
        margin-right 1em
        height 45px
        vertical-align top
        img
          height 100%
      .account
        position fixed
        right 0
        top 0
        margin-right 1em
        height 45px
        line-height 45px
        .account-item
          cursor pointer
      .user
        position fixed
        right 0
        top 0
        margin-right 1em
        height 45px
        line-height 45px
        .user-item
          cursor pointer
          color #0f88eb
      .nav-item
        height 45px
        line-height 45px
        display inline-block
        vertical-align top
        .nav-bar-item
          display inline-block
          text-decoration none
          text-align center
          margin-left 1em
          margin-right 1em
          color #777
          &.router-link-active
            color #478aff
            font-weight bold
    .main-content
      margin-top 45px
      display inline-block
      text-align left
    .foot
      clear both
</style>
