<template>
  <Header></Header>
  <router-view></router-view>
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