<script setup lang="ts">
import { notification } from "@/Hooks/Element-plus";
import { useAuthStore } from "@/stores/auth";
import { FormInstance } from "element-plus";
import { LockKeyholeIcon, } from "lucide-vue-next";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useAuthStore();
const { changePassword } = store;

const emit = defineEmits(['close']);

const formRef = ref<FormInstance>();
const loginForm = reactive({
	password: "",
	newPassword: '',
	confirmPassword: "",
});

let rules = reactive({
	password: [
		{ required: true, message: t("options.currentPassword"), trigger: "change" },
		{
			min: 8,
			max: 100,
			message: t("auth.passwordValidater"),
			trigger: "change",
		},
	],
	newPassword: [
		{ required: true, message: t("options.newPassword"), trigger: "change" },
		{
			min: 8,
			max: 100,
			message: t("auth.passwordValidater"),
			trigger: "change",
		},
		{
			validator: (rule: any, value: string, callback: (error?: Error) => void) => {
				if (value === loginForm.password) {
					callback(new Error(t("options.newPasswordSame")));
				} else {
					callback();
				}
			}
		}
	],
	confirmPassword: [
		{ required: true, message: t("options.confirmPassword"), trigger: "change" },
		{
			validator: (rule: any, value: string, callback: (error?: Error) => void) => {
				if (value !== loginForm.newPassword) {
					callback(new Error(t("auth.passwordMismatch")));
				} else {
					callback();
				}
			},
			trigger: "change",
		},
	],
});

const onSubmit = async (formEl?: FormInstance) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			await changePassword(loginForm);
			notification(t("options.changePassword"), t("options.changePasswordSuccess"), "success")
			emit('close');
		} else {
			console.log("error submit!", fields);
		}
	});
};

</script>

<template>
	<div>
		<el-form ref="formRef" :model="loginForm" label-position="top" autocomplete="on" :rules="rules"
			@keyup.enter="onSubmit(formRef)">

			<el-form-item prop="password" :label="$t('options.currentPassword')">
				<el-input v-model="loginForm.password" type="password" :placeholder="$t('options.currentPassword')">
					<template #prefix>
						<LockKeyholeIcon class="size-5" />
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="newPassword" :label="$t('options.newPassword')">
				<el-input v-model="loginForm.newPassword" type="password" :placeholder="$t('options.newPassword')">
					<template #prefix>
						<LockKeyholeIcon class="size-5" />
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="confirmPassword" :label="$t('options.confirmPassword')">
				<el-input v-model="loginForm.confirmPassword" type="password" :placeholder="$t('options.confirmPassword')">
					<template #prefix>
						<LockKeyholeIcon class="size-5" />
					</template>
				</el-input>
			</el-form-item>
			<el-form-item class="mt-8">
				<el-button type="primary" style="width: 100%" @click="onSubmit(formRef)">
					{{ $t("options.changePassword") }}
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
