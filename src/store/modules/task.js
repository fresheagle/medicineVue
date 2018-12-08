import { getDepartmentList } from '@/api/task'

const task = {
  state: {
    departmentList:[],
  },

  mutations: {
    SET_DEPARTMENTLIST: (state, departmentList) => {
      state.departmentList = departmentList
    },

  },

  actions: {
    // 登录
    getDepartment({ commit }, param) {
      return new Promise((resolve, reject) => {
        getDepartmentList(param).then(response => {
          const data = response.data;
          commit('SET_DEPARTMENTLIST', data.params)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default task
