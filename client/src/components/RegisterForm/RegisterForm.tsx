import { FormField } from '../FormField';
import { Button } from '../Button';
import './RegisterForm.css';
import { FC, FormEventHandler, useState } from 'react';

export const RegisterForm: FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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
      <Button type="submit">Зарегистрироваться</Button>
    </form>
  );
};
