<template>
  <h1>AtomX Vue Todo</h1>
  <input v-model="text" @keyup.enter="add" />
  <button @click="add">add</button>
  <ul>
    <Row v-for="t in list" :key="t.id" :id="t.id" />
  </ul>
</template>

<script setup lang="ts">
import { createStore } from '@atomx-fast/core';
import { useAtom } from '@atomx/vue';
import { ref } from 'vue';

const store = createStore();
const list = useAtom(store.todos.allAtom);
const text = ref('');

function add() {
  store.todos.set(Date.now().toString(), { text: text.value, done: false });
  text.value = '';
}
</script>