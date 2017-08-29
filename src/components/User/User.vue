<template>
  <div class="user-profile">
      <h3>个人中心</h3>
      <ul class="tab-list nav nav-pills">
        <li role="presentation" class="tab-item" :class="{'active':currentTabIndex===1}" @click="changeTab(1)"><a>账户信息</a></li>
        <li role="presentation" class="tab-item" :class="{'active':currentTabIndex===2}" @click="changeTab(2)"><a>身份信息</a></li>
        <li role="presentation" class="tab-item" :class="{'active':currentTabIndex===3}" @click="changeTab(3)"><a>其他</a></li>
        <li role="presentation" class="tab-item active" @click="edit" v-show="!isEdit"><a>编辑</a></li>
        <li role="presentation" class="tab-item active" @click="saveUpdate" v-show="isEdit"><a>保存</a></li>
      </ul>
      <div class="tab-show" v-if="profile !== null">
        <div class="tab-show-item" v-show="currentTabIndex===1">
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">手机</label>
            <span class="item-text" v-show="!isEdit">{{profile['uid']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="uid" disabled :value="profile['uid']">
          </div>
          <div class="tab-show-item form-group">
            <label for="mail" class="control-label">邮箱</label>
            <span class="item-text" v-show="!isEdit">{{profile['mail']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="mail" :value="profile['mail']">
          </div>
        </div>
        <div class="tab-show-item" v-show="currentTabIndex===2">
          <div class="tab-show-item form-group">
            <label for="nickname" class="control-label">昵称</label>
            <span class="item-text" v-show="!isEdit">{{profile['nickname']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="nickname" :value="profile['nickname']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">姓名</label>
            <span class="item-text" v-show="!isEdit">{{profile['name']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="name" :value="profile['name']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">性别</label>
            <span class="item-text" v-show="!isEdit">{{profile['gender']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="gender" :value="profile['gender']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">身份证号</label>
            <span class="item-text" v-show="!isEdit">{{profile['idCard']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="idCard" :value="profile['idCard']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">学号</label>
            <span class="item-text" v-show="!isEdit">{{profile['schoolCard']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="schoolCard" :value="profile['schoolCard']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">住址</label>
            <span class="item-text" v-show="!isEdit">{{profile['address']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="address" :value="profile['address']">
          </div>
        </div>
        <div class="tab-show-item" v-show="currentTabIndex===3">
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">QQ号</label>
            <span class="item-text" v-show="!isEdit">{{profile['qqAccount']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="qqAccount" :value="profile['qqAccount']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">微信</label>
            <span class="item-text" v-show="!isEdit">{{profile['wechatAccount']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="wechatAccount" :value="profile['wechatAccount']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">微博</label>
            <span class="item-text" v-show="!isEdit">{{profile['weiboAccount']}}</span>
            <input type="text" class="form-control" v-show="isEdit" id="weiboAccount" :value="profile['weiboAccount']">
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
    props: [
      'profile'
    ],
    data () {
      return {
        isEdit: false,
        currentTabIndex: 1
      }
    },
    mounted () {
      console.log(this.profile)
    },
    methods: {
      changeTab (index) {
        this.isEdit = false
        this.currentTabIndex = parseInt(index)
      },
      edit () {
        this.isEdit = true
      },
      saveUpdate () {
        let uid = document.getElementById('uid').value
        switch (this.currentTabIndex) {
          case 1:
            let mail = document.getElementById('mail').value
            this.$http.post(getUrl()['updateProfile'], {
              'tabIndex': this.currentTabIndex,
              'uid': uid,
              'mail': mail
            }).then((res) => {
              let data = res.body
              if (data['status'] === 'OK') {
                sessionStorage.setItem('mail', mail)
                this.profile['mail'] = mail
                this.isEdit = false
              } else {
                alert(data['message'])
              }
            })
            break
          case 2:
            let nickname = document.getElementById('nickname').value
            let name = document.getElementById('name').value
            let gender = document.getElementById('gender').value
            let idCard = document.getElementById('idCard').value
            let schoolCard = document.getElementById('schoolCard').value
            let address = document.getElementById('address').value
            this.$http.post(getUrl()['updateProfile'], {
              'tabIndex': this.currentTabIndex,
              'uid': uid,
              'nickname': nickname,
              'name': name,
              'gender': gender,
              'idCard': idCard,
              'schoolCard': schoolCard,
              'address': address
            }).then((res) => {
              let data = res.body
              if (data['status'] === 'OK') {
                sessionStorage.setItem('nickname', nickname)
                sessionStorage.setItem('name', name)
                sessionStorage.setItem('gender', gender)
                sessionStorage.setItem('idCard', idCard)
                sessionStorage.setItem('schoolCard', schoolCard)
                sessionStorage.setItem('address', address)
                this.profile['nickname'] = nickname
                this.profile['name'] = name
                this.profile['gender'] = gender
                this.profile['idCard'] = idCard
                this.profile['schoolCard'] = schoolCard
                this.profile['address'] = address
                this.isEdit = false
              } else {
                alert(data['message'])
              }
            })
            break
          case 3:
            let qqAccount = document.getElementById('qqAccount').value
            let wechatAccount = document.getElementById('wechatAccount').value
            let weiboAccount = document.getElementById('weiboAccount').value
            this.$http.post(getUrl()['updateProfile'], {
              'tabIndex': this.currentTabIndex,
              'uid': uid,
              'qqAccount': qqAccount,
              'wechatAccount': wechatAccount,
              'weiboAccount': weiboAccount
            }).then((res) => {
              let data = res.body
              if (data['status'] === 'OK') {
                sessionStorage.setItem('qqAccount', qqAccount)
                sessionStorage.setItem('wechatAccount', wechatAccount)
                sessionStorage.setItem('weiboAccount', weiboAccount)
                this.profile['qqAccount'] = qqAccount
                this.profile['wechatAccount'] = wechatAccount
                this.profile['weiboAccount'] = weiboAccount
                this.isEdit = false
              } else {
                alert(data['message'])
              }
            })
            break
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .user-profile
    min-width 500px
    margin 0 auto
    text-align  center
    .tab-list
      display inline-block
      padding-bottom 10px
      .tab-item
        cursor pointer
    .tab-show
      border-top 1px solid #ccc
      padding-top 10px
      .tab-show-item
        label,input,span
          display inline-block
        label
          text-align left
          width 5em
        .item-text
          text-align left
          width 50%
          height 33px
          padding 6px 12px
          margin-left 10px
          border-bottom 1px solid #ccc
        .form-control
          width 50%
          margin-left 10px
</style>
