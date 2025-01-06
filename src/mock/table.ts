import dayjs from "dayjs";
import Mock from "mockjs";

// 定义 API 基础 URL
const API_URL = import.meta.env.VITE_API_URL;

// 模拟的用户信息数据
let tableData: any[] = [];

// 生成随机数据
for (let i = 1; i <= 10; i++) {
  tableData.push({
    id: `${i}${i}${i}${i}`,
    name: `测试套餐${i}`,
    price: Math.floor(Math.random() * 5000) + 500, // 随机价格
    remoteContainerLimit: Math.floor(Math.random() * 5) + 1, // 随机容器限制
    availableBandwidth: Math.floor(Math.random() * 2000) + 500, // 随机带宽
    supportedRemoteConnections: ["SSH", "VNC", "Jupyter"]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .join(","), // 随机支持的远程连接
    wechatPush: Math.random() > 0.5 ? 1 : 0, // 随机微信推送
    weight: Math.floor(Math.random() * 5) + 1, // 随机权重
    status: Math.random() > 0.5 ? 1 : 0, // 随机状态
    updateBy: "admin",
    updateTime: `2024-09-12 ${Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0")}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`, // 随机时间
  });
}

// Mock 处理
const fetchList = (options: any) => {
  const urlParams = new URLSearchParams(options.url.split("?")[1]);
  const name = urlParams.get("name")?.toLowerCase();
  const status = urlParams.get("status")
    ? parseInt(urlParams.get("status") || "")
    : undefined;

  // 过滤数据
  const data = tableData.filter((item) => {
    const matchesName = name ? item.name.toLowerCase().includes(name) : true;
    const matchesStatus = status !== undefined ? item.status === status : true;
    return matchesName && matchesStatus;
  });

  return {
    code: 200,
    message: "获取成功",
    data: {
      current: 1,
      pages: 1,
      total: 10,
      size: 10,
      records: data,
    },
  };
};

const getObj = (options: any) => {
  // const { ids } = JSON.parse(options.body);
  // 使用正则提取id
  const idMatch = options.url.match(/\/table\/details\/(\d+)/);
  const id = idMatch ? idMatch[1] : null;

  // 查找对应id的数据
  // @ts-ignore
  const data = tableData.find((item) => item.id === id);
  return {
    code: 200,
    message: "获取成功",
    data,
  };
};

const putObj = (options: any) => {
  const body = JSON.parse(options.body);
  const { id } = body;
  const itemIndex = tableData.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return {
      code: 404,
      message: "数据未找到",
    };
  }

  // 更新条目
  tableData[itemIndex] = {
    ...tableData[itemIndex],
    ...body,
    supportedRemoteConnections: body.supportedRemoteConnections.join(","),
    updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };

  return {
    code: 200,
    message: "更新成功",
    data: tableData[itemIndex],
  };
};

const toggleStatus = (options: any) => {
  const { id, status } = JSON.parse(options.body);
  const itemIndex = tableData.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return {
      code: 404,
      message: "数据未找到",
    };
  }

  // 更新条目
  tableData[itemIndex] = {
    ...tableData[itemIndex],
    status,
    updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };

  return {
    code: 200,
    message: "更新成功",
    data: tableData[itemIndex],
  };
};

const addObj = (options: any) => {
  const body = JSON.parse(options.body);
  tableData.unshift({
    ...body,
    supportedRemoteConnections: body.supportedRemoteConnections.join(","),
    updateBy: "admin",
    updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
};

const delObj = (options: any) => {
  // 解析请求体中的ids，假设传入的是JSON格式的id数组
  const ids: string[] = JSON.parse(options.body);

  // 过滤掉与ids匹配的数据，保留未删除的条目
  tableData = tableData.filter((item) => !ids.includes(item.id));

  return {
    code: 200,
    message: "删除成功",
  };
};

// 定义 Mock 接口
const tableMocks = [
  Mock.mock(new RegExp(`${API_URL}/table/page`), "get", fetchList),
  Mock.mock(new RegExp(`${API_URL}/table/details`), "get", getObj),
  Mock.mock(new RegExp(`${API_URL}/table/edit`), "patch", putObj),
  Mock.mock(new RegExp(`${API_URL}/table/add`), "post", addObj),
  Mock.mock(new RegExp(`${API_URL}/table/delete`), "delete", delObj),
  Mock.mock(new RegExp(`${API_URL}/table/status`), "patch", toggleStatus),
];

// 导出用户相关的 Mock 数据
export default tableMocks;
