<template>
  <div class="mx-auto mx-2 bg-zinc-700 rounded p-5">
    <p class="text-lg text-zinc-200 font-thin">Active Streams</p>
    <table class="table-auto bg-zinc-800 mt-3 rounded w-full">
      <thead>
        <tr class="text-zinc-300 text-md">
          <th>Preview</th>
          <th>Status</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stream in organizationStore.getStreams" :key="stream.id" class="text-zinc-300 text-md text-center">
          <td v-if="stream.status === 'active'" class="font-light"><img class="h-14 mx-auto py-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"></td>
          <td v-if="stream.status === 'active'" class="font-light px-3"><div class="rounded-full bg-emerald-500">Active</div></td>
          <td v-if="stream.status === 'active'" class="font-light">Room 1</td>
          <td v-if="stream.status === 'active'" class="font-light"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();

</script>

<style scoped>

</style>