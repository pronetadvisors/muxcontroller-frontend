<template>
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-zinc-800 py-6 sm:py-12">
    <p class="relative mx-auto text-3xl text-gray-300">Welcome Back.</p>
    <p class="relative mx-auto text-sm font-thin text-gray-400">Please sign in to your account</p>
    <router-link to="/register" class="relative mx-auto text-sm font-thin p-3 text-emerald-400">I don't have an account yet</router-link>
    <div class="container mx-auto content-center pl-2 pr-2">
      <div class="relative bg-zinc-900 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg px-10">
        <div class="mx-auto max-w-md">
          <form @submit.prevent="onSubmit">
            <label class="block relative flex items-center text-zinc-300 focus-within:text-emerald-400">
              <font-awesome-icon :icon="['far', 'envelope']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="email" placeholder="Email" v-model="email" class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>
            <label class="block relative flex items-center text-zinc-300 focus-within:text-emerald-400 mt-2">
              <font-awesome-icon :icon="['fas', 'lock']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="password" placeholder="Password" v-model="password" class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>
            <div class="form-check mt-3">
              <input v-model="rememberme" class="form-check-input h-4 w-4 border border-zinc-600 rounded-sm bg-zinc-800 accent-emerald-400 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="">
              <label class="form-check-label inline-block text-zinc-300" for="RememberMe">
                Remember Me
              </label>
            </div>
            <div class="mt-3">
              <a href="/login">
                <button type="submit" value="submit" class="w-full text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-400 dark:hover:bg-emerald-500 focus:outline-none hover:shadow-md hover:shadow-emerald-800 transition duration-200">Sign In</button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

    <router-link to="/password_reset" class="relative mx-auto text-sm font-thin p-3 text-gray-400">I forgot my password</router-link>
  </div>
</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
library.add(faEnvelope, faLock);

// MISC
import { ref } from 'vue';
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";

// STORES
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

// ROUTERS
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('');
const password = ref('');
const rememberme = ref(false);

async function onSubmit() {
	let user = {
		email: email.value,
		password: password.value,
		rememberme: rememberme.value,
	};

	axios.post('http://localhost:3000/api/users/login', user)
		.then(res => {
			userStore.token = res.data.token;
			userStore.getUser(true)
				.then(() => {
					notify({
						type: 'success',
						title: 'Welcome to NOC4!'
					});
				});
		})
		.catch(() => {
			console.log("User and Pass incorrect");
		});
}
</script>

<style scoped>

</style>