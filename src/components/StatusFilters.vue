<script setup lang="ts">
import { ref } from 'vue';

const statusFilters = ['All', 'Airing', 'Completed', 'Upcoming'] as const;

type StatusFilter = (typeof statusFilters)[number];

const selectedFilter = ref<StatusFilter>('All');

const isSelected = (filter: StatusFilter) => selectedFilter.value === filter;
</script>

<template>
  <main class="flex items-center gap-4">
    <!-- Iterate over statusFilters and create a clickable element for each -->
    <div v-for="filter in statusFilters" :key="filter">
      <button
        class="px-4 py-2 rounded-md"
        :class="{
          'bg-zinc-800 text-white ': isSelected(filter),
          'text-zinc-700': !isSelected(filter),
        }"
        @click="selectedFilter = filter">
        {{ filter }}
      </button>
    </div>
  </main>
</template>
