import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
let token = localStorage.getItem("auth_token") || "";
const decoder = new TextDecoder("utf-8");

const request = {
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

const auth = {
  login(username: string, password: string) {
    return request.get(API_URL + "/user/login", {
      username,
      password,
    });
  },
  loginByToken(token: string) {
    return request.get(API_URL + "/user", { token });
  },
  getUptoken() {
    return request.get(API_URL + "/account/qiniuToken", {
      target: "cdn-soar",
    });
  },
  getUptokenOverWrite(key: string) {
    return request.get(API_URL + "/upTokenQiniu/getQiNiuUpTokenKey", {
      token: token,
      type: 2,
      key,
      bucketType: 7,
    });
  },
  qiniuRemain(fileSize: number, cardKey?: string, tagKey?: string) {
    return request.get(API_URL + "/qiniu/remain", {
      fileSize,
      cardKey,
      tagKey,
    });
  },
  qiniuStatistic(
    cardKey: string,
    url: string,
    fileSize: number,
    nodeKey?: string
  ) {
    return request.post(API_URL + "/qiniu", {
      cardKey,
      nodeKey,
      url,
      fileSize,
    });
  },
};

const openApi = {
  locationInfo() {
    return request.get(
      "https://restapi.amap.com/v3/ip",
      {
        key: "9a9a6697ac05ce5295e44c9e03f2c117",
      },
      true
    );
  },
  weatherInfo(city: string) {
    return request.get(
      "https://restapi.amap.com/v3/weather/weatherInfo",
      {
        key: "9a9a6697ac05ce5295e44c9e03f2c117",
        city,
      },
      true
    );
  },
};

const ai = {
  askAi(
    messages: { role: string; content: string }[],
    callback: (text: string) => void
  ) {
    const data = {
      messages,
      soarToken: token,
    };

    // 创建一个 Fetch 请求
    // const aiUrl = "http://localhost:3000/chatbot/api/chat";
    const aiUrl = "https://soar.cn/chatbot/api/chat";

    fetch(aiUrl, {
      method: "POST", // 请求方法为 POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // 处理流式数据
        if (!response || !response.body) return;
        const reader = response.body.getReader();

        reader.read().then(function pump({ done, value }): any {
          if (done) {
            // Do something with last chunk of data then exit reader
            console.log("流式数据传输完成");
            return;
          }
          // Otherwise do something here to process current chunk
          const text = decoder.decode(value);
          console.log("---text---", text);
          callback(text);
          // console.log("接收到数据块:", value);
          // Read some more, and call this function again
          return reader.read().then(pump);
        });
      })
      .catch((error) => {
        console.error("发生错误:", error);
      });
  },
};

export default {
  request,
  auth,
  ai,
  openApi,
  setToken: (_token: string) => {
    localStorage.setItem("auth_token", _token);
    token = _token;
  },
  rmvToken: () => {
    localStorage.removeItem("auth_token");
    token = "";
  },
  getToken: () => {
    return token;
  },
};
