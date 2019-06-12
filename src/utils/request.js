import axios from 'axios'
import store from '@/store'
import {Message, Notice} from 'iview'
import {getToken, removeToken} from '@/utils/auth'

const repeatMsg = 'REPEATREQUEST'
const { CancelToken } = axios

// TODO Better message: apply and operation
/**
 * prompt function
 * @param {String} msg
 */
const tip = msg => {
  Message.error({
    content: msg,
    duration: 10
  })
}

/**
 * Serialization parameter
 * @param  {Object}    params
 * @return {encode}    encodeURI
 */

// function paramsSerializer(params) {
//   let result = []
//   for (let i in params) {
//     let isObject = params.hasOwnProperty(i) && typeof params[i] !== 'string'
//     isObject ? result.push(`${i}=${JSON.stringify(params[i])}`) : result.push(`${i}=${params[i]}`)
//   }
//   return encodeURI(result.join('&'))
// }

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  // paramsSerializer: paramsSerializer,
  withCredentials: true
})

/**
 * request interceptor
 * @param  {Object} config
 * @return {Object}
 */
request.interceptors.request.use(
  config => {
    // token
    const token = store.state.user.token;
    token && (config.headers['Authorization'] = getToken());

    return config
  },
  error => {
    // Do something with request error
    // eslint-disable-next-line
    console.log(error);
    Promise.reject(error)
  }
);

/**
 * response interceptor
 * @param  {Object} response
 * @return {Object}
 */
request.interceptors.response.use(
  response => response,
  error => {
    // eslint-disable-next-line
    const { response, message } = error;
    console.log(`response: ${response}; message: ${message}`)
    if (response) {
      switch (response.status) {
        case 401:
          Notice.error({ title: '请先登录', desc: '请登录以验证身份' });break;
        case 403:
          Notice.error({ title: '权限不足', desc: '你当前没有权限执行此操作'});break;
        default:
          tip(`请求失败: ${response.status}`)
      }
      return Promise.reject(response)
    } else if (message === repeatMsg) {
      tip('Repeat message')
    } else {
      // To deal with broken network
      tip('未能连接到服务器')
    }
  }
)

export default request
