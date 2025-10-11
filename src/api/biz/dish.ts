
import { request } from "@/api/index";

export function fetchList(query: any) {
  return request.get("/api/dish", query);
}

export function addObj(obj: any) {
  return request.post("/api/dish", obj);
}

export function getObj(id: string) {
  return request.get(`/api/dish/${id}`);
}

export function delObj(ids: string[]) {
  return request.delete(`/api/dish`, ids);
}

export function putObj(obj: any) {
  return request.put(`/api/dish`, obj);
}