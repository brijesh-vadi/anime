<script setup lang="ts">
import useAnimeStore from '@/stores/animeStore';
import { statusFilters, type StatusFilter } from '@/types';

const animeStore = useAnimeStore();

const isSelected = (filter: StatusFilter) => animeStore.selectedStatusFilter === filter;
</script>

<template>
  <main class="flex items-center gap-4">
    <div v-for="filter in statusFilters" :key="filter">
      <button
        class="px-4 py-2 rounded-md"
        :class="{
          'bg-zinc-800 text-white ': isSelected(filter),
          ' text-zinc-300': !isSelected(filter),
        }"
        @click="animeStore.selectedStatusFilter = filter">
        {{ filter }}
      </button>
    </div>
  </main>
</template>
