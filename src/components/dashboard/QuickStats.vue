<template>
  <div class="mx-auto mx-2 bg-zinc-700 rounded p-5">
    <p class="text-lg text-zinc-200 font-thin">Quick Stats</p>
    <div class="grid grid-cols-2 gap-4 mt-3">
      <div class="mx-auto mx-2 bg-zinc-800 rounded px-4 py-8 flex">
        <font-awesome-icon :icon="['fas', 'video']" class="h-11 text-zinc-300" />
        <div class="ml-4 mt-0">
          <p class="text-zinc-200 text-md">{{ organizationStore.getStreams.length || 0}}</p>
          <p class="text-zinc-400 text-sm font-thin">Streams</p>
        </div>
      </div>

      <div class="mx-auto mx-2 bg-zinc-800 rounded px-4 py-8 flex">
        <font-awesome-icon :icon="['fas', 'film']" class="h-11 text-zinc-300" />
        <div class="ml-4 mt-0">
          <p class="text-zinc-200 text-md">{{ organizationStore.getAssets.length || 0}}</p>
          <p class="text-zinc-400 text-sm font-thin">Assets</p>
        </div>
      </div>

      <div class="mx-auto mx-2 bg-zinc-800 rounded px-4 py-8 flex">
        <font-awesome-icon :icon="['far', 'eye']" class="h-11 text-zinc-300" />
        <div class="ml-4 mt-0">
          <p class="text-zinc-200 text-md">SOON</p>
          <p class="text-zinc-400 text-sm font-thin">Monthly Viewers</p>
        </div>
      </div>


      <div class="mx-auto mx-2 bg-zinc-800 rounded px-4 py-8 flex">
        <font-awesome-icon :icon="['far', 'clock']" class="h-11 text-zinc-300" />
        <div class="ml-4 mt-0">
          <p class="text-zinc-200 text-md">SOON</p>
          <p class="text-zinc-400 text-sm font-thin">Monthly Playing Time</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faClock } from '@fortawesome/free-regular-svg-icons';
import { faVideo, faFilm } from '@fortawesome/free-solid-svg-icons';
library.add(faEye, faClock, faVideo, faFilm);

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();

</script>

<style scoped>
</style>