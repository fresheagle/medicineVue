import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

const userCode = 'userCode' // 用户名
export function getUserCode() {
  return Cookies.get(userCode)
}
export function setUserCode(name) {
  return Cookies.set(userCode, name)
}
export function removeUserCode() {
  return Cookies.remove(userCode)
}

const userPassWord = 'userPassWord' // 密码
export function getUserPassWord() {
  return Cookies.get(userPassWord)
}
export function setUserPassWord(passwd) {
  return Cookies.set(userPassWord, passwd)
}
export function removeUserPassWord() {
  return Cookies.remove(userPassWord)
}

const menuPath = 'menuPath' // 目录结构
export function getMenuPath() {
  return Cookies.get(menuPath)
}
export function setMenuPath(menu) {
  return Cookies.set(menuPath, menu)
}
export function removeMenuPath() {
  return Cookies.remove(menuPath)
}
