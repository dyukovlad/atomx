// demo files
import { createTable } from './graph';

export function createStore() {
  return {
    users: createTable<{ id: string; name: string }>(),
    posts: createTable<{ id: string; title: string; authorId: string }>(),
  };
}
export type Store = ReturnType<typeof createStore>;
