import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// @ts-ignore
import ElementPlus from "unplugin-element-plus/vite";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: env.VITE_BASE,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
        "~/": `${resolve(__dirname, "src")}/`,
      },
    },
    plugins: [
      vue(),
      ElementPlus({
        useSource: true,
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      }),
      viteMockServe({
        mockPath: "./src/mock",
        // localEnabled: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL, // 后端服务器地址
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace(/^\/api/, ""), // 可选：重写路径
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              console.log(`Proxying request: ${req.url}`);
            });
          },
        },
      },
    },
  });
};
