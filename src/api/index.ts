import { useMessage } from "@/Hooks/message";
import axios from "axios";
let token = localStorage.getItem("auth_token") || "";

export const request = {
  get(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "get",
          url: path,
          params: params,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  post(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "post",
          url: path,
          data: params,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  put(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "put",
          url: path,
          data: params,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  patch(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "patch",
          url: path,
          data: params,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  delete(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "delete",
          url: path,
          data: params,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export function setToken(_token: string) {
  localStorage.setItem("auth_token", _token);
  token = _token;
}

export function rmvToken() {
  localStorage.removeItem("auth_token");
  token = "";
}

export function getToken() {
  return token;
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 检查 URL 是否包含 `/api`
    if (config.url && /\/api/.test(config.url)) {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    // 检查 URL 是否包含 `/login`
    if (config.url && /\/login/.test(config.url)) {
      const captchaId = sessionStorage.getItem("captchaId");
      if (captchaId) {
        // 设置 Captcha-Id 头部
        config.headers["Captcha-Id"] = captchaId;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   // 处理未认证错误，例如跳转到登录页
    //   rmvToken();
    //   window.location.href = "/login";
    // }

    return useMessage().error(
      error.response && error.response.data
        ? error.response.data.message
        : error.message
    );
  }
);
