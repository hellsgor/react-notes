import './LoginForm.css';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { z } from 'zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { loginUser } from '../../api/User';

const LoginUserSchema = z.object({
  email: z
    .string()
    .email('Некорректный email')
    .min(5, 'Email не может быть короче 5 символов'),
  password: z.string().min(8, 'Поле не может короче 8 символов'),
});

type LoginUserForm = z.infer<typeof LoginUserSchema>;

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserForm>({
    resolver: zodResolver(LoginUserSchema),
  });

  const loginUserMutation = useMutation(
    {
      mutationFn: (data: LoginUserForm) => loginUser(data.email, data.password),
    },
    queryClient,
  );

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(({ email, password }) => {
        loginUserMutation.mutate({ email, password });
      })}
    >
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register('email')} type="text" inputMode="email" />
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input {...register('password')} type="password" />
      </FormField>

      {loginUserMutation.error && (
        <span>{loginUserMutation.error.message}</span>
      )}

      <Button type="submit" isLoading={loginUserMutation.isPending}>
        Войти
      </Button>
    </form>
  );
};
