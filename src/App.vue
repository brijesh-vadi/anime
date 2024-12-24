<script setup lang="ts">
import { onMounted } from 'vue';
import useAnimeStore from './stores/animeStore';
import { useDark } from '@vueuse/core';

const animeStore = useAnimeStore();

onMounted(async () => {
  await animeStore.getAnimes();
});

const mode = useDark();
</script>

<template>
  <div class="p-6">
    <RouterView />
  </div>
</template>

<style scoped></style>
