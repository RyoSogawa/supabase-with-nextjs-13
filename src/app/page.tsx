// Caching data with Next.js 13 and Supabase
// See the docs: https://beta.nextjs.org/docs/data-fetching/caching
import 'server-only';
import { supabase } from '../lib/supabase';

export const revalidate = 60; // revalidate this page at most every 60 seconds

export default async function PostList() {
  const { data, error } = await supabase.from('articles').select('*');

  return <pre>{JSON.stringify({ data, error }, null, 2)}</pre>;
}
