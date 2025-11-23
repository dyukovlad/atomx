import { createStore } from '@atomx/core';
import { useAtom } from '@atomx/react';
import { useState } from 'react';

const store = createStore();

export default function App() {
  const list = useAtom(store.todos.allAtom);
  const [text, setText] = useState('');
  const add = () => {
    store.todos.set(Date.now().toString(), { text, done: false });
    setText('');
  };
  return (
    <>
      <h1>AtomX React Todo</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={add}>add</button>
      <ul>
        {list.map((t) => (
          <Row key={t.id} id={t.id} />
        ))}
      </ul>
    </>
  );
}

function Row({ id }: { id: string }) {
  const todo = useAtom(store.todos.byId(id))!;
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => store.todos.set(id, { done: e.target.checked })}
      />
      {todo.text}
    </li>
  );
}
