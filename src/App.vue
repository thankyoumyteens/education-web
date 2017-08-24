<template>
  <div id="app">
    <div class="nav-bar">
      <div class="logo">
        <img src="" alt="logo">
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
      </div>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <div class="foot">
      优仕通经济师网
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'app'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
