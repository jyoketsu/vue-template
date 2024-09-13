import axios from "axios";
let token = localStorage.getItem("auth_token") || "";

export const request = {
  get(path: string, params?: object, noHeaders?: boolean) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "get",
          url: path,
          params: params,
          headers: !noHeaders
            ? {
                token: token,
              }
            : undefined,
          // withCredentials: true,
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
          headers: {
            token: token,
          },
          // withCredentials: true,
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
          headers: {
            token: token,
          },
          // withCredentials: true,
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
          headers: {
            token: token,
          },
          // withCredentials: true,
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
