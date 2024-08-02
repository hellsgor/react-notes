import './NotesListView.css';
import { NoteView } from '../NoteView';
import { NoteList } from '../../api/Note';
import { FC } from 'react';

interface NotesListViewProps {
  notesList: NoteList;
}

export const NotesListView: FC<NotesListViewProps> = ({ notesList }) => {
  if (!notesList.length) {
    return (
      <p style={{ textAlign: 'center', fontSize: 16, fontWeight: '700' }}>
        There are no notes yet
      </p>
    );
  }

  return (
    <ul className="note-list-view">
      {notesList.map((note) => (
        <li key={note.id}>
          <NoteView note={note} />
        </li>
      ))}
    </ul>
  );
};
