<template>
  <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10">
    <div class="flex">
<!--      <label class="ml-4 block relative flex items-center text-zinc-300 focus-within:text-emerald-400">-->
<!--        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />-->
<!--        <input type="search" placeholder="Search..." class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>-->
<!--      </label>-->
    </div>
    <div class="flex mt-4">
      <create-organization/>
    </div>
  </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-300">
          <tr>
            <th scope="col" class="px-6 py-3">
              Company Name
            </th>
            <th scope="col" class="py-3">
              Streams<span class="text-gray-400 normal-case">(Active/Total)</span>
            </th>
            <th scope="col" class="px-6 py-3">
              Assets
            </th>
            <th scope="col" class="px-6 py-3">
              Members
            </th>
            <th scope="col" class="px-6 py-3">
              Billing Status
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="org in organizationStore.getOrganizations" :key="org.id" class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <th scope="row" class="px-6">
              {{ org.name }}
            </th>
            <td class="px-6 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              <div v-if="organizationStore.getStreams[org.id]">{{  organizationStore.getStreams[org.id].length || 0 }}</div>
              <svg v-else class="inline ml-4 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/>
              </svg>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              <div v-if="organizationStore.getAssets[org.id]">{{  organizationStore.getAssets[org.id].length || 0}}</div>
              <svg v-else class="inline ml-4 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/>
              </svg>
            </td>
            <td class="px-6 py-0">
              <div class="flex">
                <img v-for="user in organizationStore.getUsers[org.id]" :key="user.id" class="h-9 w-9 rounded-full bg-zinc-800 border-2 border-zinc-800 -mr-4" :src="user.avatar_src" alt="Avatar">
                <create-user :id="org.id"/>
              </div>
            </td>
            <td class="px-6 py-4 flex items-center">
              <div class="rounded-full bg-green-500 w-2 h-2 ml-3 mr-1"></div>
              Paid
            </td>
            <td class="pr-6 py-4 text-right">
              <edit-organization :org="org" />
<!--              PUT STUFF SUCH AS EDIT MEMBERS ADD/REMOVE, OWNERSHIP, BILLING, TICKETS STATS, ETC -->
              <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="w-4 h-4 mr-3" />
              <delete-organization :id="org.id" :orgname="org.name" />
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
import { faMagnifyingGlass, faEllipsisVertical, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faEllipsisVertical, faCirclePlus);

// COMPONENTS
import CreateOrganization from '@/components/admin/modals/CreateOrganization.vue';
import DeleteOrganization from '@/components/admin/modals/DeleteOrganization.vue';
import EditOrganization from '@/components/admin/modals/EditOrganization.vue';
import CreateUser from '@/components/admin/modals/CreateUser.vue';

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();


</script>

<style scoped>

</style>