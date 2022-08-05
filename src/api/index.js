import axios from '@/utils/request.js'
// import getToken from '@/utils/token.js'
// 测试接口
export const getChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels'
  })
}

// 封装登录接口
export const loginAPI = ({ mobile, code }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 获取用户频道列表
export const getUserChannelsAPI = (token) => {
  return axios({
    url: '/v1_0/user/channels',
    headers: { Authorization: `Bearer ${token}` }
  })
}

// 获取文章列表
// eslint-disable-next-line camelcase
export const getArticleListAPI = (channel_id, timestamp) => {
  return axios({
    url: '/v1_0/articles',
    params: {
      channel_id,
      timestamp
    }
  })
}

// 对文章不感兴趣
export const disLikeAticleAPI = (id, token) => {
  return axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data: {
      target: id
    }
  })
}

// 举报文章
export const reportAticleAPI = (target, type, remark, token) => {
  return axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data: {
      target, // 文章ID
      type, // 举报类型
      remark // 问题附加说明
    }
  })
}
