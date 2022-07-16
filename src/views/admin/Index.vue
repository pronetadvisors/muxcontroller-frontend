<template>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 grid grid-cols-4 gap-4 divide-dashed divide-x divide-zinc-500 outline outline-1 outline-zinc-500 bg-zinc-700 rounded mt-4">
    <div class="text-center p-6">
      <font-awesome-icon :icon="['far', 'user']" class="w-8 h-8 text-emerald-400 mb-1" />
      <p class="text-gray-200 text-xl font-bold">100</p>
      <p class="text-gray-300">Total Users</p>
    </div>
    <div class="text-center p-6">
      <font-awesome-icon :icon="['fas', 'user-group']" class="w-8 h-8 text-emerald-400 mb-1" />
      <p class="text-gray-200 text-xl font-bold">100</p>
      <p class="text-gray-300">Total Organizations</p>
    </div>
    <div class="text-center p-6">
      <font-awesome-icon :icon="['fas', 'video']" class="w-8 h-8 text-emerald-400 mb-1" />
      <p class="text-gray-200 text-xl font-bold">100</p>
      <p class="text-gray-300">Total Streams</p>
    </div>
    <div class="text-center p-6">
      <font-awesome-icon :icon="['fas', 'film']" class="w-8 h-8 text-emerald-400 mb-1" />
      <p class="text-gray-200 text-xl font-bold">100</p>
      <p class="text-gray-300">Total Assets</p>
    </div>
  </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 grid grid-cols-3 gap-4">
    <div class="col-span-2 bg-zinc-700 outline outline-1 outline-zinc-500 rounded p-4">
      <h1 class="text-xl text-white">Tickets</h1>
      <p class="text-3xl text-white">Coming Soon!</p>
    </div>
    <div class="bg-zinc-800 outline outline-1 outline-zinc-500 rounded">
      Quick Actions:
      = Create Organization
      = Create User
    </div>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faVideo, faFilm, faUserGroup } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faVideo, faFilm, faUserGroup);
</script>

<style scoped>

</style>