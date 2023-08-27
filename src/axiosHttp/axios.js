import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

const $axios = axios.create()

$axios.interceptors.request.use(
  config => config,
  error => {
    throw error
  }
)

$axios.interceptors.response.use(
  response => response,
  error => {
    throw error
  }
)

export default $axios