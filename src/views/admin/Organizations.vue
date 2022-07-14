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
            <th scope="col" class="px-6 py-3">
              Active Streams
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
          <tr v-for="org in organizationStore.getOrganizations" class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <th scope="row" class="px-6">
              {{ org.name }}
            </th>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              100
            </td>
            <td class="px-6 py-4">
              100
            </td>
            <td class="px-6 py-0">
              <div class="flex">
                <img v-for="user in organizationStore.getUsers[org.id]" class="h-9 w-9 rounded-full bg-zinc-800 border-2 border-zinc-800 -mr-4" :src="'http://localhost:3000'+ user.avatar_src" alt="Avatar">
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

organizationStore.getDBOrganizations();

</script>

<style scoped>

</style>