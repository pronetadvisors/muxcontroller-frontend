<template>
  <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10">
    <div class="flex">
    </div>
    <div class="flex mt-4">
<!--      <create-user/>-->
    </div>
  </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3">
            Avatar
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="py-3">
            Email
          </th>
          <th scope="col" class="py-3">
            Role
          </th>
          <th scope="col" class="px-6 py-3">
            Created At
          </th>
          <th scope="col" class="px-6 py-3 text-right">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="user in organizationStore.getUsers" :key="user.user_id" class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600 border-b-2">
            <th scope="row" class="px-6 py-2">
              <img class="h-12 rounded-full" :src="img_url + user.avatar_src" alt="Avatar">
            </th>
            <th scope="row" class="px-6 text-zinc-50 font-medium">
              {{ user.firstname }} {{ user.lastname }}
            </th>
            <th scope="row" class="font-normal">
              {{ user.email }}
            </th>
            <th scope="row" class="font-normal">
              <span v-if="user.role === '1'">Guest</span>
              <span v-if="user.role === '2'">User</span>
              <span v-if="user.role === '4'">Admin</span>
            </th>
            <th scope="row" class="px-6 font-normal">
              {{ user.createdAt.substring(0, 10) }}
            </th>
            <th scope="row" class="px-6 text-right font-normal">
              <button
                  @click="isOpen = true"
                  class="text-white font-light bg-zinc-400 focus:ring-4 focus:ring-zinc-800 font-medium rounded-md text-sm px-5 py-2.5 m-2 mx-auto dark:bg-zinc-700 hover:text-emerald-500 hover:border hover:border-2 hover:border-emerald-500 transition duration-200"
                  type="button"
              >
                Manage
              </button>
            </th>
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
import CreateUser from '@/components/dashboard/modals/CreateUser.vue';
import DeleteUser from '@/components/admin/modals/DeleteOrganization.vue';
import EditUser from '@/components/admin/modals/EditOrganization.vue';

// MISC
import { ref } from 'vue';

const img_url = ref(import.meta.env.VITE_IMG_URL || "");

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();

organizationStore.getUsersSelf();
console.log(organizationStore.getUsers);

</script>

<style scoped>

</style>