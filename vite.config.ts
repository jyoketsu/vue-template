import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// gzip压缩
import viteCompression from "vite-plugin-compression";
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
      viteCompression({
        deleteOriginFile: false, // 压缩后删除原来的文件
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
      host: "0.0.0.0", // 新增这行，允许所有网络接口访问
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

        "/upload": {
          target: "https://www.picgo.net", // 文件上传接口的目标地址
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace(/^\/upload/, "/api/1/upload"), // 将 `/upload` 重写为实际接口路径
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              // 设置 X-API-Key 头
              proxyReq.setHeader("X-API-Key", env.VITE_PIC_GO_KEY);
            });
          },
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // 第三方库分组
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus'],
            // echarts: ['echarts'],
            // 其他库...
          }
        }
      }
    },
  });
};
