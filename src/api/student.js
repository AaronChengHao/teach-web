import request from '@/utils/request'

export function getCourseList(params) {
  return request({
    url: '/s/courses',
    method: 'get',
    params
  })
}

export function createCourse(params) {
  return request({
    url: '/s/courses',
    method: 'post',
    params
  })
}
export function updateCourse(params, id) {
  return request({
    url: `/s/courses/${id}`,
    method: 'patch',
    params
  })
}

export function deleteCourse(id) {
  return request({
    url: `/s/courses/${id}`,
    method: 'delete'
  })
}

export function getInvoiceList(params) {
  return request({
    url: '/s/invoices',
    method: 'get',
    params
  })
}

export function createInvoice(params) {
  return request({
    url: '/s/invoices',
    method: 'post',
    params
  })
}

export function deleteInvoice(id) {
  return request({
    url: `/s/invoices/${id}`,
    method: 'delete'
  })
}


export function sendInvoice(id) {
  return request({
    url: `/s/invoices/${id}/send`,
    method: 'post'
  })
}

export function getStudentList(params) {
  return request({
    url: '/s/students',
    method: 'get',
    params
  })
}

export function omiseCardPay(invoiceId, params) {
  return request({
    url: `/s/invoices/${invoiceId}/card-pay`,
    method: 'post',
    params
  })
}
