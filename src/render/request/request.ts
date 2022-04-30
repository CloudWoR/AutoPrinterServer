import axios from 'axios';

// 封装拦截器

// 创建实例
const instance = axios.create({
  baseURL: 'http://120.24.64.5:8088/mall-admin/',
  timeout: 15000,
})

// 请求拦截
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = token;
  }
  return config;
}, err => {
  return Promise.reject(err);
})

// 响应拦截
instance.interceptors.response.use(result => {
  return result.data;
}, err => {
  return Promise.reject(err);
});

export default instance;
