import { FC } from 'react';
import { User } from '../../api/User';
import './UserView.css';

interface UserViewProps extends Pick<User, 'username'> {}

export const UserView: FC<UserViewProps> = ({ username }) => {
  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
