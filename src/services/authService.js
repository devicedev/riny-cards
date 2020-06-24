import http from "./httpService";
import jwtDecode from "jwt-decode";

const {REACT_APP_JWT_TOKEN_KEY} = process.env

const apiEndpoint = `auth`;

http.setJwt(getJwt());

async function login(email, password) {
  const {
    data: { token }
  } = await http.post(apiEndpoint, { email, password });
  loginJwt(token);
  http.setJwt(token)
}
function loginJwt(token) {
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
