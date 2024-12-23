import type { Anime, APIResponse } from '@/types';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeStore = defineStore('anime', () => {
  const animes = ref<Anime[]>([]);
  const isLoading = ref(false);
  const searchQuery = ref('');

  const getAnimes = async (): Promise<Anime[]> => {
    try {
      isLoading.value = true;
      const { data } = await axios.get<APIResponse>(`https://api.jikan.moe/v4/anime?sort=desc`);

      animes.value = data.data;

      return data.data;
    } catch (err) {
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    animes,
    isLoading,
    getAnimes,
    searchQuery,
  };
});

export default useAnimeStore;
