<template>
  <Header></Header>
  <div class="bg-zinc-600 pb-8 grow">
    <div class="grid grid-cols-8 gap-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '../partial/Header.vue';
export default {
	name: "Master",
	components: {
		Header
	}
};
</script>

<style scoped>

</style>