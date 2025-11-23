<template>
  <li>
    <input type="checkbox" v-model="checked" />
    {{ todo.text }}
  </li>
</template>

<script setup lang="ts">
import { useAtom } from '@atomx/vue';
import { computed } from 'vue';

const props = defineProps<{ id: string }>();
const todo = useAtom(store.todos.byId(props.id))!;

const checked = computed({
  get: () => todo.value.done,
  set: (v) => store.todos.set(props.id, { done: v }),
});
</script>