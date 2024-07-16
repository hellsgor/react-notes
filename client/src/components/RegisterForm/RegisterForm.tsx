import { FormField } from '../FormField';
import { Button } from '../Button';
import './RegisterForm.css';
import { FC, FormEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';

export const RegisterForm: FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUserMutation = useMutation(
    {
      mutationFn: () => registerUser(email, username, password),
    },
    queryClient,
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    registerUserMutation.mutate();
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormField>

      <FormField label="Email">
        <input
          type="email"
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
      </FormField>

      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
      </FormField>

      {registerUserMutation.error && (
        <span>{registerUserMutation.error.message}</span>
      )}

      <Button type="submit" isLoading={registerUserMutation.isPending}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
