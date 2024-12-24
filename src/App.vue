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
  <RouterView />
</template>

<style scoped></style>
