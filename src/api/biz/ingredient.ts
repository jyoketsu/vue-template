import { request } from "@/api/index";

export function fetchList(query: any) {
  return request.get("/api/ingredient", query);
}

export function getAll() {
  return request.get("/api/ingredient/all");
}
export function addObj(obj: any) {
  return request.post("/api/ingredient", obj);
}

export function getObj(id: string) {
  return request.get(`/api/ingredient/${id}`);
}

export function delObj(ids: string[]) {
  return request.delete(`/api/ingredient`, ids);
}

export function putObj(obj: any) {
  return request.put(`/api/ingredient`, obj);
}
