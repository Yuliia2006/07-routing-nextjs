import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<Note, AxiosError, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: AxiosError) => {
      console.error("Error deleting note:", error);
    },
  });

  if (!notes.length) return null;
  
   return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
               <Link href={`/notes/${note.id}`}>View Details</Link>
              <div className={css.actions}>
                <button
                  className={`${css.button} ${css.delete} `}
                  onClick={() => deleteMutation.mutate(note.id)}
                disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}