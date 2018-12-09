import router from './router'
import { getMenuList } from '@/api/menu'
import store from './store'

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else {
    if (role && to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.addRouters.length > 0) {
        next()
      } else {
        let asyncRouter
        let roles
        // 拿到个人资料后存入vuex
        store.dispatch('GetUserInfo').then(res => {
          roles = res.data.data.roles
          getMenuList().then(res => { // 获取路由
            asyncRouter = mergeRoutes(res.data)
          }).then(res => {
            store.dispatch('GenerateRoutes', {roles, asyncRouter}).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true })
            })
          })
        })
      }
    }
  }
})
function mergeRoutes (menus = [], routes = []) {
  menus.forEach(function (menu) {
    let temp = {
      path: menu.path,
      name: menu.name,
      component: (resolve) => require([`@/pages/${menu.component}.vue`], resolve),
      meta: {
        title: menu.title,
        icon: menu.icon
      }
    }
    if (menu.roles) {
      temp['meta']['roles'] = menu.roles
    }
    if (menu.redirect) {
      temp['redirect'] = menu.redirect
    }
    if (menu.noCache === '1') {
      temp['meta']['noCache'] = true
    }
    if (menu.hidden === '1') {
      temp['hidden'] = true
    }
    if (menu.children && menu.children.length >= 1) {
      temp['children'] = mergeRoutes(menu.children)
    }
    routes.push(temp)
  })
  return routes
}

export default router
