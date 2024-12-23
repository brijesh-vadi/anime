<script setup lang="ts">
import AnimeTable from '@/components/AnimeTable.vue';
import StatusFilters from '@/components/StatusFilters.vue';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/Loader.vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAnimeStore from '@/stores/animeStore';

const animeStore = useAnimeStore();

const typeFilters: string[] = ['tv', 'movie', 'ova', 'special', 'ona', 'music', 'cm', 'pv', 'tv_special'];
</script>

<template>
  <main class="p-6 flex flex-col gap-6">
    <StatusFilters />
    <div class="flex items-center gap-10">
      <Select>
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="type in typeFilters" :value="type">{{ type.toUpperCase() }}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input v-model="animeStore.searchQuery" type="text" class="w-96" placeholder="Search..." />
    </div>
    <Loader v-if="animeStore.isLoading" />
    <AnimeTable v-else />
  </main>
</template>
