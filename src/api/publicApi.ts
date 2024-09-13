import { request } from "@/api/index";

export function getLocationInfo() {
  return request.get(
    "https://restapi.amap.com/v3/ip",
    {
      key: "9a9a6697ac05ce5295e44c9e03f2c117",
    },
    true
  );
}

export function getWeatherInfo(city: string) {
  return request.get(
    "https://restapi.amap.com/v3/weather/weatherInfo",
    {
      key: "9a9a6697ac05ce5295e44c9e03f2c117",
      city,
    },
    true
  );
}
