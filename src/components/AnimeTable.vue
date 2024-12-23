<script setup lang="ts">
import useAnimeStore from '@/stores/animeStore';
import type { AnimeStatus } from '@/types';
import { computed } from 'vue';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const animeStore = useAnimeStore();

const filteredAnimes = computed(() => {
  let filteredList = animeStore.animes;

  // search query filter
  if (animeStore.searchQuery.trim()) {
    filteredList = filteredList.filter((anime) =>
      anime.title.toLowerCase().includes(animeStore.searchQuery.toLowerCase())
    );
  }

  // status filter
  if (animeStore.selectedStatusFilter !== 'All') {
    filteredList = filteredList.filter((anime) => anime.status === animeStore.selectedStatusFilter);
  }

  // type filter
  if (animeStore.selectedTypeFilter) {
    filteredList = filteredList.filter(
      (anime) => anime.type.toLowerCase() === animeStore.selectedTypeFilter.toLowerCase()
    );
  }

  return filteredList;
});

const animeStatusClass = (status: AnimeStatus) => {
  let classes = 'px-4 py-2 border rounded-md w-fit';

  switch (status) {
    case 'Airing':
      classes += ' bg-red-100 text-red-500 border-red-500';
      break;
    case 'Completed':
      classes += ' bg-green-100 text-green-500';
      break;
    case 'Upcoming':
      classes += ' bg-yellow-100 text-yellow-500';
      break;
    case 'Finished':
      classes += ' bg-gray-100 text-gray-500';
      break;
    case 'Finished Airing':
      classes += ' bg-blue-100 text-blue-500 border-blue-500';
      break;
  }

  return classes;
};
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Rank</TableHead>
        <TableHead>Type</TableHead>
        <TableHead class="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="!filteredAnimes.length && !animeStore.isLoading">
        <TableRow>
          <TableCell colspan="4" class="text-center py-10 font-semibold text-gray-500">No animes found.</TableCell>
        </TableRow>
      </template>
      <template v-else>
        <TableRow v-for="anime in filteredAnimes" :key="anime.id">
          <TableCell class="font-medium">
            {{ anime.title }}
          </TableCell>
          <TableCell class="font-medium">
            {{ anime.rank }}
          </TableCell>
          <TableCell class="font-medium">
            {{ anime.type }}
          </TableCell>
          <TableCell class="font-medium text-right w-fit">
            <span :class="animeStatusClass(anime.status as AnimeStatus)">
              {{ anime.status }}
            </span>
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>
