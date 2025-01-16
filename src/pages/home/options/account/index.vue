<script setup lang="ts">
import ImageUploader from '@/components/common/imageUploader.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import ChangePassword from './changePassword.vue';

const authStore = useAuthStore();
const { update } = authStore;
const { user } = storeToRefs(authStore);

const username = ref(user.value?.username);
const changePasswordVisible = ref(false);

const handleUploadSuccess = (url: string) => {
	update({ avatar: url })
}

const handleSaveUsername = () => {
	update({ username: username.value });
}
</script>

<template>
	<div class="px-3">
		<div class="font-bold text-base border-b pb-3 mb-4">{{ $t('options.account') }}</div>

		<div class="flex items-center space-x-5 py-4">
			<div class="size-14 avatar-uploader">
				<ImageUploader :image-url="user?.avatar || ''" @success="handleUploadSuccess" />
			</div>
			<div>
				<p class="text-xs mb-1">{{ $t('auth.username') }}</p>
				<el-input v-model="username" style="width: 240px" :placeholder="$t('auth.usernamePlaceholder')"
					@blur="handleSaveUsername" />
			</div>
		</div>

		<div class="py-4 flex justify-between items-center">
			<div>
				<p class="text-sm font-medium">{{ $t("auth.password") }}</p>
				<p class="text-xs text-gray-500">{{ $t("options.changePasswordDesc") }}</p>
			</div>
			<el-button size="small" @click="changePasswordVisible = true">{{ $t("options.changePassword") }}</el-button>
		</div>

		<el-dialog v-model="changePasswordVisible" :title="$t('options.changePassword')" destroy-on-close width="360">
			<ChangePassword @close="changePasswordVisible = false" />
		</el-dialog>
	</div>
</template>

<style>
.avatar-uploader .el-upload {
	border-radius: 100%;
}
</style>