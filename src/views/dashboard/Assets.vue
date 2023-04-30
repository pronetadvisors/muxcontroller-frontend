<template>
  <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10">
    <div class="flex">
    </div>
    <div class="flex mt-4 w-50">
      <create-asset />
      <upload-asset />
    </div>
  </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4">
    <div class="overflow-x-auto max-h-[700px]">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-auto">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3">
            Thumbnail
          </th>
          <th scope="col" class="px-6 py-3">
            Title
          </th>
          <th scope="col" class="px-6 py-3">
            Asset ID
          </th>
          <th scope="col" class="px-6 py-3">
            HTML
          </th>
          <th scope="col" class="px-6 py-3">
            Playback
          </th>
          <th>
            Duration
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="asset in organizationStore.getAssets" :key="asset.id" class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <td class="px-2">
              <img v-if="asset.status === 'ready'" :src="`https://image.mux.com/${asset.playback_ids[0].id}/thumbnail.png?width=100&height=50&fit_mode=smartcrop`" />
              <p v-else>Preparing...</p>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {{ asset.name ?? 'N/A' }}
            </td>
            <td class="px-6 py-4">
              {{ asset.id }}
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><copy-html type="on-demand" name="Video" :playback_id="asset.playback_ids[0].id" /></a>
            </td>
            <td class="px-6 py-4">
              <button @click="copyPB(asset.playback_ids[0].id)">
                <font-awesome-icon :icon="['far', 'clipboard']" class="w-6 h-6 mr-3 text-blue-600 transition duration-200 hover:scale-125" />
              </button>
            </td>
            <td>
              <span v-if="asset.status === 'ready'">{{ new Date(Math.round(asset.duration) * 1000).toISOString().slice(11, 19) }}</span>
              <p v-else>Preparing...</p>
            </td>
            <td class="px-6 py-4 flex items-center">
              <div
                  class="rounded-full w-2 h-2 ml-3 mr-1"
                  :class="{ 'bg-green-500': asset.status === 'ready', 'bg-blue-500': asset.status === 'preparing', 'bg-amber-500': asset.status === 'errored' }"
              ></div>
              {{ asset.status }}
            </td>
            <td class="px-6 text-right">
              <asset-info :asset="asset" />
              <delete-asset :id="asset.id" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
        type="button"
        class="text-white font-light bg-zinc-400 hover:bg-zinc-600 focus:ring-4 focus:ring-zinc-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 dark:bg-zinc-700 dark:hover:bg-zinc-800 focus:outline-none hover:shadow-md hover:shadow-zinc-800 transition duration-200"
        @click="downloadCSV"
    >Download CSV</button>
  </div>
</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faEllipsisVertical);

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();

organizationStore.getAssetsSelf();

function downloadCSV(){
	let csv = 'Asset ID, Asset Name, Stream URL, MP4 Download\n';
	organizationStore.getAssets.forEach((asset) => {
		csv += (asset.id + ",");
		csv += ((asset.name ?? 'N/A') + ",");
		csv += (`https://stream.mux.com/${asset.playback_ids[0].id}.m3u8`);
		csv += (`https://stream.mux.com/${asset.playback_ids[0].id}.mp4`);
		csv += "\n";
	});

	csv.slice(0, -2);
	// console.log(csv);
	const anchor = document.createElement('a');
	anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
	anchor.target = '_blank';
	anchor.download = 'Assets.csv';
	anchor.click();
}

// COMPONENTS
import CreateAsset from '@/components/dashboard/modals/CreateAsset.vue';
import DeleteAsset from '@/components/dashboard/modals/DeleteAsset.vue';
import UploadAsset from '@/components/dashboard/modals/UploadAssets.vue';
import AssetInfo from '@/components/dashboard/modals/AssetInfo.vue';
import CopyHtml from '@/components/dashboard/modals/CopyHTML.vue';
import {notify} from "@kyvg/vue3-notification";

function copyPB(text) {
	navigator.clipboard.writeText(`https://stream.mux.com/${text}.m3u8`);
	notify({
		type: 'success',
		title: `Copied to clipboard`,
	});
}
</script>

<style scoped>

</style>