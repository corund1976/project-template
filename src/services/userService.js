import $api from "axiosHttp/api";

const getUser = async () => {
  const response = await $api.get('/api/user');
  // is_active: true

  // id: 2
  // email: "corund1976@gmail.com"
  // telegram: "corund"

  // balance: 0
  // ref_code: "3Kp3Jy4"
  // rang: "Клиент"

  // kyc: "noverif"
  return response
}

const getAvatar = async () => {
  const response = await $api.get('/avatar/')
  return response
}

const updateAvatar = async (formData) => {
  const response = await $api.post('/avatar/', formData)
  return response
}

const deleteAvatar = async (avatarId) => {
  const response = await $api.delete(`/api/avatars/${avatarId}`)
  return response
}

const changePassword = async (credentials) => {
  // {
  //   "password": "88005553535",
  //   "password_confirm": "88005553535"
  // }
  const response = await $api.post('/api/change', credentials);
  return response
}

export default {
  getUser,
  getAvatar,
  updateAvatar,
  deleteAvatar,
  changePassword,
}