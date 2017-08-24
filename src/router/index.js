import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Course from '@/components/Course/Course'
import Exams from '@/components/Exams/Exams'
import Live from '@/components/Live/Live'
import User from '@/components/User/User'
import PleaseLogIn from '@/components/PleaseLogIn/PleaseLogIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Course',
      name: 'Course',
      component: Course
    },
    {
      path: '/Exams',
      name: 'Exams',
      component: Exams
    },
    {
      path: '/Live',
      name: 'Live',
      component: Live
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/PleaseLogIn',
      name: 'PleaseLogIn',
      component: PleaseLogIn
    }
  ]
})
