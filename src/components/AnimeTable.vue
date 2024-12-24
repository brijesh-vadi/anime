<script setup lang="ts">
import useAnimeStore from '@/stores/animeStore';
import type { AnimeStatus } from '@/types';
import { computed } from 'vue';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const animeStore = useAnimeStore();

const filteredAnimes = computed(() => {
  let filteredList = animeStore.animes;

  if (animeStore.searchQuery.trim()) {
    filteredList = filteredList.filter((anime) =>
      anime.title.toLowerCase().includes(animeStore.searchQuery.toLowerCase())
    );
  }

  switch (animeStore.selectedStatusFilter) {
    case 'Airing':
      filteredList = filteredList.filter((anime) => anime.status === 'Currently Airing');
      break;
    case 'Completed':
      filteredList = filteredList.filter((anime) => anime.status === 'Finished Airing');
      break;
    case 'Upcoming':
      filteredList = filteredList.filter((anime) => anime.status === 'Upcoming');
      break;
  }

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
    case 'Currently Airing':
      classes += '  text-zinc-300 ';
      break;
    case 'Upcoming':
      classes += ' text-yellow-500';
      break;
    case 'Finished Airing':
      classes += '  text-green-500 ';
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
