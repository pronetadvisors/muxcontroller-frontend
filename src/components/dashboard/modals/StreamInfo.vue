<template>
  <button @click="isOpen = true">
    <font-awesome-icon :icon="['fas', 'circle-info']" class="w-6 h-6 mr-3 text-blue-600 transition duration-200 hover:scale-125" />
  </button>

  <div
      v-show="isOpen"
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
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="isOpen = false">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="py-6 px-6 lg:px-8 text-left">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">Stream Info</h3>
          <form class="space-y-6" @submit.prevent="onSubmit">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Stream Name</label>
              <input type="text" disabled v-model="stream.name" name="name" id="name" placeholder="Room 1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <div>
              <label for="StreamID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Stream ID</label>
              <input type="text" disabled v-model="stream.id" name="StreamID" id="StreamID" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="--" required>
            </div>
            <div>
              <label for="StreamKey" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Stream Key</label>
              <input type="text" disabled v-model="stream.stream_key" name="StreamKey" id="StreamKey" placeholder="12345678-abcd-1234-abcd-1234567890ab" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <div class="flex">
              <div class="w-1/2 mr-1">
                <label for="latency_mode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Latency Mode</label>
                <input type="text" disabled v-model="stream.latency_mode" name="latency_mode" id="latency_mode" placeholder="--" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
              <div class="w-1/2 ml-1">
                <label for="created_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Created At</label>
                <input type="text" disabled v-model="date" name="created_at" id="created_at" placeholder="--" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
            </div>
            <div>
              <label for="PlaybackIDs" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">PlaybackIDs</label>
              <input type="text" disabled v-model="stream.playback_ids" name="PlaybackIDs" id="PlaybackIDs" placeholder="12345678-abcd-1234-abcd-1234567890ab" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <div class="text-center">
              <button type="button" @click="isOpen = false" class="w-1/3 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-800">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
library.add(faCircleInfo);

// PROPS
const props = defineProps(['stream']);


//MISC
import { ref } from 'vue';
let stream = ref(props.stream);
let date = ref(null);
date.value = new Date(stream.value.created_at * 1000);

let isOpen = ref(false);

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();



async function onSubmit() {
	// let organization = {
	// 	name: orgname.value,
	// 	email: email.value,
	// 	mux_accessToken: accesstoken.value,
	// 	mux_secret: secret.value
	// };
	//
	// await organizationStore.editOrganization(props.org.id, organization);

	isOpen.value = false;
}

</script>