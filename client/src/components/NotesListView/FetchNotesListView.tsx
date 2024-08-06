import { Loader } from '../Loader';
import { NotesListView } from './NotesListView';
import { FC } from 'react';
import { useNotesQuery } from '../../hooks/useNotesQuery';
import { UseQueryResult } from '@tanstack/react-query';
import { NotesResponse } from '../../api/Note';
import { User } from '../../api/User';
import { queryClient } from '../../api/queryClient';

export const FetchNotesListView: FC = () => {
  const notesQuery: UseQueryResult<NotesResponse> = useNotesQuery('/api/notes');

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
      return (
        <span style={{ color: 'var(--error)' }}>
          {notesQuery.error.message}
        </span>
      );

    case 'success':
      return (
        <NotesListView
          notesList={
            notesQuery.data?.list.length
              ? notesQuery.data.list.filter(
                  (note) =>
                    note.userId ===
                    queryClient.getQueryData<User>(['users', 'me'])!.id,
                )
              : []
          }
        />
      );
  }
};
