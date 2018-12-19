import request from '@/utils/request'

export function login(userCode, userPassWord) {
  return request({
    url: '/api/tokens' + '?userCode=' + userCode + '&userPassWord=' + userPassWord,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info' + '?username=' + token,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
