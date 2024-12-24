import type { Anime, APIResponse, AppliedFilter, PaginatedContent, StatusFilter } from '@/types';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeStore = defineStore('anime', () => {
  const animes = ref<Anime[]>([]);
  const isLoading = ref(false);
  const selectedStatusFilter = ref<StatusFilter>('All');
  const selectedTypeFilter = ref('');
  const appliedFilters = ref<AppliedFilter[]>([]);
  const searchQuery = ref('');
  const paginatedContent = ref<PaginatedContent>({
    current_page: 1,
    last_visible_page: 1,
    has_next_page: true,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
  });

  const getAnimes = async (): Promise<void> => {
    try {
      isLoading.value = true;
      const { data } = await axios.get<APIResponse>(
        `https://api.jikan.moe/v4/anime?sort=desc&page=${paginatedContent.value?.current_page}&limit=10`
      );

      animes.value = data.data;
      paginatedContent.value = data.pagination;
    } catch (err) {
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const setPage = (page: number) => {
    if (page > 0 && page <= paginatedContent.value?.last_visible_page) {
      paginatedContent.value.current_page = page;
      getAnimes();
    }
  };

  const setAppliedFilters = (filter: AppliedFilter) => {
    if (filter) appliedFilters.value.push(filter);
  };

  return {
    animes,
    isLoading,
    getAnimes,
    paginatedContent,
    searchQuery,
    setPage,
    selectedStatusFilter,
    selectedTypeFilter,
    appliedFilters,
    setAppliedFilters,
  };
});

export default useAnimeStore;
