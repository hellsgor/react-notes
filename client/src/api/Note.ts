import { z } from 'zod';
import { validateResponse } from './validateResponse';

export const NewNoteSchema = z.object({
  title: z.string(),
  text: z.string(),
});
export type NewNote = z.infer<typeof NewNoteSchema>;

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});
export type Note = z.infer<typeof NoteSchema>;

export const NoteListSchema = z.array(NoteSchema);
export type NoteList = z.infer<typeof NoteListSchema>;

export const NotesResponseSchema = z.object({
  list: NoteListSchema,
  pageCount: z.number(),
});
export type NotesResponse = z.infer<typeof NotesResponseSchema>;

export function getNotes(): Promise<NotesResponse> {
  return fetch('/api/notes')
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => NotesResponseSchema.parse(data));
}

export function createNote(title: string, text: string): Promise<void> {
  return fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, text }),
  })
    .then((response) => validateResponse(response, true))
    .then(() => undefined);
}
