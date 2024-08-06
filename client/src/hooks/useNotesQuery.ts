import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getNotes, NotesResponse } from '../api/Note';
import { queryClient } from '../api/queryClient';

export function useNotesQuery(url: string): UseQueryResult<NotesResponse> {
  return useQuery(
    {
      queryFn: () => getNotes(url),
      queryKey: ['notes'],
    },
    queryClient,
  );
}
