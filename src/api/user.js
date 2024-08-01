import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/t/me',
    method: 'get',
    headers:{Authorization:`Bearer ${token}`}
    // params: { token }
  })
}

export function getStudentInfo(token) {
  return request({
    url: '/s/me',
    method: 'get',
    headers:{Authorization:`Bearer ${token}`}
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
