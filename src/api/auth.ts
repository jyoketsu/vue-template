import { request } from "@/api/index";

export function login(username: string, password: string) {
  return request.post("/api/auth/login", {
    username,
    password,
  });
}

export function register(username: string, password: string) {
  return request.post("/api/auth/register", {
    username,
    password,
  });
}

export function loginByToken(token: string) {
  return request.get("/api/auth", { token });
}
