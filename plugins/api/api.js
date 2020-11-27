import {post,get,patch,put} from './index'
//let baseUrl = `${window.location.protocol}//${window.location.host}`
/* let baseUrl2 = `${window.location.protocol}//${window.location.host}/maiyoucard01` */
let baseUrl = `/users`
let baseUrl1 = `/geo`
let baseUrl2 = `/search`
//let baseUrl3 = `${window.location.protocol}//${window.location.host}/maiyoucard01`
//获取微信用户信息
//export const getUserInfo = (data) => get(`${baseUrl}/maiyou-wechat-api/mp/userinfo/getUserInfo`,data)
//获取会员信息
export const verify = (data) => post(`${baseUrl}/verify`, data)
export const signup = (data) => post(`${baseUrl}/signup`, data)
export const signin = (data) => post(`${baseUrl}/signin`, data)
export const getUser = (data) => get(`${baseUrl}/getUser`, data)
export const exit = (data) => get(`${baseUrl}/exit`, data)
export const getPosition = (data) => get(`${baseUrl1}/getPosition`, data)
export const getProvince = (data) => get(`${baseUrl1}/province`, data)
export const getCity = (data) => get(`${baseUrl1}/city`, data)
export const resultsByKeywords = (data) => get(`${baseUrl2}/resultsByKeywords`, data)
export const hotCity = (data) => get(`${baseUrl1}/hotCity`, data)
export default {
  verify,
  signup,
  signin,
  getUser,
  getPosition,
  resultsByKeywords,
  getProvince,
  getCity,
  hotCity
}
