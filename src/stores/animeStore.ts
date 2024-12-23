import type { Anime, APIResponse } from '@/types';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeStore = defineStore('anime', () => {
  const animes = ref<Anime[]>([]);

  const getAnimes = async () => {
    try {
      const { data } = await axios.get<APIResponse>(`https://api.jikan.moe/v4/anime`);

      animes.value = data.data;

      return data.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    animes,
    getAnimes,
  };
});

export default useAnimeStore;
