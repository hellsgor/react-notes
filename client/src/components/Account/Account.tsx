import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../../api/User';
import { Loader } from '../Loader';
import { AuthForm } from '../AuthForm';
import { UserView } from '../UserView';
import { queryClient } from '../../api/queryClient';
import { LogoutButton } from '../LogoutButton';

export function Account() {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ['users', 'me'],
      retry: 0,
    },
    queryClient,
  );

  switch (meQuery.status) {
    case 'pending':
      return (
        <div
          style={{
            width: '100vw',
            height: '100dvh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </div>
      );

    case 'error':
      return <AuthForm />;

    case 'success':
      return (
        <>
          <UserView username={meQuery.data.username} />
          <LogoutButton />
        </>
      );
  }
}
