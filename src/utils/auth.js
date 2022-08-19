import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'
const TokenKey = 'Token'
// const UserKey = 'username'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}