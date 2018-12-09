import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout/index'

Vue.use(Router)
/* 初始路由 */
export const constantRouterMap = [
  { path: '/login', component: () => import('@/pages/Login/index'), hidden: true },
  { path: '/404', component: () => import('@/pages/errorPage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    meta: {title: '首页', icon: 'home'},
    name: 'home',
    children: [{
      path: 'home',
      component: () => import('@/pages/Home/index'),
      meta: { title: '首页', noCache: true }
    }]
  }
]

const router = new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = []

export default router
