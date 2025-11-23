import type { Atom } from './atom';
import { atom } from './atom';
import { cache } from './cache';

interface ReactorOpts {
  key?: string[];
  stale?: number;
  onSuccess?: (data: any) => void;
}

const reactor = <T>(
  fetcher: () => Promise<T>,
  opts: ReactorOpts = {}
): Atom<{ data?: T; loading: boolean; error?: any }> => {
  const key = opts.key?.join('|') ?? fetcher.toString();
  const state = atom<{ data?: T; loading: boolean; error?: any }>({
    loading: false,
  });

  const execute = async () => {
    state.set({ ...state.get(), loading: true });
    try {
      const cached = cache.get<T>(key);
      if (cached) {
        state.set({ data: cached, loading: false });
        if (!cache.isStale(key, opts.stale)) return;
      }
      const data = await fetcher();
      cache.set(key, data, opts.stale);
      state.set({ data, loading: false });
      opts.onSuccess?.(data);
    } catch (error) {
      state.set({ error, loading: false });
    }
  };

  execute();
  return state;
};

export { reactor, ReactorOpts };
