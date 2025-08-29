'use client';

import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getSingleNote } from '@/lib/api';
import { useRouter } from 'next/navigation';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const handleGoBack = () => {
    const isSure = confirm('Are you sure?');
    if (isSure) {
      router.back();
    }
  };

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button onClick={handleGoBack}>Back</button>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {note?.createdAt
            ? `Created at: ${note.createdAt} `
            : `Updated at: ${note.updatedAt}`}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;