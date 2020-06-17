import http from "./httpService";
import { apiUrl } from "../config";

const apiEndpoint = `${apiUrl}users`;

export function register(user) {
  return http.post(apiEndpoint, user);
}
