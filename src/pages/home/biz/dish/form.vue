<script lang="ts" name="licensePlanDialog" setup>
import { useI18n } from 'vue-i18n';
import { addObj, putObj, getObj } from '@/api/biz/dish';
import { nextTick, reactive, ref } from 'vue';
import { useMessage } from '@/Hooks/message';
import ImageUploader from '@/components/common/ImageUploader.vue';

const { t } = useI18n();

const props = defineProps<{
	category: { label: string; value: string }[]
}>();

// 定义刷新表格emit
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);


const dataForm = reactive({
	id: '',
	name: '',
	description: '',
	categoryId: '',
	cover: '',
});

const dataRules = ref({
	name: [
		{ required: true, message: t("message.validate.required"), trigger: 'blur' },
		{ min: 1, max: 20, message: t("message.validate.length", { min: 1, max: 20 }), trigger: 'blur' },
	],
	description: [
		{ required: true, message: t("message.validate.required"), trigger: 'blur' },
		{ min: 1, max: 100, message: t("message.validate.length", { min: 1, max: 100 }), trigger: 'blur' },
	],
	categoryId: [
		{ required: true, message: t("message.validate.required"), trigger: 'blur' },
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
			emit('refresh');
		} else {
			loading.value = true;
			await addObj(dataForm);
			useMessage().success(t('common.addSuccessText'));
			emit('refresh');
		}
		visible.value = false; // 关闭弹窗
	} catch (error) {

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
		delete data['categoryName']
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

<template>
	<div class="license-plan-dialog-container">
		<el-dialog v-model="visible" :close-on-click-modal="false"
			:title="dataForm.id ? $t('common.editBtn') : $t('common.addBtn')" class="dark:bg-zinc-700">
			<el-form ref="dataFormRef" v-loading="loading" :model="dataForm" :rules="dataRules" label-width="150px">
				<el-row :gutter="20">
					<el-col :span="24" class="mb20">

						<el-form-item :label="$t('dish.cover')" prop="cover">
							<div class="size-[120px]">
								<ImageUploader :image-url="dataForm.cover" @success="(url: string) => dataForm.cover = url" />
							</div>
						</el-form-item>

						<el-form-item :label="$t('dish.name')" prop="name">
							<el-input v-model="dataForm.name" :placeholder="$t('dish.name')"></el-input>
						</el-form-item>

						<el-form-item :label="$t('dish.description')" prop="description">
							<el-input v-model="dataForm.description" type="textarea" :autosize="{ minRows: 2 }" resize="none"
								:placeholder="$t('dish.description')"></el-input>
						</el-form-item>

						<el-form-item :label="$t('dish.categoryId')" prop="categoryId">
							<el-select v-model="dataForm.categoryId" :placeholder="$t('dish.categoryId')" clearable>
								<el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in category">
								</el-option>
							</el-select>
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
