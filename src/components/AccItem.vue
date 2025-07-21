<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  item: {
    mark: string,
    type: string,
    login: string,
    password: string
  }
}>();
const emit = defineEmits(['update:item', 'delete']);

function update(field: string, value: string) {
  emit('update:item', { ...props.item, [field]: value });
}
</script>

<template>
  <div class="p-2 space-y-2 flex items-center">
    <input
      :value="item.mark"
      @input="update('mark', ($event.target as HTMLInputElement).value)"
      placeholder="Метки (через ;)"
      class="w-full p-2 border rounded"
    />
    <select
      :value="item.type"
      @change="update('type', ($event.target as HTMLSelectElement).value)"
      class="w-full p-2 border rounded"
    >
      <option value="LDAP">LDAP</option>
      <option value="Локальная">Локальная</option>
    </select>
    <input
      :value="item.login"
      @input="update('login', ($event.target as HTMLInputElement).value)"
      placeholder="Логин"
      class="w-full p-2 border rounded"
    />
    <input
      v-if="item.type === 'Локальная'"
      :value="item.password"
      @input="update('password', ($event.target as HTMLInputElement).value)"
      placeholder="Пароль"
      type="password"
      class="w-full p-2 border rounded"
    />
    <button class="text-red-600 hover:underline" @click="emit('delete')">
      Удалить
    </button>
  </div>
</template>

<style scoped>
</style>