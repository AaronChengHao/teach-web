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

export function getInvoiceList(params) {
  return request({
    url: '/t/invoices',
    method: 'get',
    params
  })
}

export function createInvoice(params) {
  return request({
    url: '/t/invoices',
    method: 'post',
    params
  })
}

export function deleteInvoice(id) {
  return request({
    url: `/t/invoices/${id}`,
    method: 'delete'
  })
}


export function sendInvoice(id) {
  return request({
    url: `/t/invoices/${id}/send`,
    method: 'post'
  })
}

export function getStudentList(params) {
  return request({
    url: '/t/students',
    method: 'get',
    params
  })
}
