const signupSuccess = (state) => state.auth.signupSuccess
const signupMessage = (state) => state.auth.signupMessage
const isAuthenticated = (state) => state.auth.isAuthenticated
const isAuthorized = (state) => state.auth.isAuthorized

export default {
  signupSuccess,
  signupMessage,
  isAuthenticated,
  isAuthorized,
}