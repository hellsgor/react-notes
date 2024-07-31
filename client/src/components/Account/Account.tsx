import { UseQueryResult } from '@tanstack/react-query';
import { User } from '../../api/User';
import { Loader } from '../Loader';
import { AuthForm } from '../AuthForm';
import { UserView } from '../UserView';
import { LogoutButton } from '../LogoutButton';
import { FC } from 'react';

interface AccountProps {
  meQuery: UseQueryResult<User>;
}

export const Account: FC<AccountProps> = ({ meQuery }) => {
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
};
