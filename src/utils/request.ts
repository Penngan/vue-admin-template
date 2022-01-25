import axios from 'axios'
import { notification } from 'ant-design-vue'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // 在请求发送之前做一些处理
    config.headers['Authorization'] = getToken() ?? ''
    return config
  },
  (error) => {
    // 当请求异常时做一些处理
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理
    const res = response.data
    if (res.code !== 0) {
      notification.error({
        message: res.msg ?? 'Error',
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  (error) => {
    // 当响应异常时做一些处理
    return Promise.reject(error)
  }
)

export default service
