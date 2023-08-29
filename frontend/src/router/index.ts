import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserIputs from '../views/UserInputsView.vue'
import EditingView from '../views/EditingView.vue'

const routes: Array<RouteRecordRaw> = [
  // to be replaced?
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    //default first page
  
    path: '/',
    name: 'user-inputs',
    component: UserIputs
  },
  {
    //default first page
  
    path: '/editing-view',
    name: 'editing-view',
    component: EditingView,
    props: true
  },
  

  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
