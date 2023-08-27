/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as Sentry from '@sentry/react';

import authOperations from 'redux/auth/authOperations';

import store from 'redux/store'
// import checkTokenLifetime from 'utils/checkTokenLifetime';

const { dispatch } = store; // direct access to redux store

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

const $api = axios.create()

$api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('app-token')
    // checkTokenLifetime()
    config.headers.Authorization = `Bearer ${accessToken}`
    // eslint-disable-next-line consistent-return
    return config
  },
  error => {
    throw error
  }
)

$api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config
    // при просрочке токена и получении 401 пытаюсь повторить
    // запрос, предварительно обновив токен с помощью куки через ендпоинт Refresh
    if (error.response.status === 401
      && error.config
      && !error.config.isRetry) {

      error.config.isRetry = true

      try {
        await authOperations.refreshToken()
        // console.log('try refresh');
        await $api.request(originalRequest)
      } catch (e) {
        // если снова получаю 401 (возможно, если куки нет) - разлогиниваю
        if (e.response?.status === 401) {
          // console.log('catch 401 again - logout');
          dispatch(authOperations.logout())

          Sentry.captureException(e)
          // Notify.failure('Неавторизованный пользователь. Войдите заново')
          return
        }

        Sentry.captureException(e)
        Notify.failure(e.message || 'Not authorized. Axios response interceptor error');
      }
    }

    throw error
  }
)

export default $api