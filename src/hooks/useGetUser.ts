import useSWR from 'swr';

import { supabase } from '../lib/supabase';

import type { User } from '@supabase/gotrue-js';

type Response = {
  data: {
    user: User | null;
  };
};

export default function useGetUser() {
  const { data, ...rest } = useSWR<Response>('getUser', async () => supabase.auth.getUser());

  return {
    user: data?.data.user,
    ...rest,
  };
}
