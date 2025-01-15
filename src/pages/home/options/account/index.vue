<script setup lang="ts">
import ImageUploader from '@/components/common/imageUploader.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const authStore = useAuthStore();
const { update } = authStore;
const { user } = storeToRefs(authStore);

const username = ref(user.value?.username);

const handleUploadSuccess = (url: string) => {
	if (!url || !user.value || !user.value.id) return;
	update({ id: user.value.id, avatar: url })
}

const handleSaveUsername = () => {
	if (!user.value || !user.value.id || username.value === user.value.username) return;
	update({ id: user.value.id, username: username.value });
}
</script>

<template>
	<div>
		<div class="flex items-center space-x-5">
			<div class="size-14 avatar-uploader">
				<ImageUploader :image-url="user?.avatar || ''" @success="handleUploadSuccess" />
			</div>
			<div>
				<p class="text-xs mb-1">{{ $t('auth.username') }}</p>
				<el-input v-model="username" style="width: 240px" :placeholder="$t('auth.usernamePlaceholder')"
					@blur="handleSaveUsername" />
			</div>
		</div>
	</div>
</template>

<style>
.avatar-uploader .el-upload {
	border-radius: 100%;
}
</style>