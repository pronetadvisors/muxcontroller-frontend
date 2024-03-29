<template>
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-zinc-800 py-6 sm:py-12">
    <p class="relative mx-auto text-3xl text-gray-300">Join Us Now.</p>
    <p class="relative mx-auto text-sm font-thin text-gray-400">Start by creating your account</p>
    <router-link to="/login" class="relative mx-auto text-sm font-thin p-3 text-emerald-400">I already have an account yet</router-link>
    <div class="container mx-auto content-center pl-2 pr-2">
      <div class="relative bg-zinc-900 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg px-10">
        <div class="mx-auto max-w-md">
          <form @submit.prevent="onSubmit">
            <label class="block relative flex items-center text-zinc-300 focus-within:text-emerald-400">
              <font-awesome-icon :icon="['far', 'user']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="text" placeholder="First Name" v-model="firstname" class="mr-1 pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
              <input type="text" placeholder="Last Name" v-model="lastname" class="ml-1 pl-3 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>

            <label class="block relative flex items-center text-zinc-300 focus-within:text-emerald-400 mt-2">
              <font-awesome-icon :icon="['far', 'envelope']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="email" placeholder="Email" v-model="email" class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>

            <label class="block relative flex items-center text-zinc-300 focus-within:text-emerald-400 mt-2">
              <font-awesome-icon :icon="['fas', 'lock']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="password" placeholder="Password" v-model="password" class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>

            <label class="block relative flex items-center text-zinc-300 focus-within:text-emerald-400 mt-2">
              <font-awesome-icon :icon="['fas', 'lock']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="password" placeholder="Repeat Password" v-model="password2" class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>
            <div class="form-check mt-3">
              <input v-model="promotional" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="RememberMe">
              <label class="form-check-label inline-block text-zinc-300" for="RememberMe">
                Receive promotional emails
              </label>
            </div>
            <div class="mt-3">
              <button type="submit" value="submit" class="w-full text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-400 dark:hover:bg-emerald-500 focus:outline-none hover:shadow-md hover:shadow-emerald-800 transition duration-200">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
library.add(faEnvelope, faUser, faLock);

// STORES
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

// ROUTERS
import { useRouter } from 'vue-router';
const router = useRouter();

// MISC
import { ref } from 'vue';
import axios from "axios";

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const password2 = ref('');
const promotional = ref(false);


async function onSubmit() {
	if(password.value === password2.value){
		let user = {
			firstname: firstname.value,
			lastname: lastname.value,
			email: email.value,
			password: password.value,
			promotional: promotional.value
		};

		axios.post(import.meta.env.VITE_API_URL + '/api/users', user)
			.then(res => {
				userStore.token = res.data.token;
				userStore.getUser()
					.then(() => {
						router.push('/dashboard');
					});
			})
			.catch(() => {
				console.log("Register request invalid");
			});
	}else{
		//TODO - THROW NOTIFICATION THAT PASSWORDS DONT MATCH
	}
}
</script>

<style scoped>

</style>