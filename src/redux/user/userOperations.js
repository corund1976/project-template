/* eslint-disable camelcase */
import * as Sentry from '@sentry/react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader } from 'redux/app/appSlice';
import { resetUser, setAvatarId, setAvatarURL, setUser } from 'redux/user/userSlice';

import authOperations from 'redux/auth/authOperations';

import userService from 'services/userService';

const getAvatar = () => async dispatch => {
  try {
    const response = await userService.getAvatar()

    if (response) {
      const array = response.data

      if (array.length) {
        const { avatar, id } = array[array.length - 1]

        dispatch(setAvatarURL(avatar));
        dispatch(setAvatarId(id));
      } else {
        dispatch(setAvatarURL(null));
        dispatch(setAvatarId(null));
      }
    }
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request GetAvatar failure')
  }
}

const getUser = () => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await userService.getUser()

    if (response) {
      const {
        is_active,
        id, email, telegram,
        balance,
        ref_code, rang,
        kyc,
      } = response.data.user

      if (!is_active) {
        dispatch(authOperations.logout())
        return
      }

      const currentUser = {
        id,
        email,
        telegram,
        balance: Number(balance.toFixed(2)),
        refCode: ref_code,
        partnerRang: rang,
        kyc,
      }

      dispatch(setUser(currentUser))
      dispatch(getAvatar())

    }
  } catch (e) {
    if (e.response?.status === 429) {
      Notify.failure('Too much requests - try later ...')
      Sentry.captureException(e)
      dispatch(resetUser())
      return
    }

    Sentry.captureException(e)
    // Notify.failure(e.response?.data?.message || 'Request GetUser failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const updateAvatar = (file) => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const formData = new FormData

    formData.append("avatar", file);

    const response = await userService.updateAvatar(formData)

    if (response) {
      const { avatar, id } = response.data

      dispatch(setAvatarURL(avatar || null));
      dispatch(setAvatarId(id || null));
    }
  } catch (e) {
    Notify.warning(e.response?.data?.message || 'Unsupported image format.')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const deleteAvatar = (avatarId) => async dispatch => {
  try {
    const response = await userService.deleteAvatar(avatarId)

    if (response) {
      dispatch(setAvatarURL(null))
      dispatch(setAvatarId(null));
    }
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request DeleteAvatar failure')
  }
}

const changePassword = (credentials) => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    await userService.changePassword(credentials)

  } catch (e) {
    Sentry.captureException(e)
    Notify.failure(e.response?.data?.message || 'Request ChangePassword failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  getUser,
  getAvatar,
  updateAvatar,
  deleteAvatar,
  changePassword,
}
