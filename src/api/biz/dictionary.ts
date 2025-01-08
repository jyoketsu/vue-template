import { request } from "@/api/index";

const API_URL = import.meta.env.VITE_API_URL;

export function fetchList(query: any) {
  return request.get("/api/dictionary", query);
}

export function addObj(obj: any) {
  return request.post("/api/dictionary", obj);
}

export function getObj(id: string) {
  return request.get(`/api/dictionary/${id}`);
}

export function delObj(id: string) {
  return request.delete(`/api/dictionary/${id}`);
}

export function putObj(id: string, obj: any) {
  return request.put(`/api/dictionary/${id}`, obj);
}

export function getDictTypes() {
  return request.get("/api/dictionary/types");
}
