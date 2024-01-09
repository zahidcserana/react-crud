import request from '@/utils/request'
import { config } from '../utils/config'

const url = config.api_url

export function storePayment (data) {
  return request({
    url: `${url}payment`,
    method: 'post',
    data
  })
}

export function updatePayment (data) {
  return request({
    url: `${url}payment/${data.id}`,
    method: 'put',
    data
  })
}

export function payments (data) {
  return request({
    url: `${url}payment`,
    method: 'get',
    params: data
  })
}

export function removePayment (data) {
  return request({
    url: `${url}payment/${data.id}`,
    method: 'delete'
  })
}

export function payment (dataId) {
  return request({
    url: `${url}payment/${dataId}`,
    method: 'get'
  })
}

export function adjustPayment (id) {
  return request({
    url: `${url}payment/adjust/${id}`,
    method: 'post'
  })
}
