export function connect(store: any) {
  (window as any).__ATOMX_DEV__ = store;
}
