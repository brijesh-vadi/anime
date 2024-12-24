<script setup lang="ts">
import useAnimeStore from '@/stores/animeStore';
import type { AppliedFilter } from '@/types';
import { X } from 'lucide-vue-next';

defineProps<{
  appliedFilter: AppliedFilter;
}>();

const animeStore = useAnimeStore();

const handleRemoveFilter = (appliedFilter: AppliedFilter) => {
  animeStore.appliedFilters = animeStore.appliedFilters.filter((filter) => filter.type !== appliedFilter.type);

  switch (appliedFilter.type) {
    case 'Status':
      animeStore.selectedStatusFilter = 'All';
      break;
    case 'Type':
      animeStore.selectedTypeFilter = '';
      break;
    case 'Title':
      animeStore.searchQuery = '';
      break;
  }
};
</script>

<template>
  <div class="border border-dashed border-zinc-500 px-2 py-2 rounded-md flex items-center gap-2">
    <div>{{ appliedFilter.type }} :</div>
    <div class="bg-zinc-800 px-2 py-1.5 rounded-md text-sm flex items-center gap-2">
      {{ appliedFilter.value }}
      <div @click="handleRemoveFilter(appliedFilter)" class="cursor-pointer bg-zinc-600 rounded-full p-1">
        <X :size="14" />
      </div>
    </div>
  </div>
</template>
