<template>
  <div class="flex justify-between col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4 mt-10">
    <div class="flex">
      <label class="ml-4 block relative flex items-center text-zinc-300 focus-within:text-emerald-400">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
        <input type="search" placeholder="Search..." v-model="search" class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
      </label>
    </div>
    <div class="flex mt-4">
      <button type="button" class="text-white font-light bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-400 dark:hover:bg-emerald-500 focus:outline-none hover:shadow-md hover:shadow-emerald-800 transition duration-200">+ Create Stream</button>
    </div>
  </div>
  <div class="col-start-2 col-span-6 2xl:col-start-3 2xl:col-span-4">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3">
            Preview
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            Stream ID
          </th>
          <th scope="col" class="px-6 py-3">
            Embed HTML
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <th scope="row" class="px-6">
              <img class="h-12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png">
            </th>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Testing123
            </td>
            <td class="px-6 py-4">
              1Pmi002Zo00GT02SVGL1CM00vItgdz00WJ8Fj9e6bcAROMTo
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Copy</a>
            </td>
            <td class="px-6 py-4 flex">
              <div class="rounded-full bg-blue-500 px-4 text-white">Idle</div>
            </td>
            <td class="px-6 py-4 text-right">
              <a href="#">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="w-4 h-4" />
              </a>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <th scope="row" class="px-6">
              <img class="h-12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png">
            </th>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Testing234
            </td>
            <td class="px-6 py-4">
              1Pmi002Zo00GT02SVGL1CM00vItgdz00WJ8Fj9e6bcAROMTo
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Copy</a>
            </td>
            <td class="px-6 py-4 flex">
              <div class="rounded-full bg-red-500 px-4 text-white">Errored</div>
            </td>
            <td class="px-6 py-4 text-right">
              <a href="#">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="w-4 h-4" />
              </a>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <th scope="row" class="px-6">
              <img class="h-12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png">
            </th>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Testing456
            </td>
            <td class="px-6 py-4">
              1Pmi002Zo00GT02SVGL1CM00vItgdz00WJ8Fj9e6bcAROMTo
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Copy</a>
            </td>
            <td class="px-6 py-4 flex">
              <div class="rounded-full bg-green-500 px-4 text-white">Live</div>
            </td>
            <td class="px-6 py-4 text-right">
              <a href="#">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="w-4 h-4" />
              </a>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-600">
            <th scope="row" class="px-6">
              <img class="h-12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png">
            </th>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Testing456
            </td>
            <td class="px-6 py-4">
              1Pmi002Zo00GT02SVGL1CM00vItgdz00WJ8Fj9e6bcAROMTo
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Copy</a>
            </td>
            <td class="px-6 py-4 flex">
              <div class="rounded-full bg-yellow-500 px-4 text-white">Disabled</div>
            </td>
            <td class="px-6 py-4 text-right">
              <a href="#">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="w-4 h-4" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-4"></div>
      <button class="rounded-full bg-zinc-800 text-white w-8 h-8 mx-1">1</button>
      <button class="rounded-full bg-zinc-800 text-white w-8 h-8 mx-1">2</button>
      <button class="rounded-full bg-zinc-800 text-white w-8 h-8 mx-1">3</button> 
    </div>
  </div>
</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faEllipsisVertical);

</script>

<style scoped>

</style>