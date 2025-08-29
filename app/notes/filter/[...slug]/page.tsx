import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { NoteTag } from '@/types/note';
import Notes from './Notes.client';

interface PageProps {
   params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: PageProps) {
    
 const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : (slug[0] as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};