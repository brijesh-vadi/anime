<script setup lang="ts">
import { onMounted } from 'vue';
import useAnimeStore from './stores/animeStore';

const animeStore = useAnimeStore();

onMounted(async () => {
  await animeStore.getAnimes();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
