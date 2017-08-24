<template>
  <div class="please-login">
    <div class="login-bg">
      <img src="./loginBg.jpg"/>
    </div>
    <div class="dialog-wrapper">
      <div class="login-dialog">
        <div class="login-item form-group">
          <h3>会员登陆</h3>
        </div>
        <div class="login-item form-group">
          <!--<label for="userId">用户名</label>-->
          <input type="text" id="userId" placeholder="用户名" class="form-control">
        </div>
        <div class="login-item form-group">
          <!--<label for="password">密码</label>-->
          <input type="text" id="password" placeholder="密码" class="form-control">
        </div>
        <div class="login-item">
          <button @click="logIn" id="loginButton" class="btn btn-primary">登陆</button>
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
    methods: {
      logIn () {
        let loginButton = document.getElementById('loginButton')
        let userId = document.getElementById('userId')
        let password = document.getElementById('password')

        loginButton.innerHTML = '请稍等...'
        this.$http.post(getUrl()['login'], {
          'userId': userId.value,
          'password': password.value
        }).then((res) => {
          if (res.body === 'OK') {
            localStorage.clear()
            localStorage.setItem('user', userId.value + '|' + password.value)
            loginButton.innerHTML = '登陆'
            this.$emit('logInSucceed', null)
          } else {
            alert('用户名或密码错误')
            userId.value = ''
            password.value = ''
            loginButton.innerHTML = '登陆'
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .please-login
    width 100%
    overflow-x hidden
    text-align center
    .login-bg
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
      margin-top 150px
      margin-left 300px
      padding 10px
      background rgba(255, 255, 255, 0.3)
      .login-dialog
        padding 2em 1em
        background #fff
        border 1px solid #ccc
        .login-item
          margin 0.5em
          input
            width 100%
          button
            width 100%
            display inline-block
</style>
