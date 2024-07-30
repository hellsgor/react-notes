import { LoginForm } from '../LoginForm';
import { RegisterForm } from '../RegisterForm';

import './AuthForm.css';
import { useAuthType } from '../../hooks/useAuthType';
import { FC } from 'react';

export const AuthForm: FC = () => {
  const { authType, setAuthType, switchAuthType } = useAuthType('register');

  const handleClick = () => {
    switchAuthType();
  };

  return (
    <div className="auth-form">
      <p className="auth-form__title">
        {authType === 'register' ? 'Регистрация' : 'Авторизация'}
      </p>
      {authType === 'register' ? (
        <RegisterForm setAuthType={setAuthType} />
      ) : (
        <LoginForm />
      )}
      <div className="auth-form__info">
        <span>
          {authType === 'register' ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'}
        </span>
        <button className="auth-form__button" onClick={handleClick}>
          {authType === 'register' ? 'Войти' : 'Создать аккаунт'}
        </button>
      </div>
    </div>
  );
};
