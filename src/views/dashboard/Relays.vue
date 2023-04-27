<template>
  <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10">
    <div class="flex">
    </div>
    <div class="flex mt-4 w-50">
      <create-relay />
    </div>
  </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4">
    <div class="overflow-x-auto max-h-[700px]">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-auto">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3">
            Title
          </th>
          <th scope="col" class="px-6 py-3">
            Linked Stream
          </th>
          <th scope="col" class="px-6 py-3">
            SRT URL
          </th>
          <th scope="col" class="px-6 py-3">
            Destination URL
          </th>
          <th scope="col" class="px-6 py-3">
            Port
          </th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="relay in organizationStore.getRelays" :key="relay.id" class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {{ relay.name }}
            </td>
            <td class="px-6 py-4">
                <div v-for="stream in organizationStore.getStreams" :key="stream.id">
                  <span v-if="stream.stream_key === relay.stream_name">{{stream.name}}</span>
                </div>
            </td>
            <td class="px-6 py-4">
              <span v-if="relay.ip">srt://{{ relay.ip }}:{{ relay.port }}</span>
              <span v-else>Loading...</span>
            </td>
            <td class="px-6 py-4">
                <button @click="copy(relay.destination_url)">
                    {{ relay.destination_url ?? 'N/A' }}
                </button>
            </td>
            <td class="px-6 py-4">
              {{ relay.port ?? 'N/A' }}
            </td>
            <td class="px-6 text-right">
              <delete-relay :name="relay.name" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

organizationStore.getRelaysSelf();

// COMPONENTS
import CreateRelay from '@/components/dashboard/modals/CreateRelay.vue';
import DeleteRelay from '@/components/dashboard/modals/DeleteRelay.vue';
import {notify} from "@kyvg/vue3-notification";

function copy(text){
	navigator.clipboard.writeText(text);
	notify({
		type: 'success',
		title: `Copied to clipboard`,
	});
}
</script>

<style scoped>

</style>