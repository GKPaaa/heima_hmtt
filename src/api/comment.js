import request from '@/utils/request'

/**
 *
 * @param type 评论类型 a是对文章的评价，c是对评论的回复
 * @param source 源id，文章id或评论id
 * @param offset 获取评论数据的偏移量，值为评论id
 * @param limit 获取的评论数据个数，不传表示采用后端服务设定的默认煤业数据量
 * @returns
 */
export const getCommentList = ({
  type,
  source,
  offset,
  limit
}) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

/**
 *  点赞
 * @param {*} target
 * @returns
 */
export const addLike = (target) => {
  return request({
    url: 'comment/likings',
    method: 'post',
    data: {
      target
    }
  })
}

/**
 *  取消点赞
 * @param {要取消点赞评论的id或评论回复id } target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'delete',
    url: `comment/likings/${target}`
  })
}

export const addComment = (data) => {
  return request({
    url: 'comments',
    method: 'post',
    data
  })
}
