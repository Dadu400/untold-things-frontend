import { fetchPosts } from "../api/posts";

import { useInfiniteQuery } from '@tanstack/react-query';

export const usePosts = (searchTerm: string) => {
    return useInfiniteQuery({
        queryKey: [searchTerm],
        queryFn: fetchPosts,
        getNextPageParam: (_lastPage, pages) => {
          if (_lastPage.length === 0) return undefined;
          return pages.length;
        },
        initialPageParam: 0
      });
};
