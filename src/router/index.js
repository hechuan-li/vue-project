import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/user/User.vue'
import Roles from '../components/rights/Roles.vue'
import Right from '../components/rights/Right.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/users', component: User },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Right }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const myToken = window.sessionStorage.getItem('token')
  if (!myToken) {
    next('/login')
  }
  next()
})

export default router
