import Mock from "mockjs";

// 定义 API 基础 URL
const API_URL = "http://localhost:3000";

// 模拟的用户信息数据
const userInfo = [
  {
    username: "admin",
    password: "123456",
    role: "admin",
    avatar: "https://psnine.com/img/jyoketsu3-1703748121-s.jpg",
    token: "system_token",
  },
  {
    username: "user",
    password: "123456",
    role: "user",
    avatar: "https://psnine.com/Upload/game/34992.png",
    token: "user_token",
  },
];

// 用户信息的 Mock 处理
const userinfo_mock = (options: any) => {
  const urlParams = new URLSearchParams(options.url.split("?")[1]);
  const token = urlParams.get("token");
  const user = userInfo.find((item) => item.token === token);
  if (!user) {
    return { code: 201, data: { message: "获取用户信息失败" } };
  }
  return {
    code: 200,
    message: "获取成功",
    data: user,
  };
};

// 用户登录的 Mock 处理
const login_mock = (options: any) => {
  const urlParams = new URLSearchParams(options.url.split("?")[1]);
  const username = urlParams.get("username");
  const password = urlParams.get("password");

  const user = userInfo.find(
    (item) => item.username === username && item.password === password
  );
  if (!user) {
    return { code: 201, message: "账号或者密码不正确", data: {} };
  }
  const { token } = user;
  return { code: 200, data: token, message: "登录成功！" };
};

// 定义 Mock 接口
const userMocks = [
  Mock.mock(new RegExp(`${API_URL}/user/login`), "get", login_mock),
  Mock.mock(new RegExp(`${API_URL}/user`), "get", userinfo_mock),
];

// 导出用户相关的 Mock 数据
export default userMocks;
