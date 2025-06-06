import { request } from "@/api/index";
import Cookies from "js-cookie";

export function login(username: string, password: string, captcha: string) {
  return request.post("/api/auth/login", {
    username,
    password,
    captcha,
  });
}

export function logout() {
  return request.post("/api/auth/token/logout", {
    refreshToken: Cookies.get('refresh_token'),
    accessToken: Cookies.get('token')
  });
}

export function register(username: string, password: string) {
  return request.post("/api/auth/register", {
    username,
    password,
  });
}

export function loginByToken() {
  return request.get("/api/auth");
}

export function refreshToken() {
  return request.post("/api/auth/token/refresh", {
    refreshToken: Cookies.get("refresh_token")
  });
}

export function updateUser(id: string, username?: string, avatar?: string) {
  return request.put("/api/auth", { id, username, avatar });
}

export function changePassword(
  username: string,
  password: string,
  newPassword: string
) {
  return request.post("/api/auth/changePassword", {
    username,
    password,
    newPassword,
  });
}

export async function getCaptcha() {
  try {
    // 获取 Captcha
    const response = await fetch("/api/captcha");
    // 获取 Captcha-Id
    const captchaId = response.headers.get("Captcha-Id");
    const blob = await response.blob();
    // 保存 Captcha-Id
    sessionStorage.setItem("captchaId", captchaId || "");
    // 返回 Blob
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to fetch captcha:", error);
  }
}
