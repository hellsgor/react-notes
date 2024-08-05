import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getNotes, NotesResponse } from '../api/Note';
import { queryClient } from '../api/queryClient';

export function useNotesQuery(): UseQueryResult<NotesResponse> {
  const notesQuery = useQuery(
    {
      queryFn: () => getNotes(),
      queryKey: ['notes'],
    },
    queryClient,
  );

  return notesQuery;
}
