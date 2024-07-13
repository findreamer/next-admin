import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constant";
export function getToken() {
  return Cookies.get(ACCESS_TOKEN);
}

export function setToken(token: string) {
  return Cookies.set(ACCESS_TOKEN, token);
}

export function remveToken() {
  return Cookies.remove(ACCESS_TOKEN);
}
