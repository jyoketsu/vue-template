<template>
  <div class="root">
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="username" :label="$t('user.username')" />
      <el-table-column prop="role" :label="$t('user.role')" width="75">
        <template #default="scope">
          {{ $t(`user.role${scope.row.role}`) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        :label="$t('user.createTime')"
        width="180"
      >
        <template #default="scope">
          <div>{{ dayjs(scope.row.createTime).format("YYYY-MM-DD") }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.action')" width="200">
        <el-button>{{ $t("user.edit") }}</el-button>
        <el-button type="danger">{{ $t("user.delete") }}</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { computed, watchEffect } from "vue";
import dayjs from "dayjs";
import { useStore } from "../../../store";

const store = useStore();
const user = computed(() => store.state.auth.user);
const userList = computed(() => store.state.user.userList);

watchEffect(() => {
  if (user.value) {
    store.dispatch("user/getUserList");
  }
});
</script>
<style scoped>
.root {
  width: 100%;
}
</style>
