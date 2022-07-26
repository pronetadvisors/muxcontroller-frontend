<template>
  <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10">
    <div class="flex">
<!--      <label class="ml-4 block relative flex items-center text-zinc-300 focus-within:text-emerald-400">-->
<!--        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />-->
<!--        <input type="search" placeholder="Search..." v-model="search" class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>-->
<!--      </label>-->
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
            Name
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
              {{ stream.name || 'N/A' }}
            </td>
            <td class="px-6 py-4">
              {{ stream.id}}
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><stream-copy-html :stream="stream" /></a>
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
              <a href="#">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="w-4 h-4" />
              </a>
              <a href="#">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="w-4 h-4" />
              </a>
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
import StreamInfo from '@/components/dashboard/modals/StreamInfo.vue';
import StreamCopyHtml from '@/components/dashboard/modals/StreamCopyHTML.vue';
</script>

<style scoped>

</style>