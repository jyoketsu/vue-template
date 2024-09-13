<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<!-- 查询条件区域 -->
			<el-row class="ml10" v-show="showSearch">
				<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList" ref="queryRef">
					<el-form-item :label="$t('table.name')" prop="name">
						<el-input :placeholder="$t('table.inputNameTip')" @keyup.enter="getDataList" clearable
							v-model="state.queryForm.name" />
					</el-form-item>
					<el-form-item :label="t('table.status')" prop="status">
						<el-select v-model="state.queryForm.status" :placeholder="$t('table.status')" class="!w-60" clearable>
							<el-option label="test" value="test">
							</el-option>
							<!-- <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in active_status">
							</el-option> -->
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button @click="getDataList" :icon="SearchIcon" type="primary">{{ $t('common.queryBtn') }} </el-button>
						<el-button @click="resetQuery" :icon="RotateCcwIcon">{{ $t('common.resetBtn') }}</el-button>
					</el-form-item>
				</el-form>
			</el-row>

			<!-- 操作按钮区域 -->
			<el-row>
				<div class="mb-4" style="width: 100%">
					<el-button @click="formDialogRef.openDialog()" class="ml10" :icon="CirclePlusIcon" type="primary"
						v-auth="'license_customer_add'">
						{{ $t('common.addBtn') }}
					</el-button>
					<el-button plain :disabled="multiple" @click="handleDelete(selectObjs)" class="ml10" :icon="Trash2Icon"
						type="primary" v-auth="'license_customer_del'">
						{{ $t('common.delBtn') }}
					</el-button>
					<right-toolbar @queryTable="getDataList" class="ml10" style="float: right; margin-right: 20px"
						v-model:showSearch="showSearch"></right-toolbar>
				</div>
			</el-row>

			<!-- 表格区域 -->
			<el-table :data="state.dataList" @selection-change="handleSelectionChange" style="width: 100%" row-key="id"
				v-loading="state.loading" border :cell-style="tableStyle.cellStyle"
				:header-cell-style="tableStyle.headerCellStyle">
				<el-table-column align="center" type="selection" width="40" />
				<el-table-column :label="$t('table.index')" type="index" width="60" />
				<el-table-column :label="$t('table.name')" prop="name" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('table.content')" width="230" show-overflow-tooltip>
					<template #default="scope">
						<div class="flex flex-col">
							<span class="text-sm">{{ `${$t('table.price')}：${scope.row.price || ''}` }}</span>
							<span class="text-sm">{{ `${$t('table.remoteContainerLimit')}：${scope.row.remoteContainerLimit || ''}`
								}}</span>
							<span class="text-sm">{{ `${$t('table.availableBandwidth')}：${scope.row.availableBandwidth || ''}`
								}}</span>
							<span class="text-sm">{{
								`${$t('table.supportedRemoteConnections')}：${(scope.row.supportedRemoteConnections || [])}`
							}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column :label="$t('table.wechatPush')" width="100" show-overflow-tooltip>
					<template #default="scope">
						<!-- <dict-tag :options="wechat_push" :value="scope.row.wechatPush"></dict-tag> -->
						<span>todo dict</span>
					</template>
				</el-table-column>
				<el-table-column :label="$t('table.weight')" prop="weight" />
				<el-table-column :label="$t('table.status')" show-overflow-tooltip>
					<template #default="scope">
						<el-switch inline-prompt v-model="scope.row.status" active-value="1" inactive-value="0"
							:active-text="$t('table.online')" :inactive-text="$t('table.offline')" v-auth="'license_customer_edit'"
							@change="(val: string) => handleChangeStatus(scope.row.id, val)" />
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.updateBy')" prop="updateBy" />
				<el-table-column :label="$t('common.updateTime')" prop="updateTime" />
				<el-table-column :label="$t('common.action')" width="150">
					<template #default="scope">
						<el-button class="text-sm" icon="edit-pen" @click="formDialogRef.openDialog(scope.row.id)" text
							type="primary" v-auth="'license_customer_edit'">
							{{ $t('common.editBtn') }}
						</el-button>
						<el-button class="text-sm" icon="delete" @click="handleDelete([scope.row.id])" text type="primary"
							v-auth="'license_customer_del'">
							{{ $t('common.delBtn') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<pagination @current-change="currentChangeHandle" @size-change="sizeChangeHandle" v-bind="state.pagination">
			</pagination>
		</div>
		<table-form @refresh="getDataList()" ref="formDialogRef" />
	</div>
</template>

<script lang="ts" name="licensePlan" setup>
import { delObj, fetchList, toggleStatus } from '@/api/table';
import { useI18n } from 'vue-i18n';
import { defineAsyncComponent, reactive, ref } from 'vue';
import { BasicTableProps, useTable } from '@/Hooks/table';
import { useMessage, useMessageBox } from '@/Hooks/message';
import { SearchIcon, RotateCcwIcon, CirclePlusIcon, Trash2Icon } from 'lucide-vue-next';

// 动态引入组件
const TableForm = defineAsyncComponent(() => import('./form.vue'));
const { t } = useI18n();

// 定义变量内容
const formDialogRef = ref();
const excelUploadRef = ref();
const queryRef = ref();
const showSearch = ref(true);

// 多选rows
const selectObjs = ref([]) as any;
// 是否可以多选
const multiple = ref(true);

// 定义表格查询、后台调用的API
const state: BasicTableProps = reactive<BasicTableProps>({
	queryForm: {
		name: '',
		status: '',
	},
	pageList: fetchList,
	descs: ['weight'],
});

//  table hook
const { getDataList, currentChangeHandle, sizeChangeHandle, tableStyle } = useTable(state);

// 清空搜索条件
const resetQuery = () => {
	queryRef.value.resetFields();
	getDataList();
};

// 多选事件
const handleSelectionChange = (objs: { id: string }[]) => {
	selectObjs.value = objs.map(({ id }) => id);
	multiple.value = !objs.length;
};

// 删除用户
const handleDelete = async (ids: string[]) => {
	try {
		await useMessageBox().confirm(t('common.delConfirmText'));
	} catch {
		return;
	}

	try {
		await delObj(ids);
		getDataList();
		useMessage().success(t('common.delSuccessText'));
	} catch (err: any) {
		useMessage().error(err.msg);
	}
};

const handleChangeStatus = async (id: string, val: string) => {
	try {
		await toggleStatus(id, val);
		useMessage().success(t('common.optSuccessText'));
		getDataList();
	} catch (err: any) {
		useMessage().error(err.msg);
	}
}
</script>
