import { atom } from './atom';

export type Table<T extends { id: string }> = {
  byId: (id: string) => import('./atom').Atom<T>;
  set: (id: string, value: Partial<T>) => void;
  merge: (values: T[]) => void;
  all: () => T[];
};

const createTable = <T extends { id: string }>(): Table<T> => {
  const atoms = new Map<string, import('./atom').Atom<T>>();
  const listAtom = atom<T[]>([]);

  const getAtom = (id: string) => {
    if (!atoms.has(id)) atoms.set(id, atom(undefined as any));
    return atoms.get(id)!;
  };

  return {
    byId: (id) => getAtom(id),
    set: (id, patch) => {
      const a = getAtom(id);
      const next = { ...a.get(), ...patch, id } as T;
      a.set(next);
      listAtom.set(
        Array.from(atoms.values())
          .map((v) => v.get())
          .filter(Boolean)
      );
    },
    merge: (rows) => rows.forEach((r) => getAtom(r.id).set(r)),
    all: () => listAtom.get(),
  };
};

export { createTable };
