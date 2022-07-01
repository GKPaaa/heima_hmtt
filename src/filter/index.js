import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
export const dataformate = (time) => {
  return dayjs(time).fromNow()
}
