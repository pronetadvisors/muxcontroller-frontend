<template>
	<div
			v-show="userStore.getProfileModal"
			class="
      absolute
      inset-0
      flex
      items-center
      justify-center
      bg-gray-700 bg-opacity-50
    "
	>
		<div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
			<div class="relative p-4 w-full h-full md:h-auto">
				<button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="userStore.profileModalButton">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				</button>
				<div class="py-6 px-6 lg:px-8 text-center">
					<h3 class="mb-4 text-3xl font-medium text-gray-900 dark:text-white">Edit your Profile</h3>
					<form class="space-y-6" @submit.prevent="upload" enctype="multipart/form-data">
						<div>
							<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Avatar</label>
							<input type="file" ref="file" class="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-emerald-300 hover:file:bg-emerald-100" accept="image/png, image/jpeg" required>
						</div>
						<div class="text-center">
							<button type="button" @click="userStore.profileModalButton" class="w-1/3 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-800 mr-10">Cancel</button>
							<button type="submit" value="submit" class="w-1/3 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Edit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

import { ref } from 'vue';
const file = ref(null);

function upload(){
	const formData = new FormData();
	formData.append('image', file.value.files[0]);

	userStore.updateAvatar(formData);

	userStore.profileModal = false;
}

</script>

<style scoped>

</style>