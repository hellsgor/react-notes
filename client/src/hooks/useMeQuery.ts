import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchMe, User } from '../api/User';
import { queryClient } from '../api/queryClient';

export function useMeQuery(): UseQueryResult<User> {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ['users', 'me'],
      retry: 0,
    },
    queryClient,
  );

  return meQuery;
}
