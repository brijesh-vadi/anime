export interface APIResponse {
  pagination: PaginatedContent;
  data: Anime[];
}

export interface Anime {
  id: string;
  title: string;
  rank: number;
  type: string;
  status: string;
}

export interface PaginatedContent {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export type AnimeStatus = 'Upcoming' | 'Currently Airing' | 'Finished Airing';

export const statusFilters = ['All', 'Airing', 'Completed', 'Upcoming'] as const;

export type StatusFilter = (typeof statusFilters)[number];

export interface AppliedFilter {
  type: string;
  value: string;
}
