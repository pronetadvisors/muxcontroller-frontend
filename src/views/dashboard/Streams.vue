<template>
  <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10">
    <div class="flex">
    </div>
    <div class="flex mt-4">
      <create-stream />
    </div>
  </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3">
            Title
          </th>
          <th scope="col" class="px-6 py-3">
            Stream ID
          </th>
          <th scope="col" class="px-6 py-3">
            HTML
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
          <tr v-for="stream in organizationStore.getStreams" :key="stream.id" class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {{ stream.name ?? 'N/A' }}
            </td>
            <td class="px-6 py-4">
              {{ stream.id }}
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><copy-html type="live" :name="stream.name" :playback_id="stream.playback_ids[0].id" /></a>
            </td>
            <td class="px-6 py-4 flex items-center">
              <div
                  class="rounded-full w-2 h-2 ml-3 mr-1"
                  :class="{ 'bg-green-500': stream.status === 'active', 'bg-blue-500': stream.status === 'idle', 'bg-amber-500': stream.status === 'disabled' }"
              ></div>
              {{ stream.status }}
            </td>
            <td class="px-6 text-right">
              <stream-info :stream="stream" />
<!--              <a href="#">-->
<!--                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="w-4 h-4" />-->
<!--              </a>-->
              <delete-stream :id="stream.id" :streamname="stream.name" />
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

// COMPONENTS
import CreateStream from '@/components/dashboard/modals/CreateStream.vue';
import DeleteStream from '@/components/dashboard/modals/DeleteStream.vue';
import StreamInfo from '@/components/dashboard/modals/StreamInfo.vue';
import CopyHtml from '@/components/dashboard/modals/CopyHTML.vue';
</script>

<style scoped>

</style>