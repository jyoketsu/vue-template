import { request } from "@/api/index";

const API_URL = import.meta.env.VITE_API_URL;

export function login(username: string, password: string) {
  return request.get(API_URL + "/user/login", {
    username,
    password,
  });
}

export function loginByToken(token: string) {
  return request.get(API_URL + "/user", { token });
}

export function getUptoken() {
  return request.get(API_URL + "/account/qiniuToken", {
    target: "cdn-soar",
  });
}
