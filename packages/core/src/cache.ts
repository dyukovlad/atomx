type Entry = { data: any; timestamp: number; stale?: number };
const map = new Map<string, Entry>();

const cache = {
  get<T>(k: string): T | undefined {
    const e = map.get(k);
    return e ? e.data : undefined;
  },
  set(k: string, data: any, stale = 0) {
    map.set(k, { data, timestamp: Date.now(), stale });
  },
  isStale(k: string, stale = 0) {
    const e = map.get(k);
    return !e || Date.now() - e.timestamp > stale;
  },
  clear() {
    map.clear();
  },
};

export { cache };
