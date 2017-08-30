<template>
  <div class="register" @keyup="enterClick($event)">
    <div class="login-bg">
      <img src="./loginBg.jpg"/>
    </div>
    <div class="dialog-wrapper">
      <div class="login-dialog">
        <div class="login-item form-group">
          <h3>会员注册</h3>
        </div>
        <div class="login-item form-group">
          <input type="text" id="userId" placeholder="手机号" tabindex="1" class="form-control">
        </div>
        <div class="login-item form-group">
          <input type="password" id="password" placeholder="密码" tabindex="2" class="form-control">
        </div>
        <div class="login-item">
          <button @click="register" id="regButton" class="btn btn-primary" tabindex="3">注册</button>
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
      mounted () {
        document.getElementById('userId').focus()
      },
      register () {
        let regButton = document.getElementById('regButton')
        let userId = document.getElementById('userId')
        let password = document.getElementById('password')

        regButton.innerHTML = '请稍等...'
        this.$http.post(getUrl()['register'], {
          'userId': userId.value,
          'password': password.value
        }).then((res) => {
          if (res.body === 'OK') {
            sessionStorage.clear()
            sessionStorage.setItem('uid', userId.value)
            sessionStorage.setItem('accessLevel', 0)
            sessionStorage.setItem('nickname', userId.value)
            regButton.innerHTML = '注册'
            this.$emit('logInSucceed', null)
          } else {
            alert(res.body)
            userId.value = ''
            password.value = ''
            regButton.innerHTML = '注册'
          }
        })
      },
      enterClick (event) {
        if (event.keyCode === 13) {
          this.register()
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .register
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
