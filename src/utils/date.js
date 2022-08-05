// import dayjs from 'dayjs' // ES 2015
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh' // 集成中文require('dayjs/locale/de')
const dayjs = require('dayjs')
export const timeAgo = (targetTime) => {
  // 格式化时间
  dayjs.extend(relativeTime)
  dayjs.locale('zh')// 改变全局语言设置
  const a = dayjs()
  const b = dayjs(targetTime)

  return a.to(b) // 返回多长时间以前
}
