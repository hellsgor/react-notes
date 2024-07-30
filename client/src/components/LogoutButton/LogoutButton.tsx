import { useMutation } from '@tanstack/react-query';
import { Button } from '../Button';
import './LogoutButton.css';
import { logoutUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';

export const LogoutButton = () => {
  const logoutUserMutation = useMutation(
    {
      mutationFn: logoutUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      },
    },
    queryClient,
  );

  return (
    <div className="logout-button">
      <Button
        type="button"
        onClick={() => logoutUserMutation.mutate()}
        isLoading={logoutUserMutation.isPending}
        kind="secondary"
      >
        Выйти
      </Button>
    </div>
  );
};
