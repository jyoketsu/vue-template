import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

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
          params,
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

const user = {
  getUserList() {
    return request.get(API_URL + "/user");
  },
  getUserDetail(_id: string) {
    return request.get(API_URL + "/user/detail", { _id });
  },
  updateUser(_id: string, updater: object) {
    return request.patch(API_URL + "/user/update", { _id, updater });
  },
  deleteUser(_id: string) {
    return request.delete(API_URL + "/user/delete", { _id });
  },
  countUser() {
    return request.get(API_URL + "/user/count");
  },
};

export default {
  auth,
  user,
};
