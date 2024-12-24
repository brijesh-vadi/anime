<script setup lang="ts">
import AnimeTable from '@/components/AnimeTable.vue';
import AppliedFilters from '@/components/AppliedFilters.vue';
import Pagination from '@/components/Pagination.vue';
import StatusFilters from '@/components/StatusFilters.vue';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/Loader.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAnimeStore from '@/stores/animeStore';
import { watch } from 'vue';

const animeStore = useAnimeStore();

const typeFilters: string[] = ['tv', 'movie', 'ova', 'special', 'ona', 'music', 'cm', 'pv', 'tv_special'];

const handleSearchQueryChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const searchValue = target.value;

  if (searchValue === '') {
    animeStore.appliedFilters = animeStore.appliedFilters.filter((filter) => filter.type !== 'Title');
  } else {
    const existingFilterIndex = animeStore.appliedFilters.findIndex((filter) => filter.type === 'Title');

    if (existingFilterIndex !== -1) {
      animeStore.appliedFilters[existingFilterIndex].value = searchValue;
    } else {
      animeStore.appliedFilters.push({
        type: 'Title',
        value: searchValue,
      });
    }
  }
};

watch(
  () => animeStore.selectedTypeFilter,
  (newVal) => {
    animeStore.appliedFilters.push({
      type: 'Type',
      value: newVal,
    });
  }
);
</script>

<template>
  <main class="p-6 flex flex-col gap-6">
    <StatusFilters />
    <div class="flex items-center gap-10">
      <Select v-model="animeStore.selectedTypeFilter">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem v-for="type in typeFilters" :value="type">{{ type.toUpperCase() }}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        v-model="animeStore.searchQuery"
        @input="handleSearchQueryChange"
        type="text"
        class="w-96"
        placeholder="Search..." />
    </div>
    <Loader v-if="animeStore.isLoading" />
    <template v-else>
      <AppliedFilters />
      <AnimeTable />
      <Pagination />
    </template>
  </main>
</template>
