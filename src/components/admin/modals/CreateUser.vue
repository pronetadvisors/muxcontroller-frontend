<template>
  <button
      @click="isOpen = true"
      type="button"
  >
    <font-awesome-icon :icon="['fas', 'circle-plus']" class="w-8 h-8 rounded-full bg-emerald-500 border-2 border-emerald-500 text-zinc-800 transition duration-200 hover:border-zinc-800 hover:bg-zinc-800 hover:text-emerald-500" />
  </button>

  <div
      v-show="isOpen"
      class="
      absolute
      inset-0
      flex
      items-center
      justify-center
      bg-gray-700 bg-opacity-50
    "
  >
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
      <div class="relative p-4 w-full h-full md:h-auto">
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="isOpen = false">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="py-6 px-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">Create a new User</h3>
          <form class="space-y-6" @submit.prevent="onSubmit">
            <div>
              <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Name</label>
              <input type="text" v-model="firstname" name="firstname" id="firstname" placeholder="John" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <div>
              <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
              <input type="text" v-model="lastname" name="lastname" id="lastname" placeholder="Doe" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
	          <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
              <input type="text" v-model="username" name="username" id="username" placeholder="John.Doe" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
              <input type="email" v-model="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
              <input type="password" v-model="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="**********" required>
            </div>
            <button type="submit" value="submit" class="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-emerald-800">Create User</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// PROPS
const props = defineProps(['id']);

//MISC
import { ref } from 'vue';

let isOpen = ref(false);
const firstname = ref('');
const lastname = ref('');
const username = ref('');
const email = ref('');
const password = ref('');

// STORES
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();


async function onSubmit() {
	let user = {
		firstname: firstname.value,
		lastname: lastname.value,
		username: username.value,
		role: "2",
		email: email.value,
		organization_id: props.id,
		password: password.value
	};

	userStore.createUser(user)
		.then(() => {
			organizationStore.getDBOrganizations();
		});

	isOpen.value = false;
}

</script>