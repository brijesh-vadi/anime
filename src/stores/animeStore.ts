import type { Anime, APIResponse, PaginatedContent } from '@/types';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeStore = defineStore('anime', () => {
  const animes = ref<Anime[]>([]);
  const isLoading = ref(false);
  const searchQuery = ref('');
  const paginatedContent = ref<PaginatedContent>({
    current_page: 1,
    last_visible_page: 1,
    has_next_page: false,
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
        `https://api.jikan.moe/v4/anime?sort=desc&page=${paginatedContent.value?.current_page}`
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

  return {
    animes,
    isLoading,
    getAnimes,
    paginatedContent,
    searchQuery,
    setPage,
  };
});

export default useAnimeStore;
