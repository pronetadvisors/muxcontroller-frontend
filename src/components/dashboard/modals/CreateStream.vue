<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <button
          @click="isOpen = true"
          class="text-white font-light bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-400 dark:hover:bg-emerald-500 focus:outline-none hover:shadow-md hover:shadow-emerald-800 transition duration-200"
          type="button"
      >
        + Create Stream
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
            <div class="py-6 px-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">Create a new Stream</h3>
              <form class="space-y-6" @submit.prevent="onSubmit">
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Stream Name</label>
                  <input type="text" v-model="name" name="name" id="name" placeholder="Room 1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <div>
                  <label for="latency" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Latency Mode</label>
                  <select v-model="latency" name="latency" id="latency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    <option value="low">Low</option>
                    <option value="reduced">Reduced</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label for="duration" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Max Duration in Seconds (Default: 12 Hours)</label>
                  <input type="text" v-model="duration" name="duration" id="duration" placeholder="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <div>
                  <input v-model="audio" type="checkbox" id="audio" name="audio" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-middle bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                  <label for="audio" class="text-sm font-medium text-gray-900 dark:text-gray-300">Audio Only</label>
                </div>
                <div>
                  <input v-model="test" type="checkbox" id="test" name="test" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                  <label for="test" class="text-sm font-medium text-gray-900 dark:text-gray-300">Test Stream</label>
                </div>
                <button type="submit" value="submit" class="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-emerald-800">Create Stream</button>
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
import { ref } from 'vue';

let isOpen = ref(false);
const name = ref('');
const latency = ref('standard');
const duration = ref(43200);
const audio = ref(false);
const test = ref(false);

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();


async function onSubmit() {
	let stream = {
		name: name.value,
		data: {
			"playback_policy": ["public"],
			"new_asset_settings": {
				"playback_policy": ["public"]
			},
			"audio_only": audio.value,
			"latency_mode": latency.value,
			"test": test.value,
			"max_continuous_duration": duration.value
		}
	};

	await organizationStore.createStream(stream);

	isOpen.value = false;
}

</script>