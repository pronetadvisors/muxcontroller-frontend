<template>
  <Header></Header>
  <div class="bg-zinc-600 pb-8 grow">
    <div class="grid grid-cols-8 gap-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Header from '../partial/Header.vue';

// STORES
import { useOrganizationStore } from '@/stores/organization.js';
const organizationStore = useOrganizationStore();

organizationStore.getDBOrganizations();
</script>

<style scoped>

</style>