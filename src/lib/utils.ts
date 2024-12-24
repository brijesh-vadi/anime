import type { AnimeStatus } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const animeStatusClass = (status: AnimeStatus) => {
  let classes = 'px-4 py-2 border rounded-md w-fit';

  switch (status) {
    case 'Currently Airing':
      classes += ' text-zinc-300 ';
      break;
    case 'Upcoming':
      classes += ' text-yellow-500';
      break;
    case 'Finished Airing':
      classes += ' text-green-500 ';
      break;
  }

  return classes;
};
