````markdown
<!-- bilingual README | AtomX -->
<!-- English (left column) | Russian (right column) -->

# AtomX — fastest reactive state that simply works

# AtomX — самый быстрый реактивный стейт, который просто работает

| English                                         | Русский                                           |
| ----------------------------------------------- | ------------------------------------------------- |
| **Install**<br>`npm i @atomx/core @atomx/react` | **Установка**<br>`npm i @atomx/core @atomx/react` |
| Zero-boilerplate                                | Без бойлерплейта                                  |
| Framework-agnostic core                         | Ядро независимо от фреймворка                     |
| ≤ 4 kB gzipped                                  | ≤ 4 КБ gzip                                       |
| TypeScript out-of-the-box                       | TypeScript сразу работает                         |

---

## 30-second Counter | Счётчик за 30 секунд

```ts
// store.ts
import { atom } from '@atomx/core';
export const counter = atom(0);
```
````

```tsx
// React
import { useAtom } from '@atomx/react';
import { counter } from './store';

export const Counter = () => {
  const value = useAtom(counter);
  return <button onClick={() => counter.set((v) => v + 1)}>{value}</button>;
};
```

---

## Normalised Data | Нормализованные данные

```ts
import { createTable } from '@atomx/core';

export const users = createTable<{ id: string; name: string }>();
export const posts = createTable<{
  id: string;
  title: string;
  userId: string;
}>();

users.merge([{ id: '1', name: 'Ann' }]);
posts.set('a', { id: 'a', title: 'Hi', userId: '1' });
```

---

## Async + Cache (SWR) | Асинхронность + кеш

```ts
import { reactor } from '@atomx/core';

const userQuery = reactor(
  () => fetch(`/api/user/${id}`).then((r) => r.json()),
  { key: ['user', id], stale: 3000, onSuccess: users.merge }
);

// React
const { data, loading, error } = useAtom(userQuery);
```

---

## Derived Values | Производные значения

```ts
import { derived } from '@atomx/core';

const double = derived(() => counter.get() * 2, [counter]);
// useAtom(double) → auto-updates
```

---

## Vue / Svelte / Solid

```vue
<!-- Vue -->
<script setup>
import { useAtom } from '@atomx/vue';
const value = useAtom(counter);
</script>

<template>
  <button @click="counter.set((v) => v + 1)">{{ value }}</button>
</template>
```

---

## API Cheat-Sheet | Шпаргалка

| Core                     | Description             |
| ------------------------ | ----------------------- |
| `atom<T>(initial)`       | creates reactive atom   |
| `derived(fn, deps)`      | computed atom           |
| `reactor(fetcher, opts)` | async data with SWR     |
| `createTable<T>()`       | normalised entity table |
| `cache.*`                | manual cache access     |

React-hook  
`useAtom(atom)` – subscribes and re-renders only when value changes.

---

## DevTools

```bash
npm i -D @atomx/devtools
```

```ts
import { connect } from '@atomx/devtools';
connect(store); // open Chrome DevTools → AtomX panel
```

---

## TypeScript

100 % type inference, no manual generics, compile-time errors for wrong shapes.

---

## Bundle Size

| Package        | Min    | Gzip   |
| -------------- | ------ | ------ |
| `@atomx/core`  | 9 kB   | 3.8 kB |
| `@atomx/react` | 0.5 kB | 0.3 kB |
| `@atomx/vue`   | 0.5 kB | 0.3 kB |

---

## License

MIT – use anywhere, keep the licence line.

---

## Links

GitHub: https://github.com/dyukovlad/atomx  
Npm: https://npmjs.com/org/atomx  
Docs: https://atomx.dev (coming soon)

---

Happy reactive coding!  
Приятной реактивной разработки!

```

```
