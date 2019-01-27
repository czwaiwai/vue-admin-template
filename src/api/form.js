import request from '@/utils/request'

export function create(form) {
  return request({
    url: '/create',
    method: 'post',
    data: form
  })
}
export function update(form) {
  return request({
    url: '/update',
    method: 'post',
    data: form
  })
}

export function del(id) {
  return request({
    url: '/delete',
    method: 'post',
    data: {
      id
    }
  })
}
