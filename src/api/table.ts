import { request } from "@/api/index";

const API_URL = import.meta.env.VITE_API_URL;

export function fetchList(query: any) {
  return request.get(API_URL + "/table/page", query);
}

export function addObj(obj: any) {
  return request.post(API_URL + "/table/add", obj);
}

export function getObj(id: string) {
  return request.get(API_URL + "/table/details/" + id);
}

export function delObj(ids: object) {
  return request.delete(API_URL + "/table/delete", ids);
}

export function putObj(obj: any) {
  return request.patch(API_URL + "/table/edit", obj);
}

export function toggleStatus(id: string, status: string) {
  return request.patch(API_URL + "/table/status", { id, status });
}

export function validatePositiveInteger(rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error("请输入一个数字"));
  }
  if (!/^[1-9]\d*$/.test(value)) {
    return callback(new Error("请输入正整数"));
  }
  callback();
}
