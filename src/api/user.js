import request from '@/utils/request.js'
import { Exception } from 'sass'

//注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

//登录接口
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

export const userGetUserInfo = () => {
  return request.get('/my/userinfo')
}

export const userUpdateInfoService = (data) => request.put('/my/userinfo', data)

export const userUpateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

export const userUpdatePwdService = (data) =>
  request.patch('/my/updatepwd', data)
