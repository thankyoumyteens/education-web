import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import FreeCourse from '@/components/Course/FreeCourse'
import Course from '@/components/Course/Course'
import Simulation from '@/components/Exams/Simulation'
import Exams from '@/components/Exams/Exams'
import Live from '@/components/Live/Live'
import User from '@/components/User/User'
import NoPermission from '@/components/PleaseLogIn/NoPermission'
import PleaseLogIn from '@/components/PleaseLogIn/PleaseLogIn'
import About from '@/components/About/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/FreeCourse',
      name: 'FreeCourse',
      component: FreeCourse
    },
    {
      path: '/Course',
      name: 'Course',
      component: Course
    },
    {
      path: '/Simulation',
      name: 'Simulation',
      component: Simulation
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
      path: '/NoPermission',
      name: 'NoPermission',
      component: NoPermission
    },
    {
      path: '/PleaseLogIn',
      name: 'PleaseLogIn',
      component: PleaseLogIn
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
