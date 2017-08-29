// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.productionTip = false

// 以form data 方式进行post请求
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}

router.beforeEach(function (to, from, next) {
  // 未登录状态只能访问PleaseLogIn 和 Home
  if (to.path === '/') {
    next({
      path: '/Home'
    })
  } else if (
    to.path === '/Exams' ||
    to.path === '/FreeCourse'
  ) {
    // 普通会员以上可用
    if (!sessionStorage.getItem('accessLevel')) {
      // 未登录
      next({ path: '/PleaseLogIn' })
    } else {
      let accessLevel = parseInt(sessionStorage.getItem('accessLevel'))
      if (accessLevel >= 0) {
        // 放行
        next()
      } else {
        // 无访问权限
        next({ path: '/NoPermission' })
      }
    }
  } else if (
    to.path === '/Course' ||
    to.path === '/Simulation' ||
    to.path === '/Live'
  ) {
    // 超级会员可用
    if (!sessionStorage.getItem('accessLevel')) {
      // 未登录
      next({ path: '/PleaseLogIn' })
    } else {
      let accessLevel = parseInt(sessionStorage.getItem('accessLevel'))
      if (accessLevel === 1) {
        // 放行
        next()
      } else {
        // 无访问权限
        next({ path: '/NoPermission' })
      }
    }
  } else {
    // 可直接访问的页面
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
