<script setup lang="ts">
import useAnimeStore from '@/stores/animeStore';
import { onMounted } from 'vue';

const animeStore = useAnimeStore();

onMounted(async () => {
  await animeStore.getAnimes();
});
</script>

<template>
  <main>
    <h1>Home Page</h1>
  </main>
</template>
