<template>
  <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10">
    <div class="flex">
    </div>
    <div class="flex mt-4">
      <create-asset />
    </div>
  </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3">
            Preview
          </th>
          <th scope="col" class="px-6 py-3">
            Asset ID
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
          <tr v-for="asset in organizationStore.getAssets" :key="asset.id" class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <td class="px-6 py-4">
              Hover for Preview
            </td>
            <td class="px-6 py-4">
              {{ asset.id }}
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><copy-html :playback_id="asset.playback_ids[0].id" /></a>
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

// COMPONENTS
import CreateAsset from '@/components/dashboard/modals/CreateAsset.vue';
import DeleteAsset from '@/components/dashboard/modals/DeleteAsset.vue';
import AssetInfo from '@/components/dashboard/modals/AssetInfo.vue';
import CopyHtml from '@/components/dashboard/modals/CopyHTML.vue';
</script>

<style scoped>

</style>