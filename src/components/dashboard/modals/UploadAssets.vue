<template>
  <div class="w-full mx-auto">
    <div class="justify-center ml-2">
      <button
          @click="isOpen = true"
          class="w-full text-white font-light bg-zinc-400 hover:bg-zinc-600 focus:ring-4 focus:ring-zinc-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-700 dark:hover:bg-zinc-800 focus:outline-none hover:shadow-md hover:shadow-zinc-800 transition duration-200"
          type="button"
      >
        Upload Assets
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
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-2/5 max-h-full">
          <div class="relative p-4 w-full h-full md:h-auto">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="isOpen = false">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="py-6 px-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">Upload CSV Datafile</h3>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload CSV file</label>
              <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" ref="file" v-on:change="handleCSVUpload()"  type="file" accept="text/csv">
              <div class="flex justify-center items-center w-full mt-2 mb-2" v-if="content">
                <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div class="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Upload <span class="font-bold text-sm">ALL</span> MP4 Files</p>
                  </div>
                  <input id="dropzone-file" type="file" ref="mp4s" class="hidden" multiple v-on:change="handleMP4sUpload()" accept="video/mp4" />
                </label>
              </div>
              <div v-if="content" class="overflow-y-auto max-h-96">
                <table class="table-auto w-full mt-2">
                  <thead>
                    <tr class="text-white">
                      <th>Asset Name</th>
                      <th>File Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody class="text-zinc-400 text-center">
                    <tr v-for="line in content" :key="line[3]" :class="{ 'text-emerald-500': line[5] === 'Linked', 'text-orange-300': line[5] === 'Pending' }">
                      <td>{{ line[1] }}</td>
                      <td>{{ line[0] }}</td>
                      <td v-if="line[5] === 'Pending'">
                        Missing
<!--                        <input class="block w-1/2 text-sm mx-auto text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" v-on:change="handleAdditionalUpload(line[1])" type="file" :ref="additional[line[1]]" accept="video/mp4" />-->
                      </td>
                      <td v-else>{{ line[5] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="!allLinked" class="mt-2 text-white">
                <p class="flex items-center justify-center"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="w-6 h-6 mr-2 text-yellow-600" />Not all Assets have been linked.</p>
                <div class="flex mt-3">
                  <p class="w-2/3">Click the button to the right to delete all the missing assets. The deleted assets will be written to a CSV File for you to download so you can re-upload at a later time.</p>
                  <button
                      class="w-1/3 text-zinc-800 hover:text-white font-light bg-zinc-400 hover:bg-zinc-600 focus:ring-4 focus:ring-zinc-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-100 dark:hover:bg-zinc-600 focus:outline-none transition duration-200"
                      type="button"
                      @click="downloadAndDelete()"
                  >
                    Download CSV & <br> Delete Missing Assets
                  </button>
                </div>
              </div>
              <form v-if="allLinked && mp4s != null" class="space-y-6" @submit.prevent="onSubmit">
                <div class="mt-4 border-t-2 pt-4">
                  <input v-model="audio" type="checkbox" id="audio" name="audio" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-middle bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                  <label for="audio" class="text-sm font-medium text-gray-900 dark:text-gray-300">Normalize Audio</label>
                </div>
                <div class="mt-4">
                  <input v-model="mp4_support" type="checkbox" id="mp4_support" name="mp4_support" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-middle bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                  <label for="audio" class="text-sm font-medium text-gray-900 dark:text-gray-300">MP4 Support</label>
                </div>
                <button type="submit" value="submit" class="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-emerald-800">Create Asset</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
library.add(faTriangleExclamation);

//MISC
import { ref } from 'vue';
import Papa from 'papaparse';

let isOpen = ref(false);
const audio = ref(false);
const mp4_support = ref(true);

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();


const file = ref(null);
const mp4s = ref(null);
// const additional = ref([]);

const allLinked = ref(true);

const content = ref(null);

const handleCSVUpload = async() => {
	allLinked.value = false;
	Papa.parse(file.value.files[0], {
		complete: function(results) {
			content.value = results.data;
			content.value = content.value.slice(1);
			content.value.forEach(line => {
				line[5] = 'Pending';
			});
		}
	});
};

const handleMP4sUpload = async() => {
	allLinked.value = true;
	content.value.forEach(line => {
		line[5] = 'Pending';
	});
	for (var i = 0; i < mp4s.value.files.length; i++) {
		content.value.forEach(line => {
			if(mp4s.value.files[i].name === line[0]) {
				line[5] = 'Linked';
			}
		});
	}
	content.value.forEach(line => {
		if(line[5] === 'Pending'){
			allLinked.value = false;
		}
	});
};

const downloadAndDelete = async() => {
	let arr = [];
	for(var i = 0; i < content.value.length; i++){
		if(content.value[i][5] === 'Pending'){
			arr.push(content.value[i]);
			content.value.splice(i, 1);
			i--;
		}
	}

	allLinked.value = true;

	let csv = 'File Name,Session ID,in Time (hh:mm:ss),out Time (hh:mm:ss)\n';
	arr.forEach((row) => {
		csv += row.join(',');
		csv += "\n";
	});

	csv.slice(0, -2);
	// console.log(csv);
	const anchor = document.createElement('a');
	anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
	anchor.target = '_blank';
	anchor.download = 'MissingAssets.csv';
	anchor.click();
};

// const handleAdditionalUpload = async(id) => {
// 	console.log(additional.value);
// 	content.value.forEach(line => {
// 		if(additional.value.files[0].name === line[0]) {
// 			line[5] = 'Linked';
// 			mp4s.value.append(additional.value.files[0]);
// 		}
// 	});
// };

async function onSubmit() {

	const assets = organizationStore.getAssets;

	for (const line of content.value) {
		let exists = false;
		for(const asset of assets){
			if(asset.name){
				if(asset.name.trim() === line[1].trim()) exists = true;
			}
		}
		if(!exists){
			let data = {
				name: line[1].trim(),
				data: {
					"timeout": 604800,
					"cors_origin": "https://con.noc4.co",
					"new_asset_settings": {
						"playback_policy": "public",
						"normalize_audio": audio.value,
					},
				}
			};

			if(mp4_support.value){
				data.data["new_asset_settings"]["mp4_support"] = "standard";
			}

			let video = null;
			for (var i = 0; i < mp4s.value.files.length; i++) {
				if(mp4s.value.files[i].name.trim() === line[0].trim()) {
					video = mp4s.value.files[i];
				}
			}

			await organizationStore.directUpload(data, video);
		}
	}

	isOpen.value = false;
}

</script>