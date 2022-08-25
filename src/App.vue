<script setup>
// COMPONENTS
import Profile from '@/components/global/Profile.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <router-view />
  </div>
  <notifications position="bottom right" max="25" />

	<profile />
</template>