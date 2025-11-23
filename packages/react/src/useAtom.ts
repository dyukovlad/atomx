import { useEffect, useState } from 'react';
import type { Atom } from '@atomx-fast/core';

export function useAtom<T>(a: Atom<T>): T {
  const [value, set] = useState(a.get);
  useEffect(() => a.subscribe(set), [a]);
  return value;
}
