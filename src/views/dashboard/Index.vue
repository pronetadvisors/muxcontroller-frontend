<template>
 <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10 mb-10">
   <div class="flex">
     <img class="h-20 rounded-full" :src="img_url + userStore.getAvatar" alt="Avatar">
     <div class="ml-4 mt-3">
       <p class="text-zinc-200 text-2xl">Welcome back, {{ userStore.getFirstName }} {{ userStore.getLastName }}</p>
<!--       <p class="text-zinc-200 text-2xl">Welcome back, John Doe</p>-->
       <p class="text-zinc-400 text-md font-thin">Welcome back to the NOC4 Overview dashboard.</p>
     </div>
   </div>
   <div class="flex mt-4">
     <router-link to="/">
       <button type="button" class="text-white font-light bg-zinc-400 hover:bg-zinc-600 focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-800 dark:hover:bg-zinc-900 focus:outline-none hover:shadow-md hover:shadow-zinc-800 transition duration-200">View Invoices</button>
     </router-link>
     <create-stream />
   </div>
 </div>
 <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 grid grid-cols-2 gap-4">
   <QuickStats></QuickStats>
   <ActiveStreams></ActiveStreams>
 </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 grid grid-cols-3 gap-4">
    <router-link to="/dashboard/NOC4" class="col-span-2 bg-gradient-to-r from-emerald-400 to-green-400 hover:from-green-400 hover:to-emerald-400 rounded m-2 p-4 flex transition duration-200 hover:scale-105">
      <p class="text-white text-2xl font-semibold">
        Enter the NOC4 Dashboard
      </p>
      <font-awesome-icon :icon="['fas', 'arrow-right-long']" class="ml-10 w-9 h-9 text-white" />
    </router-link>
    <div class="bg-zinc-800 rounded m-2">
      Need Help?
    </div>
  </div>

</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRightLong);

import { ref } from 'vue';

const img_url = ref(import.meta.env.VITE_IMG_URL || "");

// STORES
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

// COMPONENTS
import QuickStats from '@/components/dashboard/QuickStats.vue';
import ActiveStreams from '@/components/dashboard/ActiveStreams.vue';
import CreateStream from '@/components/dashboard/modals/CreateStream.vue';

// import { ref } from 'vue';

</script>

<style scoped>

</style>