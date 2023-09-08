import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
let token = localStorage.getItem("auth_token") || "";

const request = {
  get(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "get",
          url: path,
          params: params,
          // headers: {
          //   token: token,
          // },
          withCredentials: true,
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
          // headers: {
          //   token: token,
          // },
          withCredentials: true,
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
          // headers: {
          //   token: token,
          // },
          withCredentials: true,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  delete(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "delete",
          url: path,
          data: params,
          // headers: {
          //   token: token,
          // },
          withCredentials: true,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};

const auth = {
  login(username: string, password: string) {
    return request.get(API_URL + "/user/login", {
      username,
      password,
    });
  },
  loginByToken() {
    return request.get(API_URL + "/user/loginByToken");
  },
};

export default {
  auth,
  setToken: (_token: string) => {
    localStorage.setItem("auth_token", _token);
    token = _token;
  },
};
