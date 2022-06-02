<template>
 <div class="bg-zinc-600 pb-10">
   <div class="grid grid-cols-6 gap-4">
     <div class="flex justify-between col-start-2 col-span-4 mt-10 mb-10">
       <div class="flex">
         <img class="h-20 rounded-full" src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1" alt="Avatar">
         <div class="ml-4 mt-3">
           <p class="text-zinc-200 text-2xl">Welcome back, {{ FirstName }} {{ LastName }}</p>
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
   <div class="grid grid-cols-6 gap-4">
     <div class="col-start-2 col-span-4 grid grid-cols-2 gap-4">
       <div class="mx-auto mx-2 bg-zinc-700 rounded p-5">
         <p class="text-lg text-zinc-200 font-thin">Quick Stats</p>
         <div class="grid grid-cols-2 gap-4 mt-3">
           <div class="mx-auto mx-2 bg-zinc-800 rounded p-4 flex">
             <font-awesome-icon :icon="['fas', 'video']" class="h-11 text-zinc-300" />
             <div class="ml-4 mt-0">
               <p class="text-zinc-200 text-md">10</p>
               <p class="text-zinc-400 text-sm font-thin">Active Streams</p>
             </div>
           </div>

           <div class="mx-auto mx-2 bg-zinc-800 rounded p-4 flex">
             <font-awesome-icon :icon="['fas', 'film']" class="h-11 text-zinc-300" />
             <div class="ml-4 mt-0">
               <p class="text-zinc-200 text-md">100</p>
               <p class="text-zinc-400 text-sm font-thin">Total Assets</p>
             </div>
           </div>

           <div class="mx-auto mx-2 bg-zinc-800 rounded p-4 flex">
             <font-awesome-icon :icon="['far', 'eye']" class="h-11 text-zinc-300" />
             <div class="ml-4 mt-0">
               <p class="text-zinc-200 text-md">18,900</p>
               <p class="text-zinc-400 text-sm font-thin">Monthly Viewers</p>
             </div>
           </div>


           <div class="mx-auto mx-2 bg-zinc-800 rounded p-4 flex">
             <font-awesome-icon :icon="['far', 'clock']" class="h-11 text-zinc-300" />
             <div class="ml-4 mt-0">
               <p class="text-zinc-200 text-md">19:10:12</p>
               <p class="text-zinc-400 text-sm font-thin">Monthly Playing Time</p>
             </div>
           </div>
         </div>
       </div>
       <div class="mx-auto mx-2 bg-zinc-700 rounded p-5">
         <p class="text-lg text-zinc-200 font-thin">Active Streams</p>
         <table class="table-auto bg-zinc-800 mt-3 rounded w-full">
           <thead>
             <tr class="text-zinc-300 text-md">
               <th class="font-light">Preview</th>
               <th class="font-light">Status</th>
               <th class="font-light">Created At</th>
               <th class="font-light">Stream ID</th>
               <th class="font-light">Stream Key</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>Img</td>
               <td>Idle</td>
               <td>9/12/2021</td>
               <td></td>
               <td></td>
             </tr>
             <tr>
               <td>Img</td>
               <td>Idle</td>
               <td>9/12/2021</td>
               <td></td>
               <td></td>
             </tr>
             <tr>
               <td>Img</td>
               <td>Idle</td>
               <td>9/12/2021</td>
               <td></td>
               <td></td>
             </tr>
           </tbody>
         </table>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVideo, faFilm } from '@fortawesome/free-solid-svg-icons';
import { faEye, faClock } from '@fortawesome/free-regular-svg-icons';
library.add(faVideo, faFilm, faEye, faClock);

import { mapGetters } from 'vuex';
export default {
	name: "Home",
	data(){
		return {

		};
	},
	computed: {
		...mapGetters('user', {
			FirstName: 'getFirstName',
			LastName: 'getLastName'
		})
	},
};
</script>

<style scoped>

</style>