import http from "./httpService";
import jwtDecode from "jwt-decode";

const {REACT_APP_JWT_TOKEN_KEY} = process.env

const apiEndpoint = `auth`;

http.setJwt(getJwt());

async function login(credentials) {
  const {
    data: { token }
  } = await http.post(apiEndpoint, credentials);
  loginJwt(token);
}
function loginJwt(token) {
  http.setJwt(token)
  localStorage.setItem(REACT_APP_JWT_TOKEN_KEY, token);
}
function getJwt() {
  return localStorage.getItem(REACT_APP_JWT_TOKEN_KEY);
}
function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}
function logoutJwt() {
  localStorage.removeItem(REACT_APP_JWT_TOKEN_KEY);
}
export default { getCurrentUser, getJwt, login, loginJwt, logoutJwt };
