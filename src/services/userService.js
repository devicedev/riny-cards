import http from './httpService'

const apiEndpoint = `users`

function register(user) {
  return http.post(apiEndpoint, user)
}

export default { register }
