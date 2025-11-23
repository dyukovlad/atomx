import type { Atom } from './atom';
import { atom } from './atom';

const derived = <T>(fn: () => T, deps: Atom<any>[]): Atom<T> => {
  const derivedAtom = atom<T>(undefined as any);
  let alive = true;
  const update = () => alive && derivedAtom.set(fn());
  deps.forEach((d) => d.subscribe(update));
  update();
  return derivedAtom;
};

export { derived };
