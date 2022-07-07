import request from '@/utils/request'

export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
/**
 *  关注
 * @param {用户ID} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'post',
    url: 'user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 * @param {用户ID} target
 * @returns
 */
export const delUser = (target) => {
  return request({
    method: 'delete',
    url: `user/followings/${target}`
  })
}

/**
 *  加入收藏文章
 * @param {*} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'post',
    url: 'article/collections',
    data: {
      target
    }
  })
}
/**
 * 取消收藏
 * @param {*} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'delete',
    url: `article/collections/${target}`

  })
}
