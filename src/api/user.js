import service from '../utils/request'
import { config } from '../utils/config'

const url = config.api_url

export function getUsers(data) {
  return service({
    url: `${url}users`,
    method: 'get',
    params: data,
  })
}

export function getUser(id) {
  return service({
    url: `${url}users/${id}`,
    method: 'get',
  })
}

export function addUser(data) {
  return service({
    url: `${url}users`,
    method: 'post',
    data,
  })
}

export function editUser(data) {
  return service({
    url: `${url}users/${data.id}`,
    method: 'patch',
    data,
  })
}

export function login(data) {
  return service({
    url: `${url}login`,
    method: 'post',
    data,
  })
}
