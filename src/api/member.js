import request from '../utils/request'

// 查询所有用户接口
export function getUserList(params) {
  return request({
    url: '/api/user/page/',
    method: 'get',
    params
  })
}
// 新增用户
export function toAddUser(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}
// 编辑用户
export function toEditUser(data) {
  return request({
    url: '/api/user',
    method: 'put',
    data
  })
}
// 删除用户
export function toDeleteUser(data) {
  return request({
    url: '/api/user',
    method: 'delete',
    data
  })
}
// 查询角色列表
export function getRoleList(params) {
  return request({
    url: '/api/role/page/',
    method: 'get',
    params
  })
}
// 新增角色
export function toAddRole(data) {
  return request({
    url: '/api/role',
    method: 'post',
    data
  })
}
// 新增角色
export function toEditRole(data) {
  return request({
    url: '/api/role',
    method: 'put',
    data
  })
}
// 删除角色
export function toDeleteRole(data) {
  return request({
    url: '/api/role',
    method: 'delete',
    data
  })
}
// 查询用户关联角色
export function getUserAndRoleList(userCode) {
  return request({
    url: '/api/role/userAndRole/?userCode=' + userCode,
    method: 'get'
  })
}

// 用户添加角色
export function toAddUserRole(data) {
  return request({
    url: '/api/user/addRole',
    method: 'post',
    data
  })
}

