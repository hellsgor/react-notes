import { FormField } from '../FormField';
import { Button } from '../Button';
import './NoteForm.css';
import { z } from 'zod';
import { useErrorVisibility } from '../../hooks/useErrorVisibility';
import { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { createNote } from '../../api/Note';

const CreateNoteSchema = z.object({
  title: z.string().min(1, 'Поле не может быть пустым'),
  text: z.string().min(10, 'Длинна текста не может быть менее 10 символов'),
});

type CreateNoteForm = z.infer<typeof CreateNoteSchema>;

export const NoteForm: FC = () => {
  const serverErrorRef = useRef<HTMLSpanElement | null>(null);

  const [errorVisible, hideError, showError] = useErrorVisibility();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteForm>({
    resolver: zodResolver(CreateNoteSchema),
  });

  const createNoteMutation = useMutation(
    {
      mutationFn: (data: CreateNoteForm) => createNote(data.title, data.text),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      },
    },
    queryClient,
  );

  return (
    <form
      className="note-form"
      onSubmit={handleSubmit(({ title, text }) => {
        createNoteMutation.mutate({ title, text });
        showError();
      })}
      onFocus={hideError}
    >
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input {...register('title')} type="text" />
      </FormField>

      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register('text')} />
      </FormField>

      {errorVisible && createNoteMutation.error && (
        <span ref={serverErrorRef} className="note-form__error">
          {createNoteMutation.error.message}
        </span>
      )}

      <Button type="submit" isLoading={createNoteMutation.isPending}>
        Сохранить
      </Button>
    </form>
  );
};
