<template>
  <div class="please-login" id="pleaseLogin" @keyup="enterClick($event)">
    <div class="login-bg">
      <img src="./loginBg.jpg"/>
    </div>
    <div class="dialog-wrapper" id="dialogWrapper">
      <div class="login-dialog">
        <div class="login-item form-group">
          <h3>会员登陆</h3>
        </div>
        <div class="login-item form-group">
          <input type="number" maxlength="11" minlength="11" id="userId" placeholder="手机号" tabindex="1" class="form-control">
        </div>
        <div class="login-item form-group">
          <input type="password" id="password" placeholder="密码" tabindex="2" class="form-control">
        </div>
        <div class="login-item form-group" v-show="0">
          <input type="text" id="imageCode" placeholder="验证码" tabindex="3" class="form-control">
          <a class="changeImageCode" @click="changeImageCode" href="javascript:void(0)">看不清?换一张</a>
          <img class="imageCode" :src="imageCodeUrl" alt="">
        </div>
        <div class="login-item">
          <button @click="logIn" id="loginButton" class="btn btn-primary" tabindex="4">登陆</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getUrl
  } from '@/util/url.js'

  export default {
    data () {
      return {
        imageCodeUrl: null
      }
    },
    mounted () {
      document.getElementById('userId').focus()
      this.imageCodeUrl = getUrl()['imageCode'] + '?val=' + (new Date().getTime())
      let pleaseLogin = document.getElementById('pleaseLogin')
      let dialogWrapper = document.getElementById('dialogWrapper')
      let pHeight = pleaseLogin.offsetHeight
      let cHeight = dialogWrapper.offsetHeight
      let height = pHeight - cHeight
      let marginTop = height / 2
      dialogWrapper.style.marginTop = marginTop + 'px'
    },
    methods: {
      logIn () {
        let loginButton = document.getElementById('loginButton')
        let imageCode = document.getElementById('imageCode')
        let userId = document.getElementById('userId')
        let password = document.getElementById('password')

        loginButton.innerHTML = '请稍等...'
        this.$http.post(getUrl()['login'], {
          'imageCode': imageCode.value,
          'userId': userId.value,
          'password': password.value
        }).then((res) => {
          let data = res.body
          if (data['status'] === 'OK') {
            let profile = data['profile']
            let user = data['user']
            sessionStorage.clear()
            sessionStorage.setItem('uid', user['uid'])
            sessionStorage.setItem('accessLevel', user['accessLevel'])
            if (profile !== undefined) {
              sessionStorage.setItem('nickname', profile['nickname'])
              sessionStorage.setItem('address', profile['address'])
              sessionStorage.setItem('gender', profile['gender'])
              sessionStorage.setItem('idCard', profile['idCard'])
              sessionStorage.setItem('mail', profile['mail'])
              sessionStorage.setItem('name', profile['name'])
              sessionStorage.setItem('qqAccount', profile['qqAccount'])
              sessionStorage.setItem('schoolCard', profile['schoolCard'])
              sessionStorage.setItem('wechatAccount', profile['wechatAccount'])
              sessionStorage.setItem('weiboAccount', profile['weiboAccount'])
            } else {
              sessionStorage.setItem('nickname', user['uid'])
            }
            loginButton.innerHTML = '登陆'
            this.$emit('logInSucceed', null)
          } else {
            alert(data['message'])
            userId.value = ''
            password.value = ''
            imageCode.value = ''
            this.imageCodeUrl = getUrl()['imageCode'] + '?val=' + (new Date().getTime())
            loginButton.innerHTML = '登陆'
          }
        })
      },
      enterClick (event) {
        if (event.keyCode === 13) {
          this.logIn()
        }
      },
      changeImageCode () {
        this.imageCodeUrl = getUrl()['imageCode'] + '?val=' + (new Date().getTime())
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .please-login
    position fixed
    top 45px
    left 0
    right 0
    bottom 0
    z-index -1
    background #478aff
    overflow-x hidden
    text-align center
    .login-bg
      display none
      position fixed
      top 3em
      left 0
      z-index -1
      background #478aff
      width 100%
      height 580px
      img
        height 580px
    .dialog-wrapper
      display inline-block
      width 500px
      padding 27px 45px 40px
      background #fff
      border-radius 4px
      margin-top 5%
      .login-dialog
        padding 2em 1em
        background #fff
        border 1px solid #ccc
        .login-item
          margin 0.5em
          text-align left
          #imageCode
            width 40%
            display inline-block
          .imageCode
            float right
            width 30%
            display inline-block
            height 30px
          .changeImageCode
            float right
            height 30px
            line-height 30px
            cursor pointer
          input
            width 100%
          button
            width 100%
            display inline-block
</style>
