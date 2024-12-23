export interface APIResponse {
  pagination: PaginatedContent;
  data: Anime[];
}

export interface Anime {
  id: string;
  title: string;
  rank: number;
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
