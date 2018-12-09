// import Cookies from 'js-cookie'
import { getUserInfo } from '@/api/login'

const user = {
  state: {
    user: '',
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data
    },
    SET_NAME (state, data) {
      state.name = data
    },
    SET_AVATAR (state, data) {
      state.avatar = data
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const {user, name, avatar, roles} = res.data.data
          commit('SET_USER', user)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_ROLES', roles)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }

}

export default user
