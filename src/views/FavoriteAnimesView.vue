<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { animeStatusClass } from '@/lib/utils';
import useAnimeStore from '@/stores/animeStore';
import type { AnimeStatus } from '@/types';
import { ArrowLeft, Heart } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const animeStore = useAnimeStore();

const favoriteAnimes = computed(() => {
  console.log(animeStore.favoriteAnimes);

  return animeStore.favoriteAnimes;
});

const favoriteIconClass = (id: number) => {
  const isFavorite = animeStore.isAnimeFavorite(id);

  return {
    'text-red-500 fill-red-500': isFavorite,
    'hover:text-red-500 cursor-pointer transition-colors': true,
  };
};

const handleAnimeFavorite = (id: number) => {
  animeStore.toggleFavoriteAnime(id);
};
</script>

<template>
  <main>
    <div @click="router.back()" class="p-2 rounded-full w-fit hover:bg-zinc-700 transition-all duration-200 my-2">
      <ArrowLeft :size="20" class="cursor-pointer" />
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Favorite</TableHead>
          <TableHead class="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="!favoriteAnimes.length && !animeStore.isLoading">
          <TableRow>
            <TableCell colspan="5" class="text-center py-10 font-semibold text-gray-500">
              No favorite animes found.Try adding some.
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow v-for="anime in favoriteAnimes" :key="anime.mal_id">
            <TableCell class="font-medium">
              {{ anime.title }}
            </TableCell>
            <TableCell class="font-medium">
              {{ anime.rank }}
            </TableCell>
            <TableCell class="font-medium">
              {{ anime.type }}
            </TableCell>
            <TableCell class="font-medium">
              <Heart :size="16" :class="favoriteIconClass(anime.mal_id)" @click="handleAnimeFavorite(anime.mal_id)" />
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
  </main>
</template>
