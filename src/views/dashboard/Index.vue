<template>
 <div class="bg-zinc-600 pb-10">
   <div class="grid grid-cols-10 gap-4">
     <div class="flex justify-between col-start-2 col-span-8 mt-10 mb-10">
       <div class="flex">
         <img class="h-20 rounded-full" src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1" alt="Avatar">
         <div class="ml-4 mt-3">
           <p class="text-zinc-200 text-2xl">Welcome back, {{ userStore.getFirstName }} {{ userStore.getLastName }}</p>
           <p class="text-zinc-400 text-sm font-thin">Welcome back to the NOC4 Overview dashboard.</p>
         </div>
       </div>
       <div class="flex mt-4">
         <router-link to="/">
           <button type="button" class="text-white font-light bg-zinc-400 hover:bg-zinc-600 focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-800 dark:hover:bg-zinc-900 focus:outline-none hover:shadow-md hover:shadow-zinc-800 transition duration-200">View Invoices</button>
         </router-link>
         <router-link to="/">
           <button type="button" class="text-white font-light bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-400 dark:hover:bg-emerald-500 focus:outline-none hover:shadow-md hover:shadow-emerald-800 transition duration-200">Create Stream</button>
         </router-link>
       </div>
     </div>
   </div>
   <div class="grid grid-cols-10 gap-4">
     <div class="col-start-2 col-span-8 grid grid-cols-2 gap-4">
       <QuickStats></QuickStats>
       <ActiveStreams></ActiveStreams>
     </div>
   </div>
 </div>
</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVideo, faFilm } from '@fortawesome/free-solid-svg-icons';
import { faEye, faClock } from '@fortawesome/free-regular-svg-icons';
library.add(faVideo, faFilm, faEye, faClock);

// STORES
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

// COMPONENTS
import QuickStats from '@/components/dashboard/QuickStats.vue';
import ActiveStreams from '@/components/dashboard/ActiveStreams.vue';
</script>

<style scoped>

</style>