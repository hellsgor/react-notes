import { FormField } from '../FormField';
import { Button } from '../Button';
import './RegisterForm.css';
import { FC, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorVisibility } from '../../hooks/useErrorVisibility';

const RegistrationUserSchema = z.object({
  username: z
    .string()
    .min(5, 'Имя пользователя не может быть короче 5 символов'),
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль не может быть короче 8 символов'),
});

type RegistrationUserForm = z.infer<typeof RegistrationUserSchema>;

export const RegisterForm: FC = () => {
  const serverErrorRef = useRef<HTMLSpanElement | null>(null);

  const [errorVisible, hideError, showError] = useErrorVisibility();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationUserForm>({
    resolver: zodResolver(RegistrationUserSchema),
  });

  const registerUserMutation = useMutation(
    {
      mutationFn: (data: RegistrationUserForm) =>
        registerUser(data.email, data.username, data.password),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      },
    },
    queryClient,
  );

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(({ email, username, password }) => {
        registerUserMutation.mutate({ email, username, password });
        showError();
      })}
      onFocus={hideError}
    >
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input {...register('username')} type="text" />
      </FormField>

      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register('email')} type="text" inputMode="email" />
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input {...register('password')} type="password" />
      </FormField>

      {errorVisible && registerUserMutation.error && (
        <span ref={serverErrorRef} className="register-form__error">
          {registerUserMutation.error.message}
        </span>
      )}

      <Button type="submit" isLoading={registerUserMutation.isPending}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
