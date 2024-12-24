<script setup lang="ts">
import useAnimeStore from '@/stores/animeStore';
import { computed } from 'vue';
import Badge from './ui/Badge.vue';
import { Trash } from 'lucide-vue-next';
import { Button } from './ui/button';

const animeStore = useAnimeStore();

const appliedFilters = computed(() => {
  return animeStore.appliedFilters;
});

const handleClearAppliedFilters = () => {
  animeStore.appliedFilters = [];
};
</script>

<template>
  <main class="flex items-center gap-4">
    <Badge v-for="filter in appliedFilters" :key="filter.value" :applied-filter="filter" />
    <Button
      @click="handleClearAppliedFilters"
      v-if="appliedFilters.length"
      variant="destructive"
      class="flex items-center gap-2 bg-red-600 hover:bg-red-800">
      <Trash :size="18" />
      <span>Clear</span>
    </Button>
  </main>
</template>
