import request from '@/utils/request'
import {urlencodedHeader} from "./common";



export const loginApi = (username, password) => {
  return request.post('/auth/login', '', { headers : urlencodedHeader, params: { username, password }})
}

export const logoutApi = () => {
  return request.post('/auth/logout')
}

export const getUserInfoApi = token => {
  return request.get('/login/info', { params: { token } })
}
