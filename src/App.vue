<script setup lang="ts">
import AccItem from './components/AccItem.vue';
import { useAccountsStore } from './store/store';

const store = useAccountsStore()


</script>

<template>
  <div class="p-4">
    <div class="flex gap-2 items-center mb-2">
      <h1 class="font-bold">Учетные записи</h1>
    <button @click="store.addAccount"
      class=" rounded-sm p-1.5 border-slate-400 border hover:bg-slate-100 transition duration-300 ease-in-out">+</button>
  </div>
  <p class="bg-slate-100 p-1 mb-4">Для указания нескольких меток для одной пары логин пароль используйте разделитель
    ;</p>
 <AccItem
        v-for="account in store.accounts"
        :key="account.id"
        :account="account"
      />
</div>
</template>

<style scoped></style>