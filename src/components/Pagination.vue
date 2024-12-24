<script setup lang="ts">
import useAnimeStore from '@/stores/animeStore';
import { computed } from 'vue';
import { Button } from './ui/button';
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from './ui/pagination';
import PaginationLast from './ui/pagination/PaginationLast.vue';
import PaginationFirst from './ui/pagination/PaginationFirst.vue';

const animeStore = useAnimeStore();

const totalAnimes = computed(() => {
  return animeStore.paginatedContent?.items.total;
});

const handlePreviousPage = () => {
  if (animeStore.paginatedContent?.current_page > 1) {
    animeStore.setPage(animeStore.paginatedContent.current_page - 1);
  }
};

const handleNextPage = () => {
  if (animeStore.paginatedContent?.has_next_page) {
    animeStore.setPage(animeStore.paginatedContent.current_page + 1);
  }
};

const handleFirstPage = () => {
  animeStore.setPage(1);
};

const handleLastPage = () => {
  animeStore.setPage(animeStore.paginatedContent.last_visible_page);
};
</script>

<template>
  <Pagination :total="totalAnimes" :sibling-count="1" show-edges :default-page="1" class="mx-auto">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst @click="handleFirstPage" />
      <PaginationPrev @click="handlePreviousPage" />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button
            @click="animeStore.setPage(item.value)"
            class="w-9 h-9 p-0"
            :variant="item.value === animeStore.paginatedContent.current_page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="handleNextPage" />
      <PaginationLast @click="handleLastPage" />
    </PaginationList>
  </Pagination>
</template>
