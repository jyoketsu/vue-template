<template>
	<div class="layout-padding h-full overflow-hidden">
		<div class="layout-padding-auto layout-padding-view h-full overflow-hidden flex flex-col">
			<!-- 查询条件区域 -->
			<el-row class="ml10" v-show="showSearch">
				<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList" ref="queryRef">
					<el-form-item :label="$t('dictionary.name')" prop="name">
						<el-input class="!w-40" :placeholder="$t('dictionary.inputNameTip')" @keyup.enter="getDataList" clearable
							v-model="state.queryForm.name" />
					</el-form-item>
					<el-form-item :label="t('dictionary.dictType')" prop="dictType">
						<el-select class="!w-40" v-model="state.queryForm.dictType" :placeholder="$t('dictionary.dictType')"
							clearable>
							<el-option :key="item" :label="item" :value="item" v-for="item in types">
							</el-option>
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
					<el-button @click="formDialogRef.openDialog()" class="ml10" :icon="CirclePlusIcon" type="primary">
						{{ $t('common.addBtn') }}
					</el-button>
					<el-button plain :disabled="multiple" @click="handleDelete(selectObjs)" class="ml10" :icon="Trash2Icon"
						type="primary">
						{{ $t('common.delBtn') }}
					</el-button>
					<right-toolbar @queryTable="getDataList" class="ml10" style="float: right; margin-right: 20px"
						v-model:showSearch="showSearch"></right-toolbar>
				</div>
			</el-row>

			<!-- 表格区域 -->
			<el-table :data="state.dataList" @selection-change="handleSelectionChange" style="width: 100%" row-key="id"
				v-loading="state.loading" border :cell-style="tableStyle.cellStyle"
				:header-cell-style="tableStyle.headerCellStyle" class="!overflow-hidden">
				<el-table-column align="center" type="selection" width="40" />
				<el-table-column :label="$t('common.index')" type="index" width="60" />
				<el-table-column :label="$t('dictionary.name')" prop="name" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('dictionary.dictCode')" prop="dictCode" />
				<el-table-column :label="$t('dictionary.dictType')" prop="dictType" />
				<el-table-column :label="$t('common.updateTime')" prop="updateTime">
					<template #default="scope">
						{{ dayjs(scope.row.updateTime).format('YY/MM/DD HH:mm') }}
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.action')" width="150">
					<template #default="scope">
						<el-button class="text-sm !p-0" :icon="EditIcon" @click="formDialogRef.openDialog(scope.row.id)" text
							type="primary">
							{{ $t('common.editBtn') }}
						</el-button>
						<el-button class="text-sm !p-0" :icon="Trash2Icon" @click="handleDelete([scope.row.id])" text type="danger">
							{{ $t('common.delBtn') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<pagination @current-change="currentChangeHandle" @size-change="sizeChangeHandle" v-bind="state.pagination">
			</pagination>
		</div>
		<table-form @refresh="refresh" ref="formDialogRef" />
	</div>
</template>

<script lang="ts" name="listAndForm" setup>
import { delObj, fetchList, getDictTypes } from '@/api/biz/dictionary';
import { useI18n } from 'vue-i18n';
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
import { BasicTableProps, useTable } from '@/Hooks/table';
import { useMessage, useMessageBox } from '@/Hooks/message';
import { SearchIcon, RotateCcwIcon, CirclePlusIcon, Trash2Icon, EditIcon } from 'lucide-vue-next';
import dayjs from 'dayjs';

// 动态引入组件
const TableForm = defineAsyncComponent(() => import('./form.vue'));
const { t } = useI18n();

// 定义变量内容
const formDialogRef = ref();
const queryRef = ref();
const showSearch = ref(true);
const types = ref([]);

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

onMounted(() => {
	getTypes();
})

const getTypes = async () => {
	const res: any = await getDictTypes();
	if (res.code === 200) {
		types.value = res.data;
	}
}

// 清空搜索条件
const resetQuery = () => {
	queryRef.value.resetFields();
	getDataList();
};

const refresh = () => {
	getDataList();
	getTypes();
}

// 多选事件
const handleSelectionChange = (objs: { id: string }[]) => {
	selectObjs.value = objs.map(({ id }) => id);
	multiple.value = !objs.length;
};

// 删除
const handleDelete = async (ids: string[]) => {
	try {
		await useMessageBox().confirm(t('common.delConfirmText'));
	} catch {
		return;
	}

	await delObj(ids);
	refresh();
	useMessage().success(t('common.delSuccessText'));
};

</script>
