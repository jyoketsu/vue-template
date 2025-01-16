<template>
	<div class="license-plan-dialog-container">
		<el-dialog v-model="visible" :close-on-click-modal="false"
			:title="dataForm.id ? $t('common.editBtn') : $t('common.addBtn')" class="dark:bg-zinc-700">
			<el-form ref="dataFormRef" v-loading="loading" :model="dataForm" :rules="dataRules" label-width="150px">
				<el-row :gutter="20">
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('dictionary.name')" prop="name">
							<el-input v-model="dataForm.name" :placeholder="$t('dictionary.name')"></el-input>
						</el-form-item>

						<el-form-item :label="$t('dictionary.dictCode')" prop="dictCode">
							<el-input v-model="dataForm.dictCode" :placeholder="$t('dictionary.dictCode')"></el-input>
						</el-form-item>

						<el-form-item :label="$t('dictionary.dictType')" prop="dictType">
							<el-input v-model="dataForm.dictType" :placeholder="$t('dictionary.dictType')"></el-input>
						</el-form-item>

					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="visible = false">{{ $t('common.cancelButtonText') }}</el-button>
					<el-button type="primary" @click="onSubmit" :disabled="loading">{{ $t('common.confirmButtonText')
						}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" name="licensePlanDialog" setup>
import { useI18n } from 'vue-i18n';
import { addObj, putObj, getObj } from '@/api/biz/dictionary';
import { nextTick, reactive, ref } from 'vue';
import { useMessage } from '@/Hooks/message';

const { t } = useI18n();

// 定义刷新表格emit
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);


const dataForm = reactive({
	id: '',
	name: '',
	dictCode: '',
	dictType: ''
});

const dataRules = ref({
	name: [
		{ required: true, message: t("message.validate.required"), trigger: 'blur' },
		{ min: 1, max: 20, message: t("message.validate.length", { min: 1, max: 20 }), trigger: 'blur' },
	],
	dictCode: [
		{ required: true, message: t("message.validate.required"), trigger: 'blur' },
		{ min: 1, max: 20, message: t("message.validate.length", { min: 1, max: 20 }), trigger: 'blur' },
	],
	dictType: [
		{ required: true, message: t("message.validate.required"), trigger: 'blur' },
		{ min: 1, max: 20, message: t("message.validate.length", { min: 1, max: 20 }), trigger: 'blur' },
	],
});

// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	dataForm.id = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value.resetFields();
	});

	if (id) {
		dataForm.id = id;
		getData(id);
	}
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => { });
	if (!valid) return false;

	const { id } = dataForm;
	loading.value = true;
	try {
		if (id) {
			await putObj(dataForm);
			useMessage().success(t('common.editSuccessText'));
		} else {
			await addObj(dataForm);
			useMessage().success(t('common.addSuccessText'));
		}
		emit('refresh');
		visible.value = false; // 关闭弹窗
	} catch (error) {
		console.error(error);
	} finally {
		loading.value = false;
	}
};

const getData = async (id: string) => {
	loading.value = true;

	try {
		// @ts-ignore
		const { data } = await getObj(id);
		delete data['updateTime']
		Object.assign(dataForm, data);
	} finally {
		loading.value = false;
	}
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
