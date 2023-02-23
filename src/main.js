import Vue from 'vue'
import App from './App.vue'
import './element/index.js'
import router from './router'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'


Vue.config.productionTip = false

router.beforeEach((to,from,next) =>{
  const token = Cookie.get('token')
  if(!token ){
    if (to.path !== '/login' && to.path !== '/register') {
      next('/login');
    } else {
      next();
    }
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else if(token && to.name === 'register'){
    next({name:'home'})
  }else{
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
