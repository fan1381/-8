import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: './Login'
},
{
  path: '/home',
  name: 'home',
  component: Home,
  children: [{
    path: 'comment',
    component: () =>
                import('../views/comment')
  }, {
    path: 'material',
    component: () =>
                import('../views/material')
  }, {
    path: 'articles',
    component: () =>
                import('../views/articles')
  }]
}, {
  path: '/login',
  component: Login
}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //             import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
