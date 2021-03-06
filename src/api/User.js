import request from '@/utils/request'
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}
/**
 *
 * @param {mobile,code} param0
 * @return promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: 'authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}
