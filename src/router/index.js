import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/user/User.vue'
import Roles from '../components/rights/Roles.vue'
import Right from '../components/rights/Right.vue'
import Goods from '../components/goods/Goods.vue'
import Params from '../components/goods/Params.vue'
import Categories from '../components/goods/Categories.vue'
import AddGoods from '../components/goods/AddGoods.vue'
import Orders from '../components/Orders.vue'
import Reports from '../components/Reports.vue'

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
      { path: '/rights', component: Right },
      { path: '/goods', component: Goods },
      { path: '/params', component: Params },
      { path: '/categories', component: Categories },
      { path: '/addGoods', component: AddGoods },
      { path: '/orders', component: Orders },
      { path: '/Reports', component: Reports }
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
