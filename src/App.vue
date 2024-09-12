<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import "element-plus/es/components/message/style/css";
</script>

<template>
  <router-view></router-view>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  width: 100%;
  height: 100vh;
}

#app {
  font-family: "zh quote", -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Noto Sans", "Noto Sans CJK SC", "Microsoft YaHei UI", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--el-text-color-primary);
  box-sizing: border-box;
  height: 100%;
}

* {
  box-sizing: border-box;
}

.el-popup-parent--hidden {
  overflow: hidden;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  background: "#474747";
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  background-color: var(--el-color-primary);
}

:focus {
  outline: none;
}

.el-dialog {
  max-width: 540px;
}

#nprogress .bar {
  background: var(--el-color-primary) !important;
}
</style>
