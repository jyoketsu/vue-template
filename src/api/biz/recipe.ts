import { request } from "@/api/index";

export function fetchList(query: any) {
  return request.get("/api/recipes", query);
}

export function addObj(obj: any) {
  return request.post("/api/recipes", obj);
}

export function getObj(id: string) {
  return request.get(`/api/recipes/${id}`);
}

export function delObj(ids: string[]) {
  return request.delete(`/api/recipes`, ids);
}

export function putObj(obj: any) {
  return request.put(`/api/recipes`, obj);
}

export function getDictTypes() {
  return request.get("/api/recipes/types");
}
