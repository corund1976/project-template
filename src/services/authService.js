import $axios from 'axiosHttp/axios'
import $api from 'axiosHttp/api'

const signup = async (credentials) => {
  // {
  //   "email": "gely902@gmail.com",
  //   "password": "test1234",
  //   "password_confirm": "password"
  //   "telegram": "telegramNick",
  //   "from_ref_code": "9Cg8Dl6",
  // }
  const response = await $axios.post('/api/register', credentials)
  return response
}

const loginFirst = async (credentials) => {
  // const loginFirst = async () => {
  // {
  //   "email": "admin@avrora-market.com",
  //   "password": "adminPass"
  // }
  // const response = { data: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0NiwiZXhwIjoxNjg4Mjk3NTQ2LCJpYXQiOjE2ODgyOTU3NDZ9.5XqFqPGr4-8dom0xoFU2MyvQ60DdPZKHwwezMfAA2T8' } }
  const response = await $axios.post('/api/login', credentials)
  return response
}

const loginSecond = async (credentials) => {
  // const loginSecond = async () => {
  // {
  //   "otp_code": "Cb40vv"
  // }
  // const response = { data: { message: 'success' } }
  const response = await $api.post('/api/checkotp', credentials)
  return response
}

const forgotPassword = async (credentials) => {
  // {
  //   "email": "gely902@gmail.com"
  // }
  const response = await $axios.post('/api/reset', credentials)
  return response
}

// Пока не используется
const resetPassword = async (credentials) => {
  // {
  //   "email": "admin@avrora-market.com",
  //   "token": "HB6EAsQNogktd1xKWIrznE2Zkn1h0yjO5baNdFHPCSzv6rkdwjlXVDPXHiZGkmBg2",
  //   "password": "111111111"
  // }
  const response = await $api.post('/api/reset_password', credentials)
  return response
}

const refreshToken = async () => {
  const response = await $axios.post('/api/refresh')
  return response
}

export default {
  signup,
  loginFirst,
  loginSecond,
  forgotPassword,
  resetPassword,
  refreshToken,
}