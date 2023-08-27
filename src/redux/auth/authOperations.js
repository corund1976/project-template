import * as Sentry from '@sentry/react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader, setDisplayModal } from 'redux/app/appSlice';
import {
  setSignupSuccess,
  setIsAuthenticated,
  setIsAuthorized,
  setSignupMessage,
  resetAuth,
} from 'redux/auth/authSlice';
import { resetUser } from 'redux/user/userSlice';

import authService from 'services/authService';

const signup = credentials => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await authService.signup(credentials)

    if (response) dispatch(setSignupSuccess(true))

  } catch (e) {
    if (e.response?.status === 400 && e.response?.data?.email) {
      dispatch(setSignupMessage('email used'))
      return
    }

    Sentry.captureException(e)
    Notify.failure(e.response?.data?.message || 'Request Signup failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const loginFirst = credentials => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await authService.loginFirst(credentials)

    if (response) {
      const { token } = response.data

      localStorage.setItem('app-token', token)

      dispatch(setIsAuthenticated(true))
    }
  } catch (e) {
    if (e.response.status === 401) {
      Sentry.captureException(e)
      Notify.failure('Логин или пароль не найдены')
      return
    };

    Sentry.captureException(e)
    Notify.failure(e.response?.data?.message || 'Request Login Step1 failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const loginSecond = credentials => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await authService.loginSecond(credentials)

    if (response) dispatch(setIsAuthorized(true))
  } catch (e) {
    if (e.response.status === 401) {
      Sentry.captureException(e)
      Notify.failure('Проверочный код не найден')
      return
    };

    Sentry.captureException(e)
    Notify.failure(e.response?.data?.message || 'Request Login Step2 failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const logout = () => async dispatch => {
  dispatch(resetUser())
  dispatch(resetAuth())
  localStorage.removeItem('app-token')
}

const forgotPassword = credentials => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await authService.forgotPassword(credentials)

    if (response) {
      dispatch(setDisplayModal(true))
    }
  } catch (e) {
    Sentry.captureException(e)
    Notify.failure(e.response?.data?.message || 'Request ForgotPassword failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

// Пока не используется
const resetPassword = credentials => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await authService.resetPassword(credentials)

    if (response) {
      dispatch(setDisplayModal(true))
    }
  } catch (e) {
    Sentry.captureException(e)
    Notify.failure(e.response?.data?.message || 'Request ResetPassword failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const refreshToken = async () => {
  const accessToken = localStorage.getItem('app-token')

  if (!accessToken) return

  try {
    const response = await authService.refreshToken()

    if (response) {
      const { token } = response.data

      localStorage.setItem('app-token', token)
    }
  } catch (e) {
    // Notify.failure(e.response?.data?.message || 'Request RefreshToken failure')
  }
}

export default {
  signup,
  loginFirst,
  loginSecond,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
}