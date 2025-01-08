<template>
	<div class="license-plan-dialog-container">
		<el-dialog v-model="visible" :close-on-click-modal="false"
			:title="dataForm.id ? $t('common.editBtn') : $t('common.addBtn')" class="dark:bg-zinc-700">
			<el-form ref="dataFormRef" v-loading="loading" :model="dataForm" :rules="dataRules" label-width="150px">
				<el-row :gutter="20">
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('table.name')" prop="name">
							<el-input v-model="dataForm.name" :placeholder="$t('table.name')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('table.remoteContainerLimit')" prop="remoteContainerLimit">
							<el-input-number v-model="dataForm.remoteContainerLimit"
								:placeholder="$t('table.remoteContainerLimit')" />
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('table.availableBandwidth')" prop="availableBandwidth">
							<el-input-number v-model="dataForm.availableBandwidth" :placeholder="$t('table.availableBandwidth')" />
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('table.supportedRemoteConnections')" prop="supportedRemoteConnections">
							<el-checkbox-group v-model="dataForm.supportedRemoteConnections">
								<el-checkbox-button label="SSH" value="SSH A" />
								<el-checkbox-button label="Jupyter" value="Jupyter" />
								<el-checkbox-button label="VNC" value="VNC" />
							</el-checkbox-group>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('table.price')" prop="price">
							<el-input-number v-model="dataForm.price" :min="0" :placeholder="$t('table.price')">
								<template #append>{{ $t('table.perYear') }}</template>
							</el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('table.weight')" prop="weight">
							<el-input-number v-model="dataForm.weight" :min="1" :max="99" :placeholder="$t('table.weight')" />
							<span class="text-sm text-zinc-400">{{ $t('table.higherNumberPriority') }}</span>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('table.wechatPush')" prop="wechatPush">
							<el-switch v-model="dataForm.wechatPush" active-value="1" inactive-value="0" />
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
import { addObj, getObj, putObj, validatePositiveInteger } from '@/api/table';
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
	remoteContainerLimit: 0,
	availableBandwidth: 0,
	supportedRemoteConnections: ['SSH'],
	price: 0,
	weight: 0,
	wechatPush: '0'
});

const dataRules = ref({
	name: [
		{ required: true, message: '不能为空', trigger: 'blur' },
		{ min: 1, max: 20, message: '名称长度必须介于 1 和 20 之间', trigger: 'blur' },
	],
	remoteContainerLimit: [
		{ required: true, message: '不能为空', trigger: 'blur' },
		{
			validator: (rule: any, value: any, callback: any) => {
				validatePositiveInteger(rule, value, callback);
			},
			trigger: 'blur',
		},
	],
	availableBandwidth: [
		{ required: true, message: '不能为空', trigger: 'blur' },
		{
			validator: (rule: any, value: any, callback: any) => {
				validatePositiveInteger(rule, value, callback);
			},
			trigger: 'blur',
		},
	],
	supportedRemoteConnections: [
		{ required: true, message: '不能为空', trigger: 'blur' },
	],
	price: [
		{ required: true, message: '不能为空', trigger: 'blur' },
		{
			validator: (rule: any, value: any, callback: any) => {
				validatePositiveInteger(rule, value, callback);
			},
			trigger: 'blur',
		},
	],
	weight: [
		{ required: true, message: '不能为空', trigger: 'blur' },
		{
			validator: (rule: any, value: any, callback: any) => {
				validatePositiveInteger(rule, value, callback);
			},
			trigger: 'blur',
		},
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

	try {
		const { id } = dataForm;
		if (id) {
			loading.value = true;
			await putObj(dataForm);
			useMessage().success(t('common.editSuccessText'));
			visible.value = false; // 关闭弹窗
			emit('refresh');
		} else {
			loading.value = true;
			await addObj(dataForm);
			useMessage().success(t('common.addSuccessText'));
			visible.value = false; // 关闭弹窗
			emit('refresh');
		}
	} catch (error: any) {
		useMessage().error(error.message);
	} finally {
		loading.value = false;
	}
};

const getData = async (id: string) => {
	loading.value = true;

	try {
		// @ts-ignore
		const { data } = await getObj(id);
		data.supportedRemoteConnections = data.supportedRemoteConnections.split(',')
		delete data['delFlag']
		delete data['updateBy']
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
