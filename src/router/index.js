import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
import Register from '../views/Register'
import { Model } from 'echarts'
Vue.use(VueRouter)

const routes = [
  //主路由
    {
      path: '/',
      component: Main,
      redirect: 'home',
      children: [
        //子路由
        {path: 'home', name: 'home', component: Home},//首页
        {path: 'user', name: 'user', component: User},//用户管理
        {path: 'mall', name: 'mall', component: Mall},//商品管理
        {path: 'page1', name: 'page1', component: PageOne},//页面1
        {path: 'page2', name: 'page2', component: PageTwo},//页面2
      ]
    },
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    }
  ]

const router = new VueRouter({
  routes,// (缩写) 相当于 routes: routes
  mode:'history',
})

export default router
