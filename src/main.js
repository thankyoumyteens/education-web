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
  } else if (to.path === '/PleaseLogIn' || to.path === '/Home') {
    next()
  } else {
    if (!sessionStorage.getItem('uid')) {
      next({
        path: '/PleaseLogIn'
      })
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
