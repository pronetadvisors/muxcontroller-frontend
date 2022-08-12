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
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-2/5">
          <div class="relative p-4 w-full h-full md:h-auto">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="isOpen = false">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="py-6 px-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">Create a new Stream</h3>
              <form class="space-y-2" @submit.prevent="onSubmit">
                <div class="flex">
                  <div class="w-1/2 mr-1">
                    <label for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Stream Video Title</label>
                    <input type="text" v-model="name" name="name" id="name" placeholder="Room 1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                  </div>
                  <div class="w-1/2 ml-1">
                    <label for="latency" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Latency Mode</label>
                    <select v-model="latency" name="latency" id="latency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                      <option value="low">Low</option>
                      <option value="reduced">Reduced</option>
                      <option value="standard">Standard</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label for="duration" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Max Duration in Seconds (Default: 12 Hours)</label>
                  <input type="text" v-model="duration" name="duration" id="duration" placeholder="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <div>
                  <label for="reconnect" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Reconnect Window (Default: 60 Seconds, Min/Max: 0/1000)</label>
                  <input type="text" v-model="reconnect" name="reconnect" id="reconnect" placeholder="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <div v-if="reconnect > 60">
                  <input v-model="slate" type="checkbox" id="slate" name="slate" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-middle bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                  <label for="slate" class="text-sm font-medium text-gray-900 dark:text-gray-300">Use Slate for Standard Latency</label>
                  <p class="text-zinc-400 text-xs">Note: If your reconnect window is higher than 60 seconds with a Standard Latency stream, we highly recommend enabling this option.</p>
                </div>
                <div>
                  <input v-model="audio" type="checkbox" id="audio" name="audio" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-middle bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                  <label for="audio" class="text-sm font-medium text-gray-900 dark:text-gray-300">Audio Only</label>
                </div>
                <div>
                  <input v-model="mp4" type="checkbox" id="audio" name="audio" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-middle bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                  <label for="audio" class="text-sm font-medium text-gray-900 dark:text-gray-300">MP4 Support</label>
                </div>
                <div>
                  <input v-model="cc" type="checkbox" id="audio" name="audio" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-middle bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                  <label for="audio" class="text-sm font-medium text-gray-900 dark:text-gray-300">Closed Captioning</label>
                </div>
                <div v-if="cc">
                  <div class="flex">
                    <div class="w-1/2 mr-1">
                      <label for="cc_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">CC Name</label>
                      <input type="text" v-model="cc_name" name="cc_name" id="cc_name" placeholder="--" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <div class="w-1/2 ml-1">
                      <label for="cc_passthrough" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">CC Passthrough</label>
                      <input type="text" v-model="cc_passthrough" name="cc_passthrough" id="cc_passthrough" placeholder="--" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                  </div>
                  <div class="flex mt-2">
                    <div class="w-1/2 mr-1">
                      <label for="cc_language_code" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Langauge Code</label>
                      <input type="text" v-model="cc_language_code" name="cc_language_code" id="cc_language_code" placeholder="--" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <div class="w-1/2 ml-1">
                      <label for="cc_language_channel" class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Language Channel</label>
                      <input type="text" v-model="cc_language_channel" name="cc_language_channel" id="cc_language_channel" placeholder="--" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                  </div>
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
const reconnect = ref(60);
const slate = ref(false);

const mp4 = ref(true);

const cc = ref(false);
const cc_name = ref('English CC');
const cc_passthrough = ref('English closed captions');
const cc_language_code = ref('en-US');
const cc_language_channel = ref('cc1');

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
			"max_continuous_duration": duration.value,
			"reconnect_window": reconnect.value,
			"use_slate_for_standard_latency": slate.value
		}
	};

	if(mp4.value){
		stream.data["new_asset_settings"]["mp4_support"] = "standard";
	}

	if(cc.value){
		stream.data["embedded_subtitles"] = [
			{
				"name": cc_name.value,
				"passthrough": cc_passthrough.value,
				"language_code": cc_language_code.value,
				"language_channel" : cc_language_channel.value
			}
		];
	}

	await organizationStore.createStream(stream);

	isOpen.value = false;
}

</script>