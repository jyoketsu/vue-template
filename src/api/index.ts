import { useMessage } from "@/Hooks/message";
import axios from "axios";
import { refreshToken } from "./auth";
import Cookies from "js-cookie";
import { ApiResponse } from "@/interface/ApiResponse";
import { User } from "@/interface/User";

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

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 检查 URL 是否包含 `/api`
    if (config.url && /\/api/.test(config.url)) {
      const token = Cookies.get('token');
      if (token) {
        // 设置 Authorization 头部
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
let isRefreshing = false; // 标志位，表示是否正在刷新 token
let pendingRequests: (() => void)[] = []; // 队列，存放待重试的请求

// 响应拦截器
axios.interceptors.response.use(
  (response) => response, // 请求成功直接返回
  async (error) => {
    const originalRequest = error.config;

    // 如果返回 403，说明需要刷新 token
    if (error.response &&
      error.response.status === 403 &&
      error.response.data.type !== 'PERMISSION_DENIED') {
      console.log("token过期，403 错误，尝试刷新 token");

      // 如果已经在刷新 token，则将当前请求加入队列，等待 token 刷新完成后重试
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push(() => {
            resolve(axios(originalRequest));
          });
        });
      }

      // 开始刷新 token，设置标志位
      isRefreshing = true;

      try {
        // 调用 refreshToken 方法，它是一个异步方法
        const response = (await refreshToken()) as ApiResponse<User>;
        Cookies.set('token', response.data.accessToken, { sameSite: 'strict' });
        Cookies.set('refresh_token', response.data.refreshToken, { sameSite: 'strict' });

        // 刷新成功后执行所有待重试的请求
        pendingRequests.forEach((callback) => callback());
        pendingRequests = []; // 清空队列

        // 重试当前请求
        return axios(originalRequest);
      } catch (refreshError: any) {
        console.log("401 错误，跳转到登录页");
        Cookies.remove('token');
        Cookies.remove('refresh_token');
        window.location.href = "/login"; // 跳转到登录页
        // 如果刷新失败，则直接返回错误
        return Promise.reject(refreshError);
      } finally {
        // 刷新完成，无论成功或失败，都重置标志位
        isRefreshing = false;
      }
    } else {
      useMessage().error(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }

    // 其他错误情况直接返回错误信息
    return Promise.reject(
      error.response && error.response.data
        ? error.response.data.message
        : error.message
    );
  }
);
