import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const RoleKey = 'lb_role'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeAll() {
  Cookies.remove(TokenKey)
  Cookies.remove(RoleKey)
}

export function getRole() {
  return Cookies.get(RoleKey)
}

export function setRole(role) {
  return Cookies.set(RoleKey, role)
}
