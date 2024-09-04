import axios from "axios";
import { randomNum } from "./util";
const API_URL = import.meta.env.VITE_API_URL;
let token = localStorage.getItem("auth_token") || "";
const decoder = new TextDecoder("utf-8");

const request = {
  get(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "get",
          url: path,
          params: params,
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

const knowledgeBase = {
  get(nodeKey: string) {
    return request.get(API_URL + "/knowledgeBase", { nodeKey });
  },
  /**
   * 删除/恢复
   * @param nodeKey
   * @param status 0:删除 1:恢复
   * @returns
   */
  delete(nodeKey: string, status: 0 | 1) {
    return request.delete(API_URL + "/knowledgeBase", { nodeKey, status });
  },
  edit(props: {
    nodeKey: string;
    title?: string;
    content?: any;
    url?: string;
    icon?: string;
    summary?: string;
    type?: "text" | "file" | "link" | "folder";
  }) {
    return request.patch(API_URL + "/knowledgeBase", props);
  },
  createNode(props: {
    nodeKey: string;
    addType: "child" | "next";
    title: string;
    type: "text" | "file" | "link" | "folder";
  }) {
    return request.post(API_URL + "/knowledgeBase", props);
  },
  nodeDetail(nodeKey: string) {
    return request.get(API_URL + "/card/detail", { cardKey: nodeKey });
  },
  dragNote2Node(props: {
    noteKey: string;
    targetNodeKey: string;
    type: "child" | "next";
  }) {
    return request.patch(API_URL + "/note/use/inBase", props);
  },
  dragNode(props: {
    nodeKey: string;
    targetNodeKey: string;
    type: "child" | "next" | "up";
  }) {
    return request.patch(API_URL + "/knowledgeBase/drag", props);
  },
  moveNode(props: {
    nodeKey: string;
    targetNodeKey: string;
    type: "child" | "next" | "up";
  }) {
    return request.patch(API_URL + "/knowledgeBase/move", props);
  },
  getTreeList(props: { teamKey: string }) {
    return request.get(API_URL + "/project/author", props);
  },
};

const unsplash = {
  // https://unsplash.com/documentation
  getUnsplashImages(page: number) {
    return request.get("https://api.unsplash.com/photos", {
      client_id: "PWr2enHljv71dG8XrmNwVorgtYkPfe89j5OXywvx7sc",
      page,
      per_page: 30,
      order_by: ["latest", "oldest", "popular"][randomNum(0, 2)],
    });
  },
  searchUnsplashImages(query: string, page: number) {
    return request.get("https://api.unsplash.com/search/photos", {
      client_id: "PWr2enHljv71dG8XrmNwVorgtYkPfe89j5OXywvx7sc",
      query,
      page,
      per_page: 30,
    });
  },
  getRandomUnsplashImage(orientation?: string) {
    return request.get("https://api.unsplash.com/photos/random", {
      client_id: "PWr2enHljv71dG8XrmNwVorgtYkPfe89j5OXywvx7sc",
      orientation: orientation || "landscape",
      content_filter: "high",
    });
  },
};

const wallpaper = {
  getWallpaperList(page: number) {
    return request.get("https://timeosdata.qingtime.cn/wallPaper", {
      page,
      limit: 60,
    });
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
  knowledgeBase,
  unsplash,
  wallpaper,
  ai,
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
