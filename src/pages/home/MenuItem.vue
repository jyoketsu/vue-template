<template>
  <template v-for="routes in menuRouteList as any" :key="routes.path">
    <!-- 所有一级路由 -->
    <el-menu-item :index="routes.path" v-if="routes.meta.isShow && !routes.children">
      <el-icon>
        <component :is="routes.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ $t(`router.${routes.meta.title}`) }}</span>
      </template>
    </el-menu-item>
    <!-- 判断是否有二级路由 ,且二级路由长度为1-->
    <el-menu-item :index="routes.children[0].path" v-if="routes.children && !routes.meta.isShow">
      <el-icon>
        <component :is="routes.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ routes.children[0].meta.title }}</span>
      </template>
    </el-menu-item>

    <!-- 判断是否有其他子路由 -->
    <el-sub-menu :index="routes.path" v-if="routes.meta.isShow && routes.children">
      <template #title>
        <el-icon>
          <component :is="routes.meta.icon"></component>
        </el-icon>
        <span>{{ $t(`router.${routes.meta.title}`) }}</span>
      </template>
      <!-- 递归循环 -->
      <MenuItem :menuRouteList="routes.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineProps<{
  menuRouteList: any
}>()
</script>
