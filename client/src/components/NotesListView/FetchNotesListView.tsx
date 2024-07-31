import { useQuery } from '@tanstack/react-query';
import { getNotes } from '../../api/Note';
import { queryClient } from '../../api/queryClient';
import { Loader } from '../Loader';
import { NotesListView } from './NotesListView';
import { FC } from 'react';

export const FetchNotesListView: FC = () => {
  const notesQuery = useQuery(
    {
      queryFn: () => getNotes(),
      queryKey: ['notes'],
    },
    queryClient,
  );

  switch (notesQuery.status) {
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
      return <span>Что-то пошло не так</span>;

    case 'success':
      return <NotesListView />;
  }
};
