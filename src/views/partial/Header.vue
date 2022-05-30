<template>
  <div class="bg-zinc-800">
    <nav class="relative ml-4 py-4 px-8">
      <div class="flex items-center justify-between">
        <div class="flex">
          <div class="pt-2 mr-4 border border-t-0 border-l-0 border-b-0 border-r-1 border-zinc-600">
            <font-awesome-icon :icon="['fas', 'tv']" class="w-10 h-10 text-emerald-400 pr-4" />
          </div>
          <p class="text-3xl text-zinc-300 pt-2">Overview</p>
        </div>

        <div class="hidden md:flex space-x-12 text-zinc-300 text-lg pt-2">
          <router-link to="/dashboard" class="flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'chart-line']" class="w-5 h-5 text-zinc-300" />
            <p>Overview</p>
          </router-link>
          <router-link to="/dashboard/streams" class="flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'video']" class="w-5 h-5 text-zinc-300" />
            <p>Streams</p>
          </router-link>
          <router-link to="/dashboard/assets" class="flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'film']" class="w-5 h-5 text-zinc-300" />
            <p>Assets</p>
          </router-link>
          <router-link to="/dashboard/billing" class="flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'money-bill']" class="w-5 h-5 text-zinc-300" />
            <p>Billing</p>
          </router-link>
          <router-link to="/dashboard/support" class="flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'headset']" class="w-5 h-5 text-zinc-300" />
            <p>Support</p>
          </router-link>
          <router-link to="/dashboard/organization" class="flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'user-group']" class="w-5 h-5 text-zinc-300" />
            <p>Organization</p>
          </router-link>
        </div>

        <div>
          <div class="flex ml-4 border border-t-0 border-r-0 border-b-0 border-l-1 border-zinc-600">
            <font-awesome-icon :icon="['far', 'bell']" class="pt-2 w-7 h-7 text-zinc-300 pl-4 pr-4" />
            <img class="h-12 rounded-full" src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1" alt="Avatar">
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faTv, faChartLine, faVideo, faFilm, faMoneyBill, faHeadset, faUserGroup } from '@fortawesome/free-solid-svg-icons';
library.add(faTv, faBell, faChartLine, faVideo, faFilm, faMoneyBill, faHeadset, faUserGroup);

export default {
	name: "Header"
};
</script>

<style scoped>

</style>