import { ref, watchEffect } from 'vue';
import type { Atom } from '@atomx-fast/core';

export function useAtom<T>(a: Atom<T>) {
  const r = ref(a.get());
  watchEffect(() => (r.value = a.get()));
  return r;
}
