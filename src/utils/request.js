import axios from 'axios'


export const get = (url, data) => {
  return axios.get(url, {
    params: data
  })
}

export const post = (url, data) => {
  return axios.post(url, data)
}
