import { request } from "@/api/index";

export function fetchList(query: any) {
  return request.get("/api/dictionary", query);
}

export function addObj(obj: any) {
  return request.post("/api/dictionary", obj);
}

export function getObj(id: string) {
  return request.get(`/api/dictionary/${id}`);
}

export function delObj(ids: string[]) {
  return request.delete(`/api/dictionary`, ids);
}

export function putObj(obj: any) {
  return request.put(`/api/dictionary`, obj);
}

export function getDictTypes() {
  return request.get("/api/dictionary/types");
}

export function getDictTypesByType(type: string) {
  return request.get("/api/dictionary/type", { type });
}
