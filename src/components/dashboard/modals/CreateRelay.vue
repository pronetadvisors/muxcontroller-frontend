<template>
  <div class="w-full mx-auto">
    <div class="justify-center">
      <button
          @click="isOpen = true"
          class="w-full text-white font-light bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-400 dark:hover:bg-emerald-500 focus:outline-none hover:shadow-md hover:shadow-emerald-800 transition duration-200"
          type="button"
      >
        + Create Relay
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
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-2/5">
          <div class="relative p-4 w-full h-full md:h-auto">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="isOpen = false">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="py-6 px-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">Create a new Relay</h3>
              <form class="space-y-6" @submit.prevent="onSubmit">
                <div class="flex">
                  <div class="w-1/2 mr-1">
                    <label for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Relay Title</label>
                    <input type="text" v-model="name" name="name" id="name" placeholder="Room 1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                  </div>
                  <div class="w-1/2 ml-1">
                    <label for="latency" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Associated Stream</label>
                    <select v-model="stream_name" name="stream_name" id="stream_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                      <option value="">NA</option>
                      <option v-for="stream in organizationStore.getStreams" :key="stream.id" :value="stream.stream_key">{{ stream.name }}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label for="url" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Enter the destination URL, ie where the Relay should point to</label>
                  <input type="url" v-model="url" name="url" id="url" placeholder="rtmps://global-live.mux.com:443/app/stream_key" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <div>
                    <label for="port" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Enter the ingest port: Recommend 1300-1400</label>
                    <input type="text" v-model="port" name="port" id="port" placeholder="1337" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <button type="submit" value="submit" class="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-emerald-800">Create Relay</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
//MISC
import {ref, watch} from 'vue';

let isOpen = ref(false);
const url = ref('');
const name = ref('');
const port = ref('');
const stream_name = ref('');

watch(stream_name, (newVal) => {
	url.value = "rtmps://global-live.mux.com:443/app/" + newVal;
});

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();


async function onSubmit() {
	let relay = {
		name: name.value,
		port: port.value,
		stream_name: stream_name.value,
		destination_url: url.value
	};


	await organizationStore.createRelay(relay);

	isOpen.value = false;
}

</script>