import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUserCode, setUserCode, removeUserCode, getUserPassWord, setUserPassWord, removeUserPassWord, setMenuPath, removeMenuPath,setRoleCode } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menus: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.userCode.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.userPassWord).then(response => {
          const data = response.data
          commit('SET_NAME', data.userCode)
          commit('SET_ROLES', 'admin')
          setUserCode(data.userCode)
          setRoleCode(JSON.stringify(data.roleCodes))
          setUserPassWord(userInfo.userPassWord)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          // commit('SET_MENUS',data.userPrivilege)
          localStorage.setItem('curMenus', JSON.stringify(data.userPrivilege))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      const curUserName = getUserCode()
      const curUserPasswd = getUserPassWord()
      return new Promise((resolve, reject) => {
        login(curUserName, curUserPasswd).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_MENUS', data.userPrivilege)
          commit('SET_ROLES', 'admin')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      removeToken()
      removeUserCode()
      removeUserPassWord()
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
