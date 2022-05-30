<template>
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
    <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div class="mx-auto max-w-md">
        <div class="divide-y divide-gray-300/50">
          <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
            <h1 class="font-mono text-5xl font-bold text-emerald-400">404</h1>
            <h1 >Page not Found</h1>
            <p>If this issue persists, please contact support.</p>
          </div>
          <div class="pt-8">
            <router-link to="/">
              <button type="button" class="text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-400 dark:hover:bg-emerald-600 focus:outline-none dark:focus:ring-emerald-600">Return home</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "404"
};
</script>

<style scoped>

</style>