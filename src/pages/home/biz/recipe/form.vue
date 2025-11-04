<script lang="ts" name="licensePlanDialog" setup>
import { useI18n } from 'vue-i18n';
import { addObj, putObj, getObj } from '@/api/biz/recipe';
import { fetchList as getDishList } from '@/api/biz/dish';
import { nextTick, reactive, ref } from 'vue';
import { useMessage } from '@/Hooks/message';
import { Ingredient, Step } from '@/interface/Recipe';
import ImageUploader from '@/components/common/ImageUploader.vue';

const { t } = useI18n();

defineProps<{
	unit: { label: string; value: number }[];
	ingredientList: Ingredient[]
}>();

// 定义刷新表格emit
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);
const targetStepIndex = ref(0);
const dishList = ref<any[]>([]);

const dataForm = reactive({
	id: '',
	dishId: '',
	name: '',
	description: ''
});

const ingredients = ref<{ id: string; name: string; quantity: number; unit: string; unitId: number }[]>([]);
const content = ref<Step[]>([]);

const dataRules = ref({
	dishId: [
		{ required: true, message: t("message.validate.required"), trigger: 'blur' },
	],
	name: [
		{ required: true, message: t("message.validate.required"), trigger: 'blur' },
		{ min: 1, max: 20, message: t("message.validate.length", { min: 1, max: 20 }), trigger: 'blur' },
	],
	unitId: [
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
		ingredients.value = [];
		content.value = [];
	});

	if (id) {
		dataForm.id = id;
		getData(id);
	}
};

// 提交表单
const onSubmit = async () => {
	// 验证表单
	const valid = await dataFormRef.value.validate().catch(() => { });
	if (!valid) return false;

	// 处理配料
	const result = ingredients.value.reduce((acc: { [key: string]: number }, item) => {
		const key = item.id;
		if (acc[key] !== undefined) {
			throw new Error(t("recipe.validate.duplicateIngredient")); // 抛出重复配料错误
		}
		acc[key] = item.quantity;
		return acc;
	}, {});

	// 组装提交数据
	const obj = { ...dataForm, ...{ ingredients: result, content: JSON.stringify(content.value) } };

	try {
		const { id } = dataForm;
		if (id) {
			// 编辑操作
			loading.value = true;
			await putObj(obj);
			useMessage().success(t('common.editSuccessText')); // 显示编辑成功信息
			emit('refresh');
			visible.value = false; // 关闭弹窗
		} else {
			// 添加操作
			loading.value = true;
			await addObj(obj);
			useMessage().success(t('common.addSuccessText')); // 显示添加成功信息
			emit('refresh');
			visible.value = false; // 关闭弹窗
		}
	} catch (error) {

	} finally {
		loading.value = false; // 解除加载状态
	}

};

const getData = async (id: string) => {
	loading.value = true;

	try {
		// @ts-ignore
		const { data } = await getObj(id);
		ingredients.value = data.ingredients;
		try {
			content.value = JSON.parse(data.content);
		} catch (error) {
			content.value = [];
		}

		delete data['updateTime']
		delete data['unitName']
		delete data['ingredients']
		Object.assign(dataForm, data);
		dishList.value = [];
		if (data.dishId) {
			dishList.value = [{ id: data.dishId, name: data.dishName }]
		}
	} finally {
		loading.value = false;
	}
};

const handleDeleteIngredient = (index: number) => {
	ingredients.value.splice(index, 1);
}

const handleAddIngredient = () => {
	ingredients.value.push({
		id: '',
		name: '',
		quantity: 0,
		unit: '',
		unitId: 0
	})
}

const handleAddStep = () => {
	content.value.push({
		imageUrl: '',
		step: ''
	})
}

const handleUploadSuccess = (url: string, index: number) => {
	content.value[index].imageUrl = url
}

const remoteDishMethod = async (query: string) => {
	if (query) {
		// 调用远程方法获取菜品列表
		const { data } = await getDishList({ name: query }) as any;
		dishList.value = data.content;
	}
}

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<template>
	<div>
		<el-dialog v-model="visible" :close-on-click-modal="false"
			:title="dataForm.id ? $t('common.editBtn') : $t('common.addBtn')" class="dark:bg-zinc-700">
			<el-form ref="dataFormRef" v-loading="loading" :model="dataForm" :rules="dataRules" label-position="top"
				label-width="150px">
				<el-row :gutter="30">
					<el-col :span="24" class="mb20">
						<el-form-item :label="$t('dish.name')" prop="dishId">
							<el-select v-model="dataForm.dishId" filterable remote :remote-method="remoteDishMethod"
								:placeholder="$t('dish.inputNameTip')">
								<el-option v-for="item in dishList" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>

						<el-form-item :label="$t('recipe.name')" prop="name">
							<el-input v-model="dataForm.name" :placeholder="$t('recipe.name')"></el-input>
						</el-form-item>

						<el-form-item :label="$t('recipe.description')" prop="description">
							<el-input v-model="dataForm.description" type="textarea" :autosize="{ minRows: 2 }" resize="none"
								:placeholder="$t('recipe.description')"></el-input>
						</el-form-item>

						<!-- 食材 -->
						<el-form-item :label="$t('recipe.ingredients')" prop="ingredients">
							<div class="w-full flex flex-col space-y-3">
								<div v-for="(ingredient, index) in ingredients" class="flex items-center space-x-2">
									<el-select v-model="ingredient.id" filterable placeholder="Select">
										<el-option v-for="item in ingredientList" :key="item.id" :label="item.name" :value="item.id" />
									</el-select>

									<el-input v-model="ingredient.quantity" type="number" :min="1" :max="1000" />

									<el-select v-model="ingredient.unit" placeholder="Select">
										<el-option v-for="item in unit" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>

									<el-button type="danger" icon="Delete" circle @click="handleDeleteIngredient(index)" />
								</div>
								<el-button icon="Add" type="primary" @click="handleAddIngredient">
									{{ $t("recipe.addIngredient") }}
								</el-button>
							</div>
						</el-form-item>

						<!-- 步骤 -->
						<el-form-item :label="$t('recipe.steps')" prop="steps">
							<div class="w-full flex flex-col space-y-3">
								<div v-for="(step, index) in content" class="grid grid-cols-[160px_1fr] gap-2">
									<div class="rounded">
										<ImageUploader :image-url="step.imageUrl"
											@success="(url: string) => handleUploadSuccess(url, index)" />
									</div>
									<el-input v-model="step.step" type="textarea" :autosize="{ minRows: 5 }" resize="none"
										:placeholder="$t('recipe.stepTip')"></el-input>
								</div>
								<el-button icon="Add" type="primary" @click="handleAddStep">
									{{ $t("recipe.addStep") }}
								</el-button>
							</div>
						</el-form-item>

					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="visible = false">{{ $t('common.cancelButtonText') }}</el-button>
					<el-button type="primary" @click="onSubmit" :disabled="loading">
						{{ $t('common.confirmButtonText') }}
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
