import request from '@/utils/request'

// 用户列表
export function getAliyunInstance(params) {
  return request({
    url: '/aliyuninstance/',
    method: 'get',
    params
  })
}

export function updatAliyunInstance(params) {
  return request({
    url: '/api/updatealiyuninstance/',
    method: 'get',
    params
  })
}
