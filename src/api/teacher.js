import request from '@/utils/request'

export function getCourseList(params) {
  return request({
    url: '/t/courses',
    method: 'get',
    params
  })
}

export function createCourse(params) {
  return request({
    url: '/t/courses',
    method: 'post',
    params
  })
}
export function updateCourse(params, id) {
  return request({
    url: `/t/courses/${id}`,
    method: 'patch',
    params
  })
}

export function deleteCourse(id) {
  return request({
    url: `/t/courses/${id}`,
    method: 'delete'
  })
}
