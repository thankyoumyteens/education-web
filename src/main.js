// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  // 未登录状态只能访问PleaseLogIn 和 Home
  if (to.path === '/PleaseLogIn' || to.path === '/Home') {
    next()
  } else {
    if (!localStorage.getItem('user')) {
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
