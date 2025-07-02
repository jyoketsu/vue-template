import { request } from "@/api/index";

export function uploadImg(files: File[]) {
	let fromData = new FormData()
	fromData.append('source', files[0])
	return request.post("/upload", fromData);
}