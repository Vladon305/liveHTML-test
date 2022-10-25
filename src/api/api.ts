import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://live-html-test.onrender.com/api/',
})

export const api = {
  get: (url: string) => instance.get(url).then((res) => res.data),
  post: (url: string, body: any) => instance.post(url, body).then((res) => res.data),
  delete: (url: string) => instance.delete(url).then((res) => res.data),
}
