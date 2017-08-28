<template>
  <div class="user-profile">
      <h3>个人中心</h3>
      <ul class="tab-list nav nav-pills">
        <li role="presentation" class="tab-item" :class="{'active':currentTabIndex===1}" @click="changeTab(1)"><a>账户信息</a></li>
        <li role="presentation" class="tab-item" :class="{'active':currentTabIndex===2}" @click="changeTab(2)"><a>身份信息</a></li>
        <li role="presentation" class="tab-item" :class="{'active':currentTabIndex===3}" @click="changeTab(3)"><a>其他</a></li>
      </ul>
      <div class="tab-show" v-if="profile !== null">
        <div class="tab-show-item" v-show="currentTabIndex===1">
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">手机</label>
            <input type="text" class="form-control" id="uid" :value="profile['uid']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">邮箱</label>
            <input type="text" class="form-control" id="mail" :value="profile['mail']">
          </div>
        </div>
        <div class="tab-show-item" v-show="currentTabIndex===2">
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">昵称</label>
            <input type="text" class="form-control" id="nickname" :value="profile['nickname']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">姓名</label>
            <input type="text" class="form-control" id="name" :value="profile['name']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">性别</label>
            <input type="text" class="form-control" id="gender" :value="profile['gender']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">身份证号</label>
            <input type="text" class="form-control" id="idCard" :value="profile['idCard']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">学号</label>
            <input type="text" class="form-control" id="schoolCard" :value="profile['schoolCard']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">住址</label>
            <input type="text" class="form-control" id="address" :value="profile['address']">
          </div>
        </div>
        <div class="tab-show-item" v-show="currentTabIndex===3">
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">QQ号</label>
            <input type="text" class="form-control" id="qqAccount" :value="profile['qqAccount']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">微信</label>
            <input type="text" class="form-control" id="wechatAccount" :value="profile['wechatAccount']">
          </div>
          <div class="tab-show-item form-group">
            <label for="uid" class="control-label">微博</label>
            <input type="text" class="form-control" id="weiboAccount" :value="profile['weiboAccount']">
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: [
      'profile'
    ],
    data () {
      return {
        currentTabIndex: 1
      }
    },
    mounted () {
      console.log(this.profile)
    },
    methods: {
      changeTab (index) {
        this.currentTabIndex = parseInt(index)
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
        .form-control
          width 50%
          margin-left 10px
</style>
