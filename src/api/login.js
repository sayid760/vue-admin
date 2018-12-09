import {get} from '@/utils/request'

export const getUserInfo = () => {
  return get('/static/login.json')
}
