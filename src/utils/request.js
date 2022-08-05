// 封装axios
// 导入axios
import theAxios from 'axios'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net', // 设置基准地址
  timeout: 20000 // 设置超时时间
})
export default ({ url, method = 'GET', params = {}, data = {}, headers }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
