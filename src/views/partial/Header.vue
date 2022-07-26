<template>
  <div class="bg-zinc-800">
    <nav class="relative py-3 pl-4 md:pl-8 pr-8">
      <div class="flex items-center justify-between">
        <div class="flex">
          <div class="pt-2 mr-4 border border-t-0 border-l-0 border-b-0 border-r-1 border-zinc-600">
            <font-awesome-icon :icon="['fas', 'tv']" class="w-10 h-10 text-emerald-400 pr-4" />
          </div>
          <p class="text-xl sm:text-3xl text-zinc-300 pt-3 sm:pt-2 mr-4">Overview</p>
        </div>

        <div class="hidden lg:flex space-x-10 text-zinc-300 text-lg pt-1">
          <router-link to="/dashboard" class="flex flex-col items-center hover:underline hover:decoration-2 hover:decoration-dotted hover:decoration-emerald-500" :exact-active-class="'underline decoration-2 decoration-emerald-500 text-emerald-500'">
            <font-awesome-icon :icon="['fas', 'chart-line']" class="w-5 h-5" />
            <p class="text-zinc-300">Overview</p>
          </router-link>
          <router-link to="/dashboard/streams" class="flex flex-col items-center hover:underline hover:decoration-2 hover:decoration-dotted hover:decoration-emerald-500" :exact-active-class="'underline decoration-2 decoration-emerald-500 text-emerald-500'">
            <font-awesome-icon :icon="['fas', 'video']" class="w-5 h-5" />
            <p class="text-zinc-300">Streams</p>
          </router-link>
          <router-link to="/dashboard/assets" class="flex flex-col items-center hover:underline hover:decoration-2 hover:decoration-dotted hover:decoration-emerald-500" :exact-active-class="'underline decoration-2 decoration-emerald-500 text-emerald-500'">
            <font-awesome-icon :icon="['fas', 'film']" class="w-5 h-5" />
            <p class="text-zinc-300">Assets</p>
          </router-link>
          <router-link to="/dashboard/billing" class="flex flex-col items-center hover:underline hover:decoration-2 hover:decoration-dotted hover:decoration-emerald-500" :exact-active-class="'underline decoration-2 decoration-emerald-500 text-emerald-500'">
            <font-awesome-icon :icon="['fas', 'money-bill']" class="w-5 h-5" />
            <p class="text-zinc-300">Billing</p>
          </router-link>
          <router-link to="/dashboard/support" class="flex flex-col items-center hover:underline hover:decoration-2 hover:decoration-dotted hover:decoration-emerald-500" :exact-active-class="'underline decoration-2 decoration-emerald-500 text-emerald-500'">
            <font-awesome-icon :icon="['fas', 'headset']" class="w-5 h-5" />
            <p class="text-zinc-300">Support</p>
          </router-link>
          <router-link to="/dashboard/organization" class="flex flex-col items-center hover:underline hover:decoration-2 hover:decoration-dotted hover:decoration-emerald-500" :exact-active-class="'underline decoration-2 decoration-emerald-500 text-emerald-500'">
            <font-awesome-icon :icon="['fas', 'user-group']" class="w-5 h-5" />
            <p class="text-zinc-300">Organization</p>
          </router-link>
        </div>

        <div class="flex items-center">
          <button class="mt-2 block hamburger lg:hidden focus:outline-none" :class="{ 'open': NavIsOpen }" @click="NavMenu">
            <span class="hamburger-top bg-zinc-300"></span>
            <span class="hamburger-middle bg-zinc-300"></span>
            <span class="hamburger-bottom bg-zinc-300"></span>
          </button>
          <div class="flex ml-4 border border-t-0 border-r-0 border-b-0 border-l-1 border-zinc-600">
            <font-awesome-icon :icon="['far', 'bell']" class="hidden sm:flex pt-2 w-7 h-7 text-zinc-300 pl-4 pr-4" />
            <button @click="UserMenu" class="pl-3 sm:pl-0">
              <img class="h-12 rounded-full" :src="'http://localhost:3000'+ userStore.getAvatar" alt="Avatar">
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Nav Menu -->
      <div class="lg:hidden">
        <div class="rounded absolute flex-col items-center pt-3 pb-5 px-10 mt-4 space-y-6 font-bold text-lg bg-zinc-800 right-6 drop-shadow-md text-zinc-300" :class="{'flex': NavIsOpen, 'hidden': !NavIsOpen}">
          <router-link to="/dashboard" :exact-active-class="'underline decoration-2 decoration-emerald-500'">Overview</router-link>
          <router-link to="/dashboard/streams" :exact-active-class="'underline decoration-2 decoration-emerald-500'">Streams</router-link>
          <router-link to="/dashboard/assets" :exact-active-class="'underline decoration-2 decoration-emerald-500'">Assets</router-link>
          <router-link to="/dashboard/billing" :exact-active-class="'underline decoration-2 decoration-emerald-500'">Billing</router-link>
          <router-link to="/dashboard/support" :exact-active-class="'underline decoration-2 decoration-emerald-500'">Support</router-link>
          <router-link to="/dashboard/organization" :exact-active-class="'underline decoration-2 decoration-emerald-500'">Organization</router-link>
        </div>
      </div>

      <!-- Mobile User Menu -->
      <div class="">
        <div class="rounded absolute flex-col w-60 mt-4 font-bold text-lg bg-zinc-900 right-6 drop-shadow-md text-zinc-300" :class="{'flex': UserIsOpen, 'hidden': !UserIsOpen}">
          <div class="bg-zinc-800 grid grid-rows-3 grid-flow-col gap-1 pt-5 pl-5 max-h-24">
            <img class="h-14 w-14 rounded-full row-span-3" :src="'http://localhost:3000'+ userStore.getAvatar" alt="Avatar">
            <p class="font-extralight col-span-2">{{ userStore.getFirstName }} {{ userStore.getLastName }}</p>
            <p class="font-thin text-sm row-span-2 col-span-2">{{ userStore.getOrgName }}</p>
          </div>
          <div class="sm:hidden flex px-5 py-3 border border-t-0 border-r-0 border-b-1 border-l-0 transition duration-200 border-zinc-600 hover:bg-zinc-700 text-zinc-300 hover:text-emerald-400">
            <font-awesome-icon :icon="['far', 'bell']" class="w-6 h-6 mt-2" />
            <div class="ml-5">
              <p class="font-light text-sm text-zinc-300">Notifications</p>
              <p class="font-thin text-xs pt-1 text-zinc-300">Check recent notifications</p>
            </div>
          </div>
          <div @click="userStore.profileModalButton()" style="cursor: pointer" class="flex px-5 py-3 border border-t-0 border-r-0 border-b-1 border-l-0 transition duration-200 border-zinc-600 hover:bg-zinc-700 text-zinc-300 hover:text-emerald-400">
            <font-awesome-icon :icon="['far', 'user']" class="w-6 h-6 mt-2" />
            <div class="ml-5">
              <p class="font-light text-sm text-zinc-300">Profile</p>
              <p class="font-thin text-xs row-span-2 pt-1 text-zinc-300">Edit your profile</p>
            </div>
          </div>
          <div class="flex px-5 py-3 border border-t-0 border-r-0 border-b-1 border-l-0 transition duration-200 border-zinc-600 hover:bg-zinc-700 text-zinc-300 hover:text-emerald-400">
            <font-awesome-icon :icon="['fas', 'gear']" class="w-6 h-6 mt-2" />
            <div class="ml-5">
              <p class="font-light text-sm text-zinc-300">Settings</p>
              <p class="font-thin text-xs pt-1 text-zinc-300">Account Settings</p>
            </div>
          </div>
          <router-link to="/admin">
            <div class="flex px-5 py-3 border border-t-0 border-r-0 border-b-1 border-l-0 transition duration-200 border-zinc-600 hover:bg-zinc-700 text-zinc-300 hover:text-emerald-400">
              <font-awesome-icon :icon="['fas', 'toolbox']" class="w-6 h-6 mt-2" />
              <div class="ml-5">
                <p class="font-light text-sm text-zinc-300">Administration</p>
                <p class="font-thin text-xs pt-1 text-zinc-300">Global Settings</p>
              </div>
            </div>
          </router-link>
          <button @click="onLogout" class="m-2 text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-emerald-400 dark:hover:bg-emerald-500 focus:outline-none hover:shadow-md hover:shadow-emerald-800 transition duration-200">
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" class="" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faTv, faChartLine, faVideo, faFilm, faMoneyBill, faHeadset, faUserGroup, faGear, faArrowRightFromBracket, faToolbox } from '@fortawesome/free-solid-svg-icons';
library.add(faTv, faBell, faChartLine, faVideo, faFilm, faMoneyBill, faHeadset, faUserGroup, faUser, faGear, faArrowRightFromBracket, faToolbox);

// MISC
import { ref } from 'vue';

const NavIsOpen = ref(false);
function NavMenu(){
	NavIsOpen.value = !NavIsOpen.value;
	UserIsOpen.value = false;
}

const UserIsOpen = ref(false);
function UserMenu(){
	UserIsOpen.value = !UserIsOpen.value;
	NavIsOpen.value = false;
}

// STORES
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();

// ROUTERS
import { useRouter } from 'vue-router';
const router = useRouter();

function onLogout(){
	organizationStore.logout();
	userStore.logout()
		.then(() => {
			router.push('/login');
		});
}

</script>

<style scoped>
.hamburger {
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: all 0.25s;
  position: relative;
}

.hamburger-top,
.hamburger-middle,
.hamburger-bottom {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 2px;
  transform: rotate(0);
  transition: all 0.5s;
}

.hamburger-middle {
  transform: translateY(7px);
}

.hamburger-bottom {
  transform: translateY(14px);
}

.open {
  transform: rotate(90deg);
  transform: translateY(0px);
}

.open .hamburger-top {
  transform: rotate(45deg) translateY(6px) translate(6px);
}

.open .hamburger-middle {
  display: none;
}

.open .hamburger-bottom {
  transform: rotate(-45deg) translateY(6px) translate(-6px);
}
</style>