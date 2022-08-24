import request from '@/utils/request'

// 用户列表
export function getKeyConfigure(params) {
  return request({
    url: '/keyconfigure/',
    method: 'get',
    params
  })
}

export function deleteKeyConfigure(keyconfigureid) {
  return request({
    url: '/keyconfigure/' + keyconfigureid + '/',
    method: 'delete'
  })
}

export function addKeyConfigure(params) {
  return request({
    url: '/keyconfigure/',
    method: 'post',
    data: params
  })
}

export function updateKeyConfigure(keyconfigureid, params) {
  return request({
    url: '/keyconfigure/' + keyconfigureid + '/',
    method: 'put',
    data: params
  })
}
