import http from "./httpService";
import jwtDecode from "jwt-decode";

import { jwtTokenKey } from "../config";

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
  localStorage.setItem(jwtTokenKey, token);
}
function getJwt() {
  return localStorage.getItem(jwtTokenKey);
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
  localStorage.removeItem(jwtTokenKey);
}
export default { getCurrentUser, getJwt, login, loginJwt, logoutJwt };
