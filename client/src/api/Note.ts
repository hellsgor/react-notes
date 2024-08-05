import { z } from 'zod';
import { validateResponse } from './validateResponse';

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
    .then((response) => validateResponse(response, true))
    .then((response) => response.json())
    .then((data) => NotesResponseSchema.parse(data));
}
