import axios from 'axios'
import { headers } from './auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = headers.Authorization
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    console.log('err:' + error)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    console.log('err-' + error)
    return Promise.reject(error)
  },
)

export default service
