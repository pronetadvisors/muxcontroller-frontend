<template>
  <button @click="isOpen = true">
    <font-awesome-icon :icon="['far', 'trash-can']" class="w-4 h-4 text-red-500 transition duration-200 hover:scale-125" />
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
        <div class="py-6 px-6 lg:px-8 text-center">
          <h3 class="mb-4 text-3xl font-medium text-gray-900 dark:text-white">{{ name}}</h3>
          <p class="text-xl text-gray-100">Are you sure you want to delete this organization? Deletions are irreversible.</p>
          <div class="space-y-6 mt-5">
            <button @click="isOpen = false" class="w-1/3 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-800 mr-10">Cancel</button>
            <button @click="onDelete" class="w-1/3 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-800">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
library.add(faTrashCan);

// PROPS
const props = defineProps(['id', 'orgname']);

//MISC
import { ref } from 'vue';

let isOpen = ref(false);
let name = ref(props.orgname);

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();


async function onDelete() {
	await organizationStore.deleteOrganization(props.id);

	isOpen.value = false;
}

</script>