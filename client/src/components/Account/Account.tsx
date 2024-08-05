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
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50%, -50%',
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
