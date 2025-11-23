export type Listener<T> = (value: T, prev: T) => void;

interface Atom<T> {
  get(): T;
  set(value: T | ((prev: T) => T)): void;
  subscribe(listener: Listener<T>): () => void;
}

const atom = <T>(initial: T): Atom<T> => {
  let value = initial;
  const listeners = new Set<Listener<T>>();

  return {
    get: () => value,
    set: (updater) => {
      const prev = value;
      value = typeof updater === 'function' ? (updater as any)(prev) : updater;
      if (value !== prev) listeners.forEach((l) => l(value, prev));
    },
    subscribe: (l) => {
      listeners.add(l);

      return () => listeners.delete(l);
    },
  };
};

export { atom, Atom };
