import { request } from "@/api/index";

const AMAP_WEB_KEY = import.meta.env.VITE_AMAP_WEB_KEY;

export function getLocationInfo() {
  return request.get(
    "https://restapi.amap.com/v3/ip",
    {
      key: AMAP_WEB_KEY,
    },
    true
  );
}

export function getWeatherInfo(city: string) {
  return request.get(
    "https://restapi.amap.com/v3/weather/weatherInfo",
    {
      key: AMAP_WEB_KEY,
      city,
    },
    true
  );
}
