<script setup lang="ts">
import { ref } from 'vue';
import AccItem from './components/AccItem.vue';
type Account = {
  mark: string;
  type: string;
  login: string;
  password: string;
};
const acc = ref<Account[]>([]);

function handleNewAcc() {
  acc.value.push({ mark: '', type: 'LDAP', login: '', password: '' });
  console.log( acc.value);
}
function handleDelete(index: number) {
  acc.value.splice(index, 1);
}

</script>

<template>
  <div class="flex gap-2 items-center mb-2">
    <h1 class="font-bold">Учетные записи</h1>
    <button @click="handleNewAcc"
      class=" rounded-sm p-1.5 border-slate-400 border hover:bg-slate-100 transition duration-300 ease-in-out">+</button>
  </div>
  <p class="bg-slate-100 p-1 mb-4">Для указания нескольких меток для одной пары логин пароль используйте разделитель
    ;</p>
  <div class="space-y-2" v-for="(item, index) in acc" :key="index">
    <AccItem v-model:item="acc[index]" @delete="handleDelete(index)" />
  </div>
</template>

<style scoped></style>